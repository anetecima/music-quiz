import type { IGame } from '@/types/Types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react'
import { cn } from '@/helpers/cn'
import { deleteCollection } from '@/helpers/db/db.write'
import {
  getGameFromStorage,
  saveScoresToLocalStorage,
  updateStorage
} from '@/helpers/helpers.storage'
import { MainGameWrapper } from '@/components/container'

const LinkButton = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
        'relative text-4xl hover:underline'
      // 'relative cursor-pointer rounded-full p-12 text-2xl uppercase transition-colors',
      // 'bg-white hover:bg-purple-400 hover:opacity-90'
    )}
  >
    {children}
  </div>
)

const LinkItem = ({
  children,
  href,
  onClick
}: PropsWithChildren<{ href: string; onClick?: () => void }>) => (
  <Link href={href} onClick={onClick}>
    <LinkButton>{children}</LinkButton>
  </Link>
)

const BackToGame = () => {
  const [hasGame, setHasGame] = useState(false)

  useEffect(() => {
    if (getGameFromStorage()) {
      setHasGame(true)
    }
  }, [])

  if (!hasGame) {
    return null
  }

  return (
    <>
      <LinkItem href="/quiz">Turpināt spēli</LinkItem>
      <LinkItem
        href="/quiz"
        onClick={() => {
          const game = getGameFromStorage() as IGame
          if (game) {
            updateStorage({
              ...game,
              roundQuestions: [],
              gameObject: game.gameObject.map(category => ({
                ...category,
                options: category.options.map(option => ({
                  ...option,
                  active: true
                }))
              }))
            })

            saveScoresToLocalStorage(null)
            void deleteCollection()
          }
        }}
      >
        Sakt no sakuma
      </LinkItem>
    </>
  )
}

const UploadGameButton = () => {
  const router = useRouter()

  return (
    <LinkButton>
      Augšupielādēt failu un spēlēt
      <input
        className="absolute inset-0 z-[3] cursor-pointer opacity-0"
        type="file"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            let reader = new FileReader()
            reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
              if (readerEvent?.target?.result) {
                let obj = JSON.parse(readerEvent.target.result as string)
                updateStorage({ roundQuestions: [], ...obj })
                router.push('/quiz')
              }
            }
            reader.readAsText(e.target.files[0])
          }
        }}
      />
    </LinkButton>
  )
}

export const HomePage = () => (
  <MainGameWrapper>
    <div className="flex flex-wrap items-center justify-center gap-10 lg:flex-nowrap">
      <LinkItem href="/edit">Rediģēt vai izveidot spēles failu</LinkItem>
      <UploadGameButton />
      <BackToGame />
    </div>
  </MainGameWrapper>
)
