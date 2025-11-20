import type { IGame } from '@/types/Types'
import { useState } from 'react'
import YouTube from 'react-youtube'
import { cn } from '@/helpers/cn'
import { Modal } from '@/components/modal'
import { gameQuestions, QuestionType } from '../../../const'
import {
  useHandleNextRound,
  useHandleResetRound,
  useSelectQuestions,
  useSelectRoundNum
} from '../quiz.store'

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

const AnswerModal = ({
  step,
  setStep,
  onClose
}: {
  onClose: () => void
  step: number
  setStep: (T: number | null) => void
}) => {
  const resetHandler = useHandleResetRound()
  const nextRound = useHandleNextRound()
  const roundQuestions = useSelectQuestions() || []
  const { answer, track, start, typeOfQuestion, points, categoryName } = roundQuestions[step]

  return (
    <Modal className="flex justify-center" isOpened onClose={() => onClose()}>
      <div key={step} className={cn('flex w-full flex-col justify-between gap-2')}>
        <header
          className={cn(
            typeOfQuestion === QuestionType.quiz && 'flex grow flex-col items-center justify-center'
          )}
        >
          <h2 className="text-5xl">
            {step + 1}. {categoryName || gameQuestions[typeOfQuestion]}{' '}
            <span className="rounded-lg bg-purple-200 p-2 text-purple-800">{points}</span>
          </h2>

          <p className="opacity-1 animate-[show_12s_0.5] text-4xl text-purple-800 transition">
            {answer}
          </p>
        </header>

        {track && <YouTubeWrapper track={track} start={start} />}

        <footer className="mx-auto flex items-start gap-2">
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
              if (step >= roundQuestions.length - 1) {
                setStep(null)
                onClose()
                resetHandler?.()
                nextRound?.()
              } else {
                setStep(step + 1)
              }
            }}
          >
            {step >= roundQuestions.length - 1 ? 'Aizvērt' : 'Nākamā'}
          </button>
        </footer>
      </div>
    </Modal>
  )
}

export const QuizAnswers = () => {
  const [step, setStep] = useState<number | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const roundQuestions = useSelectQuestions() || []
  const roundNum = useSelectRoundNum()

  return (
    <>
      <div className="mt-10 flex items-center justify-center gap-2">
        <p className="rounded-xl bg-white p-2 text-xl">
          Round: <span className="text-4xl">{roundNum}</span>
        </p>
        <ul className="flex cursor-pointer items-center justify-center gap-2">
          {roundQuestions?.map((_, index) => (
            <li
              key={index}
              className={cn(
                'flex h-12 w-12 items-center justify-center rounded-full text-4xl',
                step === null || index > step ? 'bg-yellow-300' : 'bg-zinc-300'
              )}
              onClick={() => {
                setOpen(true)
                setStep(index)
              }}
            >
              {index + 1}
            </li>
          ))}
        </ul>
      </div>

      {open && step !== null && (
        <AnswerModal step={step} setStep={setStep} onClose={() => setOpen(false)} />
      )}
    </>
  )
}
