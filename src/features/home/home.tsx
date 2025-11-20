import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ChangeEvent, ComponentProps, PropsWithChildren, useEffect, useState } from 'react'
import { cn } from '@/helpers/cn'
import { getGameFromStorage } from '@/helpers/helpers.storage'
import { onGameJsonUpload, onStartFromScratch } from '@/features/home/home.helpers'

const Item = ({ className = '', ...props }: PropsWithChildren<ComponentProps<'div'>>) => {
  return (
    <div
      {...props}
      className={cn(
        className,
        'relative',
        ' bg-white hover:bg-purple-400 hover:opacity-90',
        'cursor-pointer rounded-md p-5 text-xl uppercase transition-all'
      )}
    />
  )
}

const LinkItem = ({
  children,
  href,
  onClick
}: PropsWithChildren<{ href: string; onClick?: () => void }>) => (
  <Link href={href} onClick={onClick}>
    <Item>{children}</Item>
  </Link>
)

export const HomePage = () => {
  const router = useRouter()
  const [hasGame, setHasGame] = useState(false)

  useEffect(() => {
    if (getGameFromStorage()) {
      setHasGame(true)
    }
  }, [])

  function upload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      onGameJsonUpload(e.target.files[0], () => router.push('/quiz'))
    }
  }

  return (
    <main className="bg-fur flex min-h-screen justify-center">
      <div className="container flex flex-col items-center  justify-center gap-4 text-center md:flex-row">
        <LinkItem href="/edit">Rediģēt vai izveidot spēles failu</LinkItem>
        <Item>
          Augšupielādēt failu un spēlēt
          <input
            type="file"
            className="absolute inset-0 z-[3] cursor-pointer opacity-0"
            onChange={upload}
          />
        </Item>
        {hasGame && (
          <>
            <LinkItem href="/quiz">Turpināt spēli</LinkItem>
            <LinkItem href="/quiz" onClick={onStartFromScratch}>
              Sakt no sakuma
            </LinkItem>
          </>
        )}
      </div>
    </main>
  )
}
