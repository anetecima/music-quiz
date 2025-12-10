import type { IGame } from '@/types/Types'
// import Tree from '@/assets/icons/tree.svg'
import Snowfall from 'react-snowfall'
import { cn } from '@/helpers/cn'
import { getImgFromLocalStorage } from '@/helpers/helpers.storage'
import { useIsClient } from '@/hooks/useIsClient'
import { IntermissionModal } from '@/features/quiz/components/quiz.intermission'
import { QuizProvider, useSelectGameObj } from '../quiz.store'
import { QuizAnswers } from './quiz.answers'
import { QuizQuestion } from './quiz.question'

const SnowFall = () => {
  const isClient = useIsClient()

  return isClient ? <Snowfall /> : null
}

const Categories = () => {
  const gameObj = useSelectGameObj()

  if (!gameObj) {
    return <div>Loading</div>
  }

  return (
    <div className="z-[4] flex flex-wrap items-center justify-center gap-12">
      {gameObj?.map((item: IGame['gameObject'][number], categoryIndex: number) => (
        <div
          key={categoryIndex}
          className={cn(
            'relative rounded-md border-4 border-pink-200 bg-white shadow-xl',
            'flex flex-col justify-between gap-2',
            'max-h-[180px] min-h-[100px] min-w-[30%]'
          )}
        >
          <div className="absolute top-0 flex w-full translate-y-[-50%] justify-center">
            <h2 className="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg bg-pink-200 px-4 text-[28px]">
              {item.categoryName}
            </h2>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 px-5 pt-12">
            {item.options.map((item, index) => (
              <QuizQuestion
                key={index}
                question={item}
                questionIndex={index}
                categoryIndex={categoryIndex}
              />
            ))}
          </div>
          {/*<div className="absolute inset-0">
            <img src="https://c.tenor.com/i8dFWAyMu1MAAAAC/tenor.gif" width="460" height="166" />
          </div>*/}
        </div>
      ))}
    </div>
  )
}

export const QuizGame = () => {
  const style = getImgFromLocalStorage()

  return (
    <QuizProvider>
      {/*<Tree width={200} height={300} color="red" className="absolute top-0  z-[4] text-pink-500 " />*/}
      <IntermissionModal />

      <section className="font-fuzzy bg-fur relative h-screen" style={style}>
        <div className="flex h-full flex-col justify-between p-5">
          <div className="relative grow items-center justify-center overflow-auto pt-4">
            <Categories />
            <div className="absolute left-0 top-0 z-[1] h-full w-full">
              <div className="px-22 h-full w-full">
                <SnowFall />
              </div>
            </div>
          </div>
          <div className="shrink-0 p-2">
            <QuizAnswers />
          </div>
        </div>
      </section>
    </QuizProvider>
  )
}
