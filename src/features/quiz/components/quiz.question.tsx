import type { IQuestion } from '@/types/types.game'
import IcoPlay from '@/assets/icons/play.svg'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
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

const QuizQuestionModal = ({
  onClose,
  songQuestion
}: {
  songQuestion: IQuestion
  onClose: () => void
}) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const { start = 0, track, question, extraPoints, bonusQuestion, length = 15 } = songQuestion

  return (
    <Modal isOpened className="flex items-center justify-center" onClose={onClose}>
      <div>
        <h2 className="text-7xl">{gameQuestions[question] || question}</h2>
        <div className="relative flex h-[500px] w-[1000px] items-center justify-center text-center">
          {showTimer && <Timer length={length} />}

          {isPlaying ? (
            <div style={{ transform: 'translateY(-10000px)' }}>
              <YouTube
                className="absolute inset-0 h-full w-full"
                videoId={track}
                onEnd={onClose}
                onPlay={() => setShowTimer(true)}
                opts={{
                  playerVars: {
                    start: start,
                    end: start + length,
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
  songQuestion,
  songIndex,
  categoryIndex
}: {
  songQuestion: IQuestion
  songIndex: number
  categoryIndex: number
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const { active, points } = songQuestion
  const handleMarkSong = useHandleMarkSong()

  return (
    <>
      <div
        data-status={active ? 'active' : ''}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-300 text-xl
        transition data-[status=active]:cursor-pointer data-[status=active]:bg-[#f9c7ff]
        data-[status=active]:hover:animate-spin "
        onClick={() => setIsOpened(true)}
      >
        {points}
      </div>

      {isOpened && (
        <QuizQuestionModal
          onClose={() => {
            handleMarkSong?.(categoryIndex, songIndex)
            setIsOpened(false)
          }}
          songQuestion={songQuestion}
        />
      )}
    </>
  )
}
