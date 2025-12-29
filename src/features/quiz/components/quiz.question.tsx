import type { IQuestion } from '@/types/Types'
import { CirclePlay, LoaderCircle } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { cn } from '@/helpers/cn'
import { writeToDb } from '@/helpers/db/db.write'
import { useHandleMarkSong } from '@/features/quiz/quiz.store'
import { Modal } from '@/components/modal'
import { gameQuestions, QuestionType } from '../../../const'

const Timer = ({ length }: { length: number }) => {
  const [timer, setTimer] = useState(length)

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(seconds => seconds - 1)
    }, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [])

  return <>{timer}</>
}

const QuestionAsSong = ({
  onClose,
  question,
  isPlaying,
  setIsPlaying
}: {
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
  question: IQuestion
  onClose: () => void
}) => {
  const [showTimer, setShowTimer] = useState(false)
  const { start = 0, track, length = 15 } = question

  if (isPlaying) {
    return (
      <>
        {/*<div className="absolute left-[20%] top-0">
          <Spotlight strokeWidth={0.9} width={222} height={222} className="text-yellow-200 " />
        </div>

        <div className="absolute right-[20%] top-0">
          <Spotlight
            strokeWidth={0.9}
            width={222}
            height={222}
            className="scale-x-[-1] text-yellow-200"
          />
        </div>*/}

        <div className="bg-game-200 flex h-96 w-96 items-center justify-center rounded-full text-9xl text-[150px] ">
          {showTimer ? (
            <Timer length={+length} />
          ) : (
            <LoaderCircle width={90} height={90} className="animate-spin" strokeWidth={0.9} />
          )}
        </div>

        <div style={{ transform: 'translateY(-10000px)' }}>
          <YouTube
            className="absolute inset-0 h-full w-full"
            videoId={track}
            onEnd={onClose}
            onPlay={() => setShowTimer(true)}
            opts={{
              playerVars: {
                start: Number(start),
                end: Number(start) + Number(length),
                autoplay: 1
              }
            }}
          />
        </div>
      </>
    )
  }

  return (
    <div className="cursor-pointer" onClick={() => setIsPlaying(true)}>
      <CirclePlay width={400} height={400} />
    </div>
  )
}

const QuestionWithVariants = ({ question }: { question: IQuestion }) => {
  return (
    <div className="my-4 h-full">
      <div className="mb-4 inline-block border-b-4 border-b-black text-4xl">
        {question.quiz?.question}
      </div>
      <div
        className="flex flex-col gap-2 text-left [&>*:nth-child(1)]:bg-green-500
         [&>*:nth-child(2)]:bg-red-500 [&>*:nth-child(3)]:bg-yellow-500 [&>*:nth-child(4)]:bg-blue-500"
      >
        {question.quiz?.variants?.map((option, index) => (
          <div key={index} className="rounded-lg p-2 text-2xl">
            {index + 1}. {option}
          </div>
        ))}
      </div>

      {question.track && (
        <div className="mx-auto mt-2 w-full">
          <YouTube
            className="mx-auto h-full w-full"
            videoId={question.track}
            opts={{
              playerVars: {
                start: Number(question.start) || 0,
                end: Number(question.start || 0) + Number(question.length || 0),
                autoplay: 1
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

const QuizQuestionModal = ({ onClose, question }: { question: IQuestion; onClose: () => void }) => {
  const { typeOfQuestion, extraPoints, bonusQuestion } = question
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Modal
      isOpened
      className={cn(
        'bg-game-400 items-center justify-center transition duration-500',
        isPlaying && 'bg-game-500'
      )}
      onClose={onClose}
    >
      {isPlaying && (
        <div className="absolute z-[999999999] h-full w-full animate-[slide_3s_forwards] bg-white">
          <div className="absolute z-[999999999] flex h-full w-full items-center justify-center">
            <img
              alt="santa"
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExdW96bWozcHBiYnhyeW05eGt1bDd1MmR2cTA1MGo1ZGJlOXZ6Nzc5NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kfozgIgxf5qyvWwByh/giphy.gif"
              width="460"
              height="166"
            />
          </div>
        </div>
      )}

      <article className="relative flex h-full grow flex-col items-center justify-center">
        <section className="absolute top-24 flex flex-col gap-8">
          <h2 className="text-4xl lg:text-8xl">
            {gameQuestions[typeOfQuestion] || typeOfQuestion}
          </h2>

          {bonusQuestion && (
            <div className="flex flex-wrap items-center gap-2 text-xl lg:text-5xl">
              <h3 className="underline">Bonus jautājums:</h3>
              <p className="flex items-center gap-2 ">
                {bonusQuestion}
                {extraPoints && <span className="">(+ {extraPoints} punkti)</span>}
              </p>
            </div>
          )}
        </section>

        {question.typeOfQuestion === QuestionType.quiz ? (
          <QuestionWithVariants question={question} />
        ) : (
          <QuestionAsSong
            question={question}
            onClose={onClose}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </article>
    </Modal>
  )
}

export const QuizQuestion = ({
  question,
  questionIndex,
  categoryIndex
}: {
  question: IQuestion
  questionIndex: number
  categoryIndex: number
}) => {
  const [isOpened, setIsOpened] = useState(false)
  // Mark song as not active
  const markSongAsNotActive = useHandleMarkSong()
  const { active, points } = question

  async function onModalClose() {
    setIsOpened(false)
    // Not played yet
    if (active) {
      markSongAsNotActive?.(categoryIndex, questionIndex)

      try {
        await writeToDb(question)
      } catch (e) {
        //
      }
    }
  }

  return (
    <>
      <button
        data-status={active ? 'active' : ''}
        onClick={() => setIsOpened(true)}
        className={cn(
          'z-[2] flex h-12 w-12 items-center justify-center rounded-full  text-xl',
          'data-[status=active]:bg-game-200 bg-zinc-300',
          'data-[status=active]:cursor-pointer data-[status=active]:hover:animate-spin',
          'transition'
        )}
      >
        {points}
      </button>

      {isOpened && <QuizQuestionModal onClose={onModalClose} question={question} />}
    </>
  )
}
