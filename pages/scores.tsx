import type { IQuestion } from '@/types/types.game'
import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useState } from 'react'
import { fetchDataFromDb } from '@/helpers/db/db.read'
import { readScoresToLocalStorage, saveScoresToLocalStorage } from '@/helpers/helpers.storage'
import { SimpleButton } from '@/components/ux/Button'

type Players = { name: string; points: number }[]
type IScores = { name: string; total: number; points: (number | null)[] }[]

const AnswerBtn = ({ children, ...props }: { children: ReactNode } & any) => {
  return (
    <SimpleButton
      className="w-full bg-blue-500 px-4 text-white shadow disabled:opacity-20 lg:h-10"
      {...props}
    >
      {children}
    </SimpleButton>
  )
}

function Page({ questions, players }: { questions: IQuestion[]; players: Players }) {
  const [playerIndex, setPlayerIndex] = useState(0)
  const [playerTable, setPlayerTable] = useState<IScores>(() => {
    const prevDataFromStorage = readScoresToLocalStorage() as IScores

    if (prevDataFromStorage) {
      return prevDataFromStorage.map(player => ({
        name: player.name,
        total: player.total,
        points: questions.map((_, index) => {
          return player.points[index] || null
        })
      }))
    }

    return players.map(player => ({
      name: player.name,
      total: 0,
      points: questions.map(() => null)
    }))
  })

  const nextPlayerClick = () => setPlayerIndex(prev => prev + 1)
  const prevPlayerClick = () => setPlayerIndex(prev => prev - 1)

  const addPoints = (newPoints: number, index: number) => {
    if (playerTable && playerTable[playerIndex]) {
      setPlayerTable(prev => {
        const resTable = prev.map((player, pIndex) => {
          const result =
            pIndex !== playerIndex
              ? player
              : {
                  ...player,
                  points: player.points.map((point, pIndex) =>
                    pIndex === index ? newPoints : point
                  )
                }

          result.total = result.points.reduce((acc, p) => Number(acc) + Number(p), 0) || 0
          return result
        })

        saveScoresToLocalStorage(resTable)
        return resTable
      })
    }
  }

  return (
    <section className="mx-auto flex h-[100dvh] flex-col gap-4 px-2 py-2 lg:container">
      <header className="rounded border-2 border-pink-500 p-4">
        <h2 className="mb-2 text-xl text-pink-500">Scores</h2>
        <ul className="mx-8 list-disc text-lg">
          {playerTable?.map((player, pIndex) => (
            <li key={pIndex} className="capitalize text-pink-500">
              {player?.name} <strong>{player?.total}</strong>
            </li>
          ))}
        </ul>
      </header>

      <aside className="grow overflow-y-scroll">
        {questions.map((question: IQuestion, index) => {
          const points = playerTable[playerIndex]?.points?.[index]

          return (
            <div
              key={index}
              className="border-blue my-2 items-center justify-between border-2 px-4 py-4"
            >
              <div>
                {index + 1} {question.answer} <strong>{question.points}</strong>
              </div>
              <div className="mt-2">
                <div className="mb-2 flex w-full justify-between gap-4">
                  <AnswerBtn
                    disabled={question.points === points}
                    onClick={() => addPoints(question.points, index)}
                  >
                    Correct {question.points}
                  </AnswerBtn>

                  <AnswerBtn
                    disabled={points === question.points + question.points * 0.5}
                    onClick={() => addPoints(question.points + question.points * 0.5, index)}
                  >
                    Correct {question.points + question.points * 0.5}
                  </AnswerBtn>
                </div>

                <div className="flex w-full justify-between gap-4">
                  <AnswerBtn disabled={points === 0} onClick={() => addPoints(0, index)}>
                    Wrong
                  </AnswerBtn>

                  <AnswerBtn
                    disabled={points === question.points * 0.5 * -1}
                    onClick={() => addPoints(question.points * 0.5 * -1, index)}
                  >
                    Wrong {question.points * 0.5 * -1}
                  </AnswerBtn>
                </div>
              </div>
            </div>
          )
        })}
      </aside>

      <footer className="flex flex-wrap items-center justify-around border-t-2 px-4 py-2 md:flex-col">
        <h1 className=" text-xl capitalize text-pink-700">
          {players?.[playerIndex]?.name}. Total: <strong>{playerTable[playerIndex].total}</strong>
        </h1>

        <div className="flex gap-4">
          <SimpleButton
            disabled={playerIndex === 0}
            onClick={prevPlayerClick}
            className="h-12 bg-purple-400 px-4 text-white shadow disabled:opacity-30"
          >
            Prev
          </SimpleButton>
          <SimpleButton
            disabled={playerIndex === players.length - 1}
            onClick={nextPlayerClick}
            className="h-12 bg-purple-400 px-4 text-white shadow disabled:opacity-30"
          >
            Next
          </SimpleButton>
        </div>
      </footer>
    </section>
  )
}

export default function Edit() {
  const [isClient, setIsClient] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const router = useRouter()
  const [questions, setQuestions] = useState<IQuestion[]>([])

  useEffect(() => {
    fetchDataFromDb().then(response => {
      // @ts-ignore
      let _r = response.sort((a, b) => b.timestamp - a.timestamp)
      setQuestions(_r as IQuestion[])
      setIsReady(true)
    })

    setIsClient(true)
  }, [])

  if (!isClient || !isReady) {
    return (
      <div className="flex h-screen items-center justify-center text-2xl font-bold">
        Please wait, loading...
      </div>
    )
  }

  const players: Players = router?.query?.players
    ? JSON.parse(router?.query?.players as string)
    : []

  if (!players?.length) {
    return null
  }

  return <Page players={players} questions={questions} />
}
