import type { IGame } from '@/types/Types'
import { produce } from 'immer'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { getGameFromStorage, saveGameProgressToLocal } from '@/helpers/helpers.storage'

export const useInitGameStore = () => {
  const [quizGame, setQuizGame] = useState<IGame>()

  useEffect(() => {
    const gameObj = (getGameFromStorage() as IGame) || {}
    setQuizGame(gameObj)
  }, [])

  if (!quizGame?.gameObject.length) {
    return null
  }

  return {
    quizGame: quizGame,

    // Main Handler for question status when clicked
    markSong: (categoryIndex: number, songIndex: number) => {
      const newGameObject = produce(quizGame, draft => {
        draft.gameObject[categoryIndex].options[songIndex].active = false
        const song = quizGame.gameObject[categoryIndex].options[songIndex]
        draft.roundQuestions.push({
          ...song,
          // we cannot assign categoryName to each question, (on category name change, need to update all children)
          categoryName: draft.gameObject[categoryIndex].categoryName
        })
      })

      setQuizGame(newGameObject)
      saveGameProgressToLocal(newGameObject)
    },

    resetRound: () => {
      const mutated = {
        ...quizGame,
        roundQuestions: []
      }

      setQuizGame(mutated)
      saveGameProgressToLocal(mutated)
    }
  }
}

type R = ReturnType<typeof useInitGameStore>
export const GameContext = createContext<R | null>(null)

// SELECTORS
export const useSelectGameObj = () => useContext(GameContext)?.quizGame?.gameObject
export const useSelectQuestions = () => useContext(GameContext)?.quizGame?.roundQuestions

// ACTIONS
export const useHandleResetRound = () => useContext(GameContext)?.resetRound
export const useHandleMarkSong = () => useContext(GameContext)?.markSong

export const QuizProvider = ({ children }: PropsWithChildren) => {
  const store = useInitGameStore()

  return <GameContext.Provider value={store}>{children}</GameContext.Provider>
}
