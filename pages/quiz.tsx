import { IM_Fell_DW_Pica } from 'next/font/google'
import { QuizGame } from '@/features/quiz/components/quiz'

const rubikBeastly = IM_Fell_DW_Pica({
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
