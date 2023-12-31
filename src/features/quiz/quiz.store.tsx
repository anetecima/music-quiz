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

  return {
    state: {
      gameObject,
      roundQuestions
    },
    markSong: (categoryIndex: number, songIndex: number) => {
      // Mark song as seen
      const newGameObject = gameObject.map((category, cIndex) => {
        // if (cIndex === categoryIndex) {
        //   return {
        //     ...category,
        //     options: category.options.map((song, sIndex) => {
        //       return sIndex === songIndex
        //         ? {
        //             ...song,
        //             active: false
        //           }
        //         : song
        //     })
        //   }
        // } else {
        //   return category
        // }

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

      // push song to the current round list
      const song = gameObject[categoryIndex].options[songIndex]
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
