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
  songTitle: string
  question: 'artist' | 'song' | 'video'
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
