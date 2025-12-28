import { Pause } from 'lucide-react'
import { useEffect, useState } from 'react'
import Snowfall from 'react-snowfall'
import YouTube from 'react-youtube'
import { cn } from '@/helpers/cn'
import { Modal } from '@/components/modal'

const random = [
  { code: 'GEsU4IcUh2o', start: 0 }, // 2025 mashup
  { code: 'RLn5qNngGn4', start: 71 }, // domingo
  { code: 'OcKMvf6PCgg', start: 0 }, // 2025 mashup
  { code: 'vD479G8PvCQ', start: 17 }, // 2025 mashup
  { code: 'LtdJx-R_nC4', start: 0 } // 2025 mashup
  // { code: '3tmd-ClpJxA', start: 36 }, // Taylor
  // { code: 'uhzy7JaU2Zc', start: 0 }, // LIPS
  // { code: 'e4whRXxnF4Q', start: 0 }, // compilation 1
  // { code: 'e_7m23pgqK4', start: 0 } // compilatoin 2
  // { code: 'ru1LC9lW20Q', start: 20 }
] as const

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max)
}

const YouTubeWrapper = ({ index }: { index: number }) => {
  const { code, start } = random[index]

  return (
    <div className="relative flex w-full flex-[3] items-center justify-center">
      <YouTube
        className={[0, 1].includes(index) ? 'h-screen w-screen' : 'absolute inset-0 h-full w-full'}
        videoId={code}
        opts={{
          playerVars: {
            start: start,
            autoplay: 1
          }
        }}
      />
    </div>
  )
}

const IntermissionBody = ({
  setIsOpened,
  index
}: {
  index: number
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
      <Snowfall />
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="absolute z-[999] flex h-[400px] w-[400px] items-center justify-center rounded-full bg-pink-200 p-12">
          <h2 className="mb-4 animate-ping text-6xl text-pink-800 lg:text-9xl">{timer}</h2>
        </div>
        <div>
          <YouTubeWrapper index={index} />
        </div>
      </div>
    </Modal>
  )
}

export const IntermissionModal = () => {
  const [isOpened, setIsOpened] = useState(false)
  const index = getRandomInt(random.length)

  function onOpen() {
    setIsOpened(true)
  }

  return (
    <>
      <button
        className={cn(
          'absolute right-2 top-2 z-[2]',
          'text-game-200 border-game-100 h-12 w-12 rounded-md border-2 text-4xl',
          'flex items-center justify-center'
        )}
        onClick={onOpen}
      >
        <Pause />
      </button>

      {isOpened && <IntermissionBody index={index} setIsOpened={setIsOpened} />}
    </>
  )
}
