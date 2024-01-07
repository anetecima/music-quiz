import type { IGameCategory, IQuestion } from '@/types/types.game'

export const Question: IQuestion = {
  points: 0,
  extraPoints: 0,
  songTitle: '',
  question: 'artist',
  track: '',
  start: 0,
  answer: '',
  active: true
}

export const Category: IGameCategory = {
  categoryName: 'Untitled',
  image: '',
  options: [
    {
      ...Question
    }
  ]
}

export const newCategory = (): IGameCategory => ({
  categoryName: 'Untitled',
  image: '',
  options: [
    {
      ...Question
    }
  ]
})
