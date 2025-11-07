'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getQuestions } from '@/lib/questions'

export default function TestPage() {
  const params = useParams()
  const router = useRouter()
  const examType = params.examType as string

  const [questions, setQuestions] = useState<any[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes in seconds
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    const qs = getQuestions(examType)
    setQuestions(qs)
  }, [examType])

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmit()
    }
  }, [timeLeft, showResult])

  const handleOptionSelect = (optionIndex: number) => {
    if (!showAnswer) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: optionIndex
      })
    }
  }

  const handleNext = () => {
    setShowAnswer(false)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    setShowAnswer(false)
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = () => {
    setShowResult(true)
  }

  const calculateScore = () => {
    let correct = 0
    let incorrect = 0
    let unanswered = 0

    questions.forEach((q, index) => {
      if (selectedAnswers[index] === undefined) {
        unanswered++
      } else if (selectedAnswers[index] === q.correctAnswer) {
        correct++
      } else {
        incorrect++
      }
    })

    return { correct, incorrect, unanswered }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getExamTitle = () => {
    const titles: { [key: string]: string } = {
      'ssc-cgl': 'SSC CGL Mock Test',
      'railway-ntpc': 'Railway RRB NTPC Mock Test',
      'railway-group-d': 'Railway Group D Mock Test',
      'ssc-chsl': 'SSC CHSL Mock Test'
    }
    return titles[examType] || 'Mock Test'
  }

  if (questions.length === 0) {
    return <div className="container">Loading...</div>
  }

  if (showResult) {
    const { correct, incorrect, unanswered } = calculateScore()
    const percentage = parseFloat(((correct / questions.length) * 100).toFixed(2))

    return (
      <div className="container">
        <div className="quiz-container">
          <div className="result-container">
            <h2>🎉 परीक्षा समाप्त!</h2>
            <div className="score">{percentage}%</div>

            <div className="result-details">
              <div className="result-item">
                <h3>✅ सही उत्तर</h3>
                <p style={{ color: '#10b981' }}>{correct}</p>
              </div>
              <div className="result-item">
                <h3>❌ गलत उत्तर</h3>
                <p style={{ color: '#ef4444' }}>{incorrect}</p>
              </div>
              <div className="result-item">
                <h3>⚪ अनुत्तरित</h3>
                <p style={{ color: '#6b7280' }}>{unanswered}</p>
              </div>
            </div>

            <div style={{ marginTop: '30px' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
                कुल स्कोर: {correct} / {questions.length}
              </p>
              {percentage >= 75 && <p style={{ color: '#10b981', fontSize: '1.1rem' }}>🌟 बहुत बढ़िया! Excellent Performance!</p>}
              {percentage >= 50 && percentage < 75 && <p style={{ color: '#f59e0b', fontSize: '1.1rem' }}>👍 अच्छा प्रयास! Good effort!</p>}
              {percentage < 50 && <p style={{ color: '#ef4444', fontSize: '1.1rem' }}>📚 और मेहनत करें! Keep practicing!</p>}
            </div>

            <button onClick={() => router.push('/')} className="btn back-btn">
              वापस जाएं
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="container">
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>{getExamTitle()}</h2>
          <div className="timer">
            ⏱️ {formatTime(timeLeft)}
          </div>
        </div>

        <div className="question-section">
          <div className="question-count">
            प्रश्न {currentQuestion + 1} / {questions.length}
          </div>
          <div className="question-text">
            {question.question}
          </div>
        </div>

        <div className="options">
          {question.options.map((option: string, index: number) => {
            let className = 'option'
            if (selectedAnswers[currentQuestion] === index) {
              className += ' selected'
            }
            if (showAnswer) {
              if (index === question.correctAnswer) {
                className += ' correct'
              } else if (selectedAnswers[currentQuestion] === index) {
                className += ' incorrect'
              }
            }

            return (
              <div
                key={index}
                className={className}
                onClick={() => handleOptionSelect(index)}
              >
                {String.fromCharCode(65 + index)}. {option}
              </div>
            )
          })}
        </div>

        {showAnswer && question.explanation && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#f0f9ff',
            borderRadius: '10px',
            border: '2px solid #0ea5e9'
          }}>
            <strong>व्याख्या:</strong> {question.explanation}
          </div>
        )}

        <div className="quiz-footer">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn"
            style={{ opacity: currentQuestion === 0 ? 0.5 : 1 }}
          >
            ← पिछला
          </button>

          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="btn"
            style={{ background: '#10b981' }}
          >
            {showAnswer ? 'उत्तर छुपाएं' : 'उत्तर देखें'}
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button onClick={handleSubmit} className="btn">
              समाप्त करें
            </button>
          ) : (
            <button onClick={handleNext} className="btn">
              अगला →
            </button>
          )}
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center', color: '#666' }}>
          उत्तरित: {Object.keys(selectedAnswers).length} / {questions.length}
        </div>
      </div>
    </div>
  )
}
