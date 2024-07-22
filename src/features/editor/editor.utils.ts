import type { IGameCategory } from '@/types/Types'
import { Question } from '../../const'

export const newCategory = (): IGameCategory => ({
  categoryName: 'Untitled',
  image: '',
  options: [
    {
      ...Question
    }
  ]
})
