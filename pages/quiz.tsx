import { QuizGame } from '@/features/quiz/components/quiz'
import { quizFont } from '../src/theme/fonts'

export default function Quiz() {
  return (
    <div className={quizFont.className}>
      <QuizGame />
    </div>
  )
}
