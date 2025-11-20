import type { IGame } from '@/types/Types'
import { useState } from 'react'
import YouTube from 'react-youtube'
import { Modal } from '@/components/modal'
import { gameQuestions } from '../../../const'
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
  const resetHandler = useHandleResetRound()
  const roundQuestions = useSelectQuestions() || []
  const { answer, track, start, typeOfQuestion, points, categoryName } = roundQuestions[step]

  function onPrevClick() {
    step !== 0 && setStep(step - 1)
  }

  function onNextClick() {
    if (step >= roundQuestions.length - 1) {
      setStep(null)
      resetHandler?.()
    } else {
      setStep(step + 1)
    }
  }

  return (
    <Modal className="flex justify-center" isOpened onClose={() => setStep(null)}>
      <div key={step} className="flex w-full flex-col justify-between gap-2">
        <h2 className="text-3xl">
          {step + 1}. {categoryName || gameQuestions[typeOfQuestion]}{' '}
          <span className="rounded-lg bg-purple-200 p-2 text-purple-800">{points}</span>
        </h2>

        <div className="opacity-1 animate-[show_12s_0.5] text-purple-800 transition">
          <p className="text-3xl">{answer}</p>
        </div>

        {track && <YouTubeWrapper track={track} start={start} />}

        <div className="mx-auto flex items-start gap-2">
          <button
            disabled={step === 0}
            className="rounded-lg bg-black p-5 text-2xl text-white disabled:opacity-30"
            onClick={onPrevClick}
          >
            Iepriekšējā
          </button>

          <button
            className="rounded-lg bg-black p-5 text-2xl text-white disabled:opacity-30"
            onClick={onNextClick}
          >
            {step >= roundQuestions.length - 1 ? 'Aizvērt' : 'Nākamā'}
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
      <div className="z-[2] flex items-center justify-center">
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
