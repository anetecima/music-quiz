import type { IGame } from '@/types/types.game'
import React, { useContext, useEffect, useState } from 'react'
import { getGameFromStorage, saveGameProgress } from '@/helpers/helpers.storage'

export const useInitGameStore = () => {
  const [gameObject, setGameObject] = useState<IGame['gameObject']>([])
  const [roundQuestions, setRoundQuestions] = useState<IGame['roundQuestions']>([])

  useEffect(() => {
    const gameObj = (getGameFromStorage() as IGame) || {}

    if (gameObj) {
      setGameObject(gameObj?.gameObject || [])
      setRoundQuestions(gameObj?.roundQuestions || [])
    }
  }, [])

  if (!gameObject.length) {
    return null
  }

  return {
    state: {
      gameObject,
      roundQuestions
    },
    // mark song as seen and push to state question
    markSong: (categoryIndex: number, songIndex: number) => {
      // Mark song as seen
      const newGameObject = gameObject.map((category, cIndex) => {
        return cIndex !== categoryIndex
          ? category
          : {
              ...category,
              options: category.options.map((song, sIndex) => {
                return sIndex === songIndex
                  ? {
                      ...song,
                      active: false
                    }
                  : song
              })
            }
      })

      const song = gameObject[categoryIndex].options[songIndex]
      song.categoryName = gameObject[categoryIndex].categoryName
      const newRoundQuestions = [...roundQuestions, song]

      setGameObject(newGameObject)
      setRoundQuestions(newRoundQuestions)
      // update local storage
      saveGameProgress(newGameObject, newRoundQuestions)
    },

    resetRound: () => {
      setRoundQuestions([])
      saveGameProgress(gameObject, [])
    }
  }
}

type R = ReturnType<typeof useInitGameStore>
export const GameContext = React.createContext<R | null>(null)

// SELECTORS
export const useSelectGameObj = () => useContext(GameContext)?.state?.gameObject
export const useSelectQuestions = () => useContext(GameContext)?.state?.roundQuestions

// ACTIONS
export const useHandleResetRound = () => useContext(GameContext)?.resetRound
export const useHandleMarkSong = () => useContext(GameContext)?.markSong
