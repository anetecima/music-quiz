import type { IGame } from '@/types/types.game'
import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { Modal } from '@/components/modal'

const random = [
  { code: '3tmd-ClpJxA', start: 36 },
  { code: 'uhzy7JaU2Zc', start: 0 },
  { code: 'CS9OO0S5w2k', start: 0 },
  { code: 'ru1LC9lW20Q', start: 20 }
] as const

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}
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

const IntermissionBody = ({
  setIsOpened,
  track
}: {
  track: (typeof random)[number]
  setIsOpened: (T: boolean) => void
}) => {
  const [timer, setTimer] = useState(180)

  useEffect(() => {
    const timeout = setInterval(() => {
      setTimer(seconds => seconds - 1)
    }, 1000)

    return () => {
      setTimer(180)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <Modal className="flex justify-center" isOpened onClose={() => setIsOpened(false)}>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="animate-ping text-6xl text-pink-800 lg:text-9xl">{timer}</h2>
        <div className="invisible">
          <YouTubeWrapper track={track.code} start={track.start} />
        </div>
      </div>
    </Modal>
  )
}

export const IntermissionModal = () => {
  const [isOpened, setIsOpened] = useState(false)
  const track = getRandomInt(random.length)

  return (
    <>
      <button
        className="absolute right-4 top-4 h-12 w-12 text-4xl"
        onClick={() => setIsOpened(true)}
      >
        ||
      </button>

      {isOpened && <IntermissionBody track={random[track]} setIsOpened={setIsOpened} />}
    </>
  )
}
