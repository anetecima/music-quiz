type QuestionType = 'artist' | 'song' | 'quiz'
export interface IGameCategory {
  categoryName: string
  image: string
  options: IQuestion[]
}

export interface IQuestion {
  // categoryName?: string
  points: number
  extraPoints: number
  bonusQuestion?: string
  quiz?: {
    question: string
    variants: string[]
  }
  songTitle: string
  typeOfQuestion: QuestionType
  track: string
  answer: string
  active: boolean
  start?: number
  length?: number
}

export interface IRoundQuestion extends IQuestion {
  categoryName: string
}

export interface IGame {
  gameObject: IGameCategory[]
  roundQuestions: IRoundQuestion[]
}

export interface IDbQuestion extends IQuestion {
  timestamp: number
}

// export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string
// }
