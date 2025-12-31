import type { IGame } from '@/types/Types'
// import Tree from '@/assets/icons/tree.svg'
import Snowfall from 'react-snowfall'
import { cn } from '@/helpers/cn'
import { getImgFromLocalStorage } from '@/helpers/helpers.storage'
import { useIsClient } from '@/hooks/useIsClient'
import { IntermissionModal } from '@/features/quiz/components/quiz.intermission'
import { HomeButton } from '@/components/homeButton'
import { ThemeModeButton } from '@/components/themeProvider'
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
    <div className="z-[4] flex flex-wrap items-center justify-center gap-12 overflow-auto py-5">
      {gameObj?.map((item: IGame['gameObject'][number], categoryIndex: number) => (
        <article
          key={categoryIndex}
          className={cn(
            'border-game-100 rounded-lg border-4 bg-white shadow-xl',
            'flex flex-col justify-between px-5'
            // 'max-h-[180px] min-h-[100px]'
          )}
        >
          <div className={cn('translate-y-[-50%] text-center')}>
            <h2 className="bg-game-100 inline overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-4 text-[28px] font-semibold text-black">
              {item.categoryName}
            </h2>
          </div>

          <div className="flex items-center justify-center gap-4 px-5 py-4">
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
        </article>
      ))}
    </div>
  )
}

export const QuizGame = () => {
  const style = getImgFromLocalStorage()

  return (
    <QuizProvider>
      {/*<Tree width={200} height={300} color="red" className="absolute top-0  z-[4] text-pink-500 " />*/}

      <article className="bg-fur relative h-screen" style={style || {}}>
        <section className="flex h-full flex-col justify-between">
          <div className="relative flex items-center p-2">
            <div className="flex grow items-center gap-2">
              <HomeButton />
              <ThemeModeButton />
            </div>
            <div>
              <IntermissionModal />
            </div>
          </div>

          <div className="relative flex grow items-center justify-center overflow-auto">
            <Categories />

            <div className="absolute left-0 top-0 z-[1] h-full w-full">
              <div className="px-22 h-full w-full">
                <SnowFall />
              </div>
            </div>
          </div>

          <div className="shrink-0 p-2 pt-10">
            <QuizAnswers />
          </div>
        </section>
      </article>
    </QuizProvider>
  )
}
