import React from 'react'

export interface IGameCategory {
  categoryName: string
  image: string
  options: IQuestion[]
}

export interface IQuestion {
  categoryName?: string
  timestamp?: string
  points: number
  extraPoints: number
  bonusQuestion?: string
  quiz?: {
    question: string
    variants: string[]
  }
  songTitle: string
  typeOfQuestion: 'artist' | 'song' | 'quiz'
  track: string
  answer: string
  active: boolean
  start?: number
  length?: number
}

export interface IGame {
  gameObject: IGameCategory[]
  roundQuestions: IQuestion[]
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}
