import type { IGame } from '@/types/Types'
// import Tree from '@/assets/icons/tree.svg'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import { IntermissionModal } from '@/features/quiz/components/quiz.intermission'
import { QuizProvider, useSelectGameObj } from '../quiz.store'
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
          className="relative max-h-[180px] min-h-[160px] min-w-[30%] overflow-y-hidden rounded-xl bg-white p-4 shadow-xl"
        >
          <h2 className="relative z-[999] mb-8 text-[28px]">{item.categoryName}</h2>
          <div className="flex items-center justify-between gap-4">
            {item.options.map((item, index) => (
              <QuizQuestion
                key={index}
                question={item}
                questionIndex={index}
                categoryIndex={categoryIndex}
              />
            ))}
          </div>
          {/*<div className="absolute inset-0">*/}
          {/*  <img src="https://c.tenor.com/i8dFWAyMu1MAAAAC/tenor.gif" width="460" height="166" />*/}
          {/*</div>*/}
        </div>
      ))}
    </div>
  )
}

export const QuizGame = () => {
  return (
    <QuizProvider>
      {/*<Tree width={200} height={300} color="red" className="absolute top-0  z-[4] text-pink-500 " />*/}
      <IntermissionModal />
      <SnowFall />
      <div className="font-fuzzy bg-fur z-[2] flex min-h-screen flex-col justify-center bg-white px-12 text-center">
        <div className="relative my-[20px] flex items-center justify-center gap-[20px]">
          {/*<h1 className="relative p-8 text-4xl uppercase lg:text-6xl">Kategorijas</h1>*/}
        </div>
        <Categories />
        <QuizAnswers />
      </div>
    </QuizProvider>
  )
}
