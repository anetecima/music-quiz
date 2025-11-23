import type { IDbQuestion, IQuestion } from '@/types/Types'
import { useRouter } from 'next/router'
import { produce } from 'immer'
import { Loader2 } from 'lucide-react'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { fetchDataFromDb } from '@/helpers/db/db.read'
import { readScoresFromLocalStorage, saveScoresToLocalStorage } from '@/helpers/helpers.storage'
import { SimpleButton } from '@/components/ux/Button'

type Players = { name: string; points: number }[]
type IScores = { name: string; total: number; points: (number | null)[] }[]

const AnswerBtn = ({ children, ...props }: { children: ReactNode } & any) => {
  return (
    <SimpleButton
      className="w-full bg-blue-500 px-4 text-white  disabled:opacity-20 lg:h-10"
      {...props}
    >
      {children}
    </SimpleButton>
  )
}

function Page({ questions, players }: { questions: IDbQuestion[]; players: Players }) {
  const [collapsed, setCollapsed] = useState(true)
  const [playerIndex, setPlayerIndex] = useState(0)

  const [playerTable, setPlayerTable] = useState(() => {
    const prevDataFromStorage = readScoresFromLocalStorage() as IScores

    return prevDataFromStorage
      ? prevDataFromStorage
      : players.map(player => ({
          name: player.name,
          total: 0,
          points: questions.map(() => undefined)
        }))
  })

  const _played = useMemo(() => playerTable, [])
  const nextPlayerClick = () => setPlayerIndex(prev => prev + 1)
  const prevPlayerClick = () => setPlayerIndex(prev => prev - 1)

  const addPoints = (newPoints: number, index: number) => {
    if (playerTable && playerTable[playerIndex]) {
      const newGameObject = produce(playerTable, draft => {
        draft[playerIndex].points[index] = newPoints
        draft[playerIndex].total =
          draft[playerIndex].points.reduce((acc, p) => Number(acc) + Number(p), 0) || 0
      })

      saveScoresToLocalStorage(newGameObject)
      setPlayerTable(newGameObject)
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

      {playerTable[playerIndex].points?.length > 0 && (
        <a
          className="cursor-pointer text-blue-400 hover:text-blue-300"
          onClick={() => setCollapsed(prev => !prev)}
        >
          See prev answers
        </a>
      )}

      <aside className="grow overflow-y-scroll">
        {questions.map((question: IQuestion, index) => {
          const points = playerTable[playerIndex]?.points?.[index]

          if (collapsed && _played[playerIndex]?.points?.[index] !== undefined) {
            return null
          }

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
        <h1 className="text-xl capitalize text-pink-700">
          {players?.[playerIndex]?.name}. Total: <strong>{playerTable[playerIndex].total}</strong>
        </h1>

        <div className="flex gap-4">
          <SimpleButton
            disabled={playerIndex === 0}
            onClick={prevPlayerClick}
            className="h-12 bg-purple-400 px-4 text-white disabled:opacity-30"
          >
            Prev
          </SimpleButton>
          <SimpleButton
            disabled={playerIndex === players.length - 1}
            onClick={nextPlayerClick}
            className="h-12 bg-purple-400 px-4 text-white disabled:opacity-30"
          >
            Next
          </SimpleButton>
        </div>
      </footer>
    </section>
  )
}

export default function Edit() {
  const router = useRouter()
  const [playedQuestions, setPlayedQuestions] = useState<IDbQuestion[]>()

  useEffect(() => {
    // will get array of played questions, sort by time
    fetchDataFromDb().then(response => {
      const sortedByAppearance = response?.sort((a, b) => a.timestamp - b.timestamp) || []
      setPlayedQuestions(sortedByAppearance)
    })
  }, [])

  const players: Players = router?.query?.players
    ? JSON.parse(router?.query?.players as string)
    : []

  if (!players?.length) {
    return null
  }

  if (!playedQuestions) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center gap-8">
        <Loader2 height={80} width={80} className="animate-spin" />
        <div className="text-xl">Loading from db</div>
      </div>
    )
  }

  return <Page players={players} questions={playedQuestions} />
}
