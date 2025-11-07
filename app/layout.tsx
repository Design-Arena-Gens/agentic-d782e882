import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SSC & Railway Mock Test',
  description: 'Practice tests for SSC and Railway exams',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hi">
      <body>{children}</body>
    </html>
  )
}
