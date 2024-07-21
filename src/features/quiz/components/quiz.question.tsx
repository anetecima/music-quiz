import type { IQuestion } from '@/types/types.game'
import { QuestionType } from '@/types/types.game'
import IcoPlay from '@/assets/icons/play.svg'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { writeToDb } from '@/helpers/db/db.write'
import { useHandleMarkSong } from '@/features/quiz/quiz.store'
import { Modal } from '@/components/modal'
import { gameQuestions } from '../quiz.const'

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

  return (
    <div className="flex h-96 w-96 items-center justify-center rounded-full bg-violet-500 text-9xl text-[150px] text-white">
      {timer}
    </div>
  )
}

const QuestionAsSong = ({ onClose, question }: { question: IQuestion; onClose: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const { start = 0, track, length = 15 } = question
  return (
    <div className="relative flex h-[500px] w-[1000px] items-center justify-center text-center">
      {showTimer && <Timer length={+length} />}
      {isPlaying ? (
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
      ) : (
        <div className="cursor-pointer" onClick={() => setIsPlaying(true)}>
          <IcoPlay width={400} height={400} />
        </div>
      )}
    </div>
  )
}

const QuestionWithVariants = ({
  onClose,
  question
}: {
  onClose: () => void
  question: IQuestion
}) => {
  const { start = 0, track, length = 15 } = question

  useEffect(() => {
    setTimeout(() => {
      onClose()
    }, 10000)
  }, [])

  return (
    <div className="my-4 text-4xl">
      {question.typeOfQuestion === QuestionType.quiz && (
        <div className="mb-4 inline-block border-b-4 border-b-black ">
          {question.quiz?.question}
        </div>
      )}

      {question.typeOfQuestion === QuestionType.quiz && (
        <div
          className="flex flex-col gap-4 text-left [&>*:nth-child(1)]:bg-green-500
         [&>*:nth-child(2)]:bg-red-500 [&>*:nth-child(3)]:bg-yellow-500 [&>*:nth-child(4)]:bg-blue-500"
        >
          {question.quiz?.variants?.map((option, index) => (
            <div key={option} className="rounded-lg p-4">
              {index + 1}. {option}
            </div>
          ))}
        </div>
      )}

      {!!track && (
        <YouTube
          videoId={track}
          opts={{
            playerVars: {
              start: Number(start),
              end: Number(start) + Number(length),
              autoplay: 1
            }
          }}
        />
      )}
    </div>
  )
}

const QuizQuestionModal = ({ onClose, question }: { question: IQuestion; onClose: () => void }) => {
  const { typeOfQuestion, extraPoints, bonusQuestion } = question

  return (
    <Modal isOpened className="flex items-center justify-center" onClose={onClose}>
      <div>
        <h2 className="text-2xl lg:text-7xl">{gameQuestions[typeOfQuestion] || typeOfQuestion}</h2>

        <QuestionWithVariants question={question} onClose={onClose} />

        {question.typeOfQuestion !== QuestionType.quiz && (
          <QuestionAsSong question={question} onClose={onClose} />
        )}

        {bonusQuestion && (
          <>
            <div className="mb-2 text-5xl">Bonus jautājums:</div>
            <div className="text-4xl">{bonusQuestion}</div>
            {extraPoints && <div className="text-4xl">+ {extraPoints} punkti</div>}
          </>
        )}
      </div>
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
  const { active, points } = question
  const handleMarkSong = useHandleMarkSong()

  return (
    <>
      <div
        data-status={active ? 'active' : ''}
        className="z-[2] flex h-12 w-12 items-center justify-center rounded-full bg-zinc-300 text-xl
        transition data-[status=active]:cursor-pointer data-[status=active]:bg-[#f9c7ff]
        data-[status=active]:hover:animate-spin"
        onClick={() => setIsOpened(true)}
      >
        {points}
      </div>

      {isOpened && (
        <QuizQuestionModal
          onClose={async () => {
            if (active) {
              handleMarkSong?.(categoryIndex, questionIndex)

              try {
                await writeToDb(question)
              } catch (e) {
                //
              }
            }

            setIsOpened(false)
          }}
          question={question}
        />
      )}
    </>
  )
}
