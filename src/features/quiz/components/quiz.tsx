import type { IGame } from '@/types/Types'
// import Tree from '@/assets/icons/tree.svg'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import { cn } from '@/helpers/cn'
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
    <div className="absolute top-0 z-[1] h-screen w-full bg-transparent">
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
          className={cn(
            'max-h-[180px] min-h-[160px] min-w-[30%] ',
            'overflow-y-hidden rounded-xl bg-white p-4 text-center shadow-xl'
          )}
        >
          <h2 className="mb-8 text-[28px]">{item.categoryName}</h2>
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
      {/*<div className="px-12">*/}
      {/*</div>*/}
      <section className="font-fuzzy bg-fur relative  h-screen">
        <div className="flex h-full flex-col justify-center  p-2">
          <div className="relative grow overflow-auto">
            <Categories />
            <SnowFall />
          </div>
          <div className="shrink-0  p-2">
            <QuizAnswers />
          </div>
        </div>
      </section>
    </QuizProvider>
  )
}
