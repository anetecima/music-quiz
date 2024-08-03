import { IGame } from '@/types/Types'

const KEY = 'gameObject'

export const updateStorage = (formValues: any) => {
  console.log('update', formValues)
  localStorage.setItem(KEY, JSON.stringify(formValues))
}

export const getGameFromStorage = (): IGame | undefined => {
  try {
    const val = localStorage.getItem(KEY)

    if (val) {
      // console.log('JSON.parse(val)', JSON.parse(val))
      return JSON.parse(val)
    }

    return undefined
  } catch (e) {
    console.warn('Error: Local storage get', KEY)
  }
}

export const saveGameProgressToLocal = (gameObject: IGame) => {
  localStorage.setItem(KEY, JSON.stringify(gameObject))
}

export const saveScoresToLocalStorage = (data: any) => {
  localStorage.setItem('quizScores', JSON.stringify(data))
}

export const readScoresFromLocalStorage = () => {
  try {
    const val = localStorage.getItem('quizScores')

    if (val) {
      return JSON.parse(val)
    }

    return null
  } catch (e) {
    console.warn('Error: Local storage get', KEY)
  }
}
