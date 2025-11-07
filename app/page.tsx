'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="container">
      <div className="header">
        <h1>🎓 SSC & Railway Mock Test</h1>
        <p>अपनी तैयारी को परखें - Practice for Success</p>
      </div>

      <div className="exam-cards">
        <div className="card">
          <h2>🏛️ SSC CGL Mock Test</h2>
          <p>Staff Selection Commission Combined Graduate Level परीक्षा की तैयारी करें</p>
          <ul>
            <li>📚 25 प्रश्न</li>
            <li>⏱️ 30 मिनट</li>
            <li>📊 General Intelligence & Reasoning</li>
            <li>📖 General Awareness</li>
            <li>🔢 Quantitative Aptitude</li>
            <li>✍️ English Comprehension</li>
          </ul>
          <Link href="/test/ssc-cgl" className="btn">
            टेस्ट शुरू करें
          </Link>
        </div>

        <div className="card">
          <h2>🚂 Railway RRB NTPC Mock Test</h2>
          <p>Railway Recruitment Board Non-Technical Popular Categories की तैयारी</p>
          <ul>
            <li>📚 25 प्रश्न</li>
            <li>⏱️ 30 मिनट</li>
            <li>🧠 General Awareness</li>
            <li>🔢 Mathematics</li>
            <li>💭 General Intelligence & Reasoning</li>
          </ul>
          <Link href="/test/railway-ntpc" className="btn">
            टेस्ट शुरू करें
          </Link>
        </div>

        <div className="card">
          <h2>🚆 Railway Group D Mock Test</h2>
          <p>Railway Group D परीक्षा की व्यापक तैयारी</p>
          <ul>
            <li>📚 25 प्रश्न</li>
            <li>⏱️ 30 मिनट</li>
            <li>🔢 Mathematics</li>
            <li>🧠 General Intelligence & Reasoning</li>
            <li>📖 General Science</li>
            <li>🌍 General Awareness</li>
          </ul>
          <Link href="/test/railway-group-d" className="btn">
            टेस्ट शुरू करें
          </Link>
        </div>

        <div className="card">
          <h2>📝 SSC CHSL Mock Test</h2>
          <p>Combined Higher Secondary Level परीक्षा प्रैक्टिस</p>
          <ul>
            <li>📚 25 प्रश्न</li>
            <li>⏱️ 30 मिनट</li>
            <li>✍️ English Language</li>
            <li>🧮 Quantitative Aptitude</li>
            <li>💭 Reasoning</li>
            <li>📚 General Awareness</li>
          </ul>
          <Link href="/test/ssc-chsl" className="btn">
            टेस्ट शुरू करें
          </Link>
        </div>
      </div>
    </div>
  )
}
