import { IGame } from '@/types/types.game'

const KEY = 'gameObject'

export const updateStorage = (formValues: any) => {
  localStorage.setItem(KEY, JSON.stringify(formValues))
}

export const getGameFromStorage = (): IGame | undefined | null => {
  try {
    const val = localStorage.getItem(KEY)

    if (val) {
      // console.log('JSON.parse(val)', JSON.parse(val))
      return JSON.parse(val)
    }

    return null
  } catch (e) {
    console.warn('Error: Local storage get', KEY)
  }
}

export const saveGameProgress = (
  gameObject: IGame['gameObject'],
  roundQuestions: IGame['roundQuestions']
) => {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      gameObject,
      roundQuestions
    })
  )
}

export const saveScoresToLocalStorage = (data: any) => {
  localStorage.setItem('quizScores', JSON.stringify(data))
}

export const readScoresToLocalStorage = () => {
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
