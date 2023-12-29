import type { IGame } from '@/types/types.game'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, PropsWithChildren, useEffect, useState } from 'react'
import { getGameFromStorage, updateStorage } from '@/helpers/helpers.storage'

const LinkItem = ({
  children,
  href,
  onClick
}: PropsWithChildren<{ href: string; onClick?: () => void }>) => (
  <Link
    href={href}
    onClick={onClick}
    className="cursor-pointer rounded-[100%] p-14 text-3xl uppercase transition-all hover:bg-purple-400 hover:opacity-90"
  >
    {children}
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
    <div className="relative cursor-pointer rounded-[100%] p-14 text-3xl uppercase transition-all hover:bg-purple-400 hover:opacity-90">
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
    </div>
  )
}

export const HomePage = () => (
  <main className="font-fuzzy bg-fur flex min-h-screen flex-col justify-center px-12 text-center">
    <div className="flex w-full items-center justify-center">
      <LinkItem href="/edit">Rediģēt vai izveidot spēles failu</LinkItem>
      <UploadGameButton />
      <BackToGame />
    </div>
  </main>
)
