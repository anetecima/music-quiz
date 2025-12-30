import type { IQuestion } from '@/types/Types'
import { CirclePlay, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import YouTube from 'react-youtube'
import { cn } from '@/helpers/cn'
import { writeToDb } from '@/helpers/db/db.write'
import { useHandleMarkSong } from '@/features/quiz/quiz.store'
import { DiscoBall } from '@/components/animations/discoBall'
import { DancingSanta } from '@/components/animations/santa'
import { Modal } from '@/components/modal'
import { Timer } from '@/components/timer'
import { gameQuestions, QuestionType } from '../../../const'

{
  /*<div className="absolute left-[20%] top-0">
          <Spotlight strokeWidth={0.9} width={222} height={222} className="text-yellow-200 " />
        </div>

        <div className="absolute right-[20%] top-0">
          <Spotlight
            strokeWidth={0.9}
            width={222}
            height={222}
            className="scale-x-[-1] text-yellow-200"
          />
        </div>*/
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

  return (
    <>
      {!isPlaying && (
        <div
          className="pos-abt-center absolute top-0 z-[2] cursor-pointer "
          onClick={() => setIsPlaying(true)}
        >
          <CirclePlay width={400} height={400} className="stroke-[.9]" />
        </div>
      )}

      <div
        className={cn(
          'bg-game-200 relative flex h-96 w-96 items-center justify-center rounded-full text-9xl text-[150px] transition-opacity delay-500',
          isPlaying ? 'opacity-100' : 'opacity-0'
        )}
      >
        {showTimer ? (
          <>
            <div className="bg-game-200 absolute h-full w-full animate-[grow_.5s_ease-in-out_infinite] rounded-full text-9xl text-[150px] opacity-80" />
            <div className="z-10">
              <Timer length={+length} />
            </div>
          </>
        ) : (
          <LoaderCircle width={90} height={90} className="animate-spin" strokeWidth={0.9} />
        )}
      </div>

      {isPlaying && (
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
      )}
    </>
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
  const randomNum = Math.floor(Math.random() * 3) + 1

  return (
    <Modal
      isOpened
      className={cn(
        'bg-game-400 items-center justify-center transition duration-500',
        isPlaying && 'bg-game-500'
      )}
      onClose={onClose}
    >
      {isPlaying && randomNum === 1 && <DiscoBall />}
      {isPlaying && randomNum === 2 && <DancingSanta />}
      {isPlaying && randomNum === 3 && (
        <div className="absolute z-[110] h-full w-full">
          <img
            className="absolute left-0 top-10 z-[999] scale-x-[-1] animate-[slideRight_2s_linear_infinite]"
            alt="santa"
            src="https://img1.picmix.com/output/stamp/normal/3/6/8/9/2409863_0d10d.gif"
          />

          <img
            className="absolute bottom-10 right-0 z-[999] animate-[slideLeft_2s_linear_infinite]"
            alt="santa"
            src="https://img1.picmix.com/output/stamp/normal/3/6/8/9/2409863_0d10d.gif"
          />
        </div>
      )}

      <article className="relative flex h-full grow flex-col items-center justify-center">
        <section className="absolute top-24 flex flex-col gap-8">
          {!isPlaying && (
            <>
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
            </>
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
