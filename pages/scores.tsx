import type { IGame, IQuestion } from '@/types/types.game'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getGameFromStorage } from '@/helpers/helpers.storage'
import { SimpleButton } from '@/components/ux/Button'

type Players = { name: string; points: number }[]

type IScores = { name: string; total: number; points: (number | null)[] }[]

function Page({ players }: { players: Players }) {
  const storageGame = getGameFromStorage() as IGame
  const [playerIndex, setPlayerIndex] = useState(0)
  const [playerTable, setPlayerTable] = useState<IScores>(() => {
    return players.map(player => ({
      name: player.name,
      total: 0,
      points: storageGame?.roundQuestions.map(() => null)
    }))
  })

  const nextPlayerClick = () => setPlayerIndex(prev => prev + 1)
  const prevPlayerClick = () => setPlayerIndex(prev => prev - 1)

  return (
    <main className="mx-auto mt-12 flex items-start justify-between gap-4 lg:container">
      <article className="grow rounded-xl border-2 border-pink-500 p-12 shadow-xl">
        <h2 className="text-xl text-pink-500">Scores</h2>
        <ul className="list-disc text-lg">
          {playerTable?.map((player, pIndex) => (
            <li key={pIndex} className="capitalize text-pink-500">
              {player?.name} <strong>{player?.total}</strong>
            </li>
          ))}
        </ul>
      </article>

      <aside className="grow rounded-xl border-2 border-blue-500 p-8 shadow-xl">
        <h1
          className="mx-auto flex h-20 w-40 items-center justify-center rounded-xl
        bg-pink-500 text-center text-2xl capitalize text-white shadow-2xl"
        >
          {players?.[playerIndex]?.name}
          <br />
          Total: {playerTable[playerIndex].total}
        </h1>

        {storageGame?.roundQuestions.map((question: IQuestion, index) => {
          const addPoints = (newPoints: number) => {
            if (playerTable && playerTable[playerIndex]) {
              setPlayerTable(prev => {
                return prev.map((player, pIndex) => {
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
              })
            }
          }

          const points = playerTable[playerIndex]?.points?.[index]

          return (
            <div
              key={index}
              className="border-blue my-2 flex h-24 items-center justify-between border-2 px-4 py-4"
            >
              <div>
                {index + 1} {question.answer} <strong>{question.points}</strong>
              </div>
              <div className="flex gap-4">
                <SimpleButton
                  disabled={question.points === points}
                  className="h-12 bg-green-500 px-4 text-white shadow disabled:opacity-20"
                  onClick={() => addPoints(question.points)}
                >
                  Correct {question.points}
                </SimpleButton>
                <SimpleButton
                  disabled={points === question.points + question.points * 0.5}
                  className="h-12 bg-green-500 px-4 text-white shadow disabled:opacity-20"
                  onClick={() => addPoints(question.points + question.points * 0.5)}
                >
                  Correct {question.points + question.points * 0.5}
                </SimpleButton>
                <SimpleButton
                  disabled={points === 0}
                  className="h-12 bg-pink-500 px-4 text-white shadow disabled:opacity-20"
                  onClick={() => addPoints(0)}
                >
                  Wrong
                </SimpleButton>
                <SimpleButton
                  disabled={points === question.points * 0.5 * -1}
                  className="h-12 bg-pink-500 px-4 text-white shadow disabled:opacity-20"
                  onClick={() => addPoints(question.points * 0.5 * -1)}
                >
                  Wrong {question.points * 0.5 * -1}
                </SimpleButton>
              </div>
            </div>
          )
        })}

        <div className="mx-auto my-4 flex justify-center gap-4">
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
      </aside>
    </main>
  )
}

export default function Edit() {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const players: Players = router?.query?.players
    ? JSON.parse(router?.query?.players as string)
    : []

  if (!players?.length) {
    return null
  }

  return <Page players={players} />
}
