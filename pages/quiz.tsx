import { QuizGame } from '@/features/quiz/components/quiz'
import { rubikBeastlyFont } from '../src/theme/fonts'

export default function Quiz() {
  return (
    <div className={rubikBeastlyFont.className}>
      <QuizGame />
    </div>
  )
}
