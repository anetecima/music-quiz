import type { IGame } from '@/types/types.game'
import React, { useState } from 'react'
import YouTube from 'react-youtube'
import { Modal } from '@/components/modal'
import { gameQuestions } from '../quiz.const'
import { useHandleResetRound, useSelectQuestions } from '../quiz.store'

const YouTubeWrapper = ({
  track,
  start
}: Pick<IGame['roundQuestions'][number], 'track' | 'start'>) => (
  <div className="relative flex w-full flex-[3] items-center justify-center">
    <YouTube
      className="absolute inset-0 mb-4 h-full w-full"
      videoId={track}
      opts={{
        playerVars: {
          start: start,
          autoplay: 1
        }
      }}
    />
  </div>
)

const AnswerModal = ({ step, setStep }: { step: number; setStep: (T: number | null) => void }) => {
  const roundQuestions = useSelectQuestions() || []
  const totalSteps = roundQuestions.length
  const { answer, track, start, question, points, songTitle } = roundQuestions[step]
  const resetHandler = useHandleResetRound()

  return (
    <Modal className="flex justify-center" isOpened onClose={() => setStep(null)}>
      <div key={step} className="flex w-full flex-col justify-between gap-2">
        <h2 className=" text-[40px]">
          {step + 1}. {gameQuestions[question]}
          <br /> {points}
        </h2>

        <div className="opacity-1 animate-[show_12s_0.5] text-purple-800 transition">
          <div className="text-4xl">{answer}</div>
          <div className="text-lg">{songTitle}</div>
        </div>

        <YouTubeWrapper track={track} start={start} />

        <div className="mx-auto flex items-start gap-2">
          <button
            disabled={step === 0}
            className="rounded-lg bg-black p-5 text-2xl text-white disabled:opacity-30"
            onClick={() => step !== 0 && setStep(step - 1)}
          >
            Iepriekšējā
          </button>
          <button
            className="rounded-lg bg-black p-5 text-2xl text-white disabled:opacity-30"
            onClick={() => {
              if (step >= totalSteps - 1) {
                setStep(null)
                resetHandler?.()
              } else {
                setStep(step + 1)
              }
            }}
          >
            {step >= totalSteps - 1 ? 'Aizvērt' : 'Nākamā'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export const QuizAnswers = () => {
  const [step, setStep] = useState<number | null>(null)
  const roundQuestions = useSelectQuestions() || []

  return (
    <>
      <div className="z-[2] mt-10 flex items-center justify-center">
        <ul className=" flex cursor-pointer items-center justify-center gap-2">
          {roundQuestions?.map((_, index) => (
            <li
              key={index}
              className="flex h-12 w-12 items-center justify-center rounded-full text-4xl"
              onClick={() => {
                setStep(index)
              }}
              style={{ backgroundColor: roundQuestions?.[index] ? 'yellow' : 'grey' }}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {step !== null && <AnswerModal step={step} setStep={setStep} />}
    </>
  )
}
