// import { QuizPage } from 'quiz'
import { Rubik_Beastly } from 'next/font/google'
import React from 'react'
import { QuizGame } from '@/features/quiz/components/quiz'

const rubikBeastly = Rubik_Beastly({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap'
})

export default function Quiz() {
  return (
    <div className={rubikBeastly.className}>
      <QuizGame />
    </div>
  )
}
