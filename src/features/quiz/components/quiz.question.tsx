import type { IQuestion } from '@/types/Types'
import { CirclePlay, LoaderCircle } from 'lucide-react'
import React, { useState } from 'react'
import YouTube from 'react-youtube'
import { cn } from '@/helpers/cn'
import { writeToDb } from '@/helpers/db/db.write'
import { useHandleMarkSong } from '@/features/quiz/quiz.store'
import { DiscoBall } from '@/components/animations/discoBall'
import { Modal } from '@/components/modal'
import { Timer } from '@/components/timer'
import { gameQuestions, QuestionType } from '../../../const'

const QuestionAsSong = ({
  onClose,
  question,
  isPlaying
}: {
  isPlaying: boolean
  question: IQuestion
  onClose: () => void
}) => {
  const [showTimer, setShowTimer] = useState(false)
  const { start = 0, track, length = 15 } = question

  return (
    <>
      <div
        className={cn(
          'flex items-center justify-center',
          'bg-game-200 relative h-96 w-96 rounded-full text-9xl transition-opacity delay-500',
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
  const { typeOfQuestion, extraPoints, bonusQuestion, points } = question
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <Modal
      isOpened
      className={cn(
        'bg-game-400 flex items-center justify-center transition duration-500',
        isPlaying && 'bg-game-500'
      )}
      onClose={onClose}
    >
      {isPlaying && <DiscoBall />}
      {/*{isPlaying && randomNum === 2 && <RidingSantas />}*/}

      <article className="flex h-full flex-col">
        <section className="flex flex-col gap-2">
          {!isPlaying && (
            <>
              <h2 className="mt-20 flex items-center justify-between text-4xl lg:text-8xl">
                {gameQuestions[typeOfQuestion] || typeOfQuestion}
                <span className="bg-game-100 ml-2 rounded-full p-6 text-2xl font-bold shadow lg:text-4xl">
                  {points}
                </span>
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
          <section className="flex grow flex-col items-center justify-center">
            {!isPlaying && (
              <div className="cursor-pointer" onClick={() => setIsPlaying(true)}>
                <CirclePlay width={400} height={400} className="stroke-[.9]" />
              </div>
            )}

            {isPlaying && (
              <QuestionAsSong question={question} onClose={onClose} isPlaying={isPlaying} />
            )}
          </section>
        )}

        {isPlaying && (
          <h2 className="absolute bottom-10 mt-20 flex  items-center justify-center py-4 text-center text-4xl">
            {gameQuestions[typeOfQuestion] || typeOfQuestion}
            <span className="ml-2">({points})</span>
          </h2>
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
        onClick={() => setIsOpened(true)}
        className={cn(
          'flex items-center justify-center',
          'h-12 w-12  rounded-full  text-2xl transition',
          active ? 'bg-game-200 cursor-pointer hover:animate-spin' : 'bg-game-200 opacity-30'
        )}
      >
        {points}
      </button>

      {isOpened && <QuizQuestionModal onClose={onModalClose} question={question} />}
    </>
  )
}
