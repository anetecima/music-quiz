import type { IGame } from '@/types/types.game'
// import Tree from '@/assets/icons/tree.svg'
import React, { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import { IntermissionModal } from '@/features/quiz/components/quiz.intermission'
import { GameContext, useInitGameStore, useSelectGameObj } from '../quiz.store'
import { QuizAnswers } from './quiz.answers'
import { QuizQuestion } from './quiz.question'

const SnowFall = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div
      style={{
        zIndex: '1',
        height: '100vh',
        width: '100%',
        background: 'transparent',
        position: 'absolute'
      }}
    >
      <Snowfall />
    </div>
  )
}

const Categories = () => {
  const gameObj = useSelectGameObj()

  if (!gameObj) {
    return <div>Loading</div>
  }

  return (
    <div className="container mx-auto my-0 flex flex-wrap items-center justify-center gap-12">
      {gameObj?.map((item: IGame['gameObject'][number], categoryIndex: number) => (
        <div
          key={categoryIndex}
          className="relative max-h-[180px] min-w-[30%] rounded-xl bg-white p-4 shadow-xl"
        >
          <h2 className="mb-5 text-[26px]">{item.categoryName}</h2>
          <div className="flex items-center justify-between gap-4">
            {item.options.map((item, index) => (
              <QuizQuestion
                key={index}
                songQuestion={item}
                songIndex={index}
                categoryIndex={categoryIndex}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export const QuizGame = () => {
  const store = useInitGameStore()

  return (
    <GameContext.Provider value={store}>
      {/*<Tree width={200} height={300} color="red" className="absolute  top-0 z-[4] text-pink-500" />*/}
      <IntermissionModal />
      <SnowFall />
      <div className="font-fuzzy bg-fur z-[2] flex h-screen flex-col justify-center px-12 text-center">
        <div className="relative my-[20px] flex items-center justify-center gap-[20px]">
          <h1 className="relative text-4xl uppercase lg:text-6xl">Kategorijas</h1>
        </div>
        <Categories />
        <QuizAnswers />
      </div>
    </GameContext.Provider>
  )
}
