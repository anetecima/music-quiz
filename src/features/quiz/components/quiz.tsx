import type { IGame } from '@/types/Types'
import Link from 'next/link'
import { cn } from '@/helpers/cn'
import { IntermissionModal } from '@/features/quiz/components/quiz.intermission'
import { QuizSpecialRoundModal } from '@/features/quiz/components/quiz.specialRound'
import { MainGameWrapper } from '@/components/container'
import { QuizProvider, useSelectGameObj } from '../quiz.store'
import { QuizAnswers } from './quiz.answers'
import { QuizQuestion } from './quiz.question'

const Categories = () => {
  const gameObj = useSelectGameObj()

  if (!gameObj) {
    return <div>Loading</div>
  }

  return (
    <div className="container mx-auto flex flex-wrap items-center justify-center gap-10">
      {gameObj?.map((item: IGame['gameObject'][number], categoryIndex: number) => (
        <div
          key={categoryIndex}
          className={cn(
            'relative  overflow-y-hidden',
            'rounded-xl  p-4 text-center shadow-xl',
            item.isSpecial ? '' : 'min-h-[120px] min-w-[30%] bg-white'
          )}
        >
          {item.isSpecial && <QuizSpecialRoundModal item={item} categoryIndex={categoryIndex} />}

          {!item.isSpecial && (
            <h2 className={cn('relative z-[1] inline-flex p-1 text-3xl font-bold')}>
              {item.categoryName}
            </h2>
          )}

          {!item.isSpecial && (
            <div className="z-[1] flex items-center justify-between gap-4">
              {item.options.map((item, index) => (
                <QuizQuestion
                  key={index}
                  question={item}
                  questionIndex={index}
                  categoryIndex={categoryIndex}
                />
              ))}
            </div>
          )}

          {/*<div className="absolute inset-0 flex w-full items-center justify-center">*/}
          {/*<img*/}
          {/*  src="https://media.tenor.com/VnZqP8XcaMsAAAAj/little-pills.gif"*/}
          {/*  width="360"*/}
          {/*  height="166"*/}
          {/*/>*/}
          {/*<img src="https://tenor.com/hAoVG3aHt5z.gif" width="460" height="166" />*/}
          {/*<img src="https://c.tenor.com/i8dFWAyMu1MAAAAC/tenor.gif" width="460" height="166" />*/}
          {/*<img src="/underwater_1.jpg" className="h-full w-full object-cover" />*/}
          {/*</div>*/}
        </div>
      ))}
    </div>
  )
}

export const QuizGame = () => {
  return (
    <QuizProvider>
      <IntermissionModal />
      <Link className="absolute left-2 top-2 cursor-pointer text-xl text-white underline" href="/">
        Back
      </Link>

      <MainGameWrapper className="bg-main-game">
        <Categories />
        <QuizAnswers />
      </MainGameWrapper>
    </QuizProvider>
  )
}
