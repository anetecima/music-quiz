import { IQuestion } from '@/types/Types'

export enum QuestionType {
  'artist' = 'artist',
  'song' = 'song',
  'quiz' = 'quiz'
}

export const gameQuestions = {
  artist: 'Nosauciet izpildītāju',
  song: 'Nosauciet dziesmu',
  quiz: 'Quiz Time'
} as const

export const Question: IQuestion = {
  points: 0,
  extraPoints: 0,
  songTitle: '',
  typeOfQuestion: 'artist',
  track: '',
  start: 0,
  answer: '',
  active: true
}
