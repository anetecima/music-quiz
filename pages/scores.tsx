import type { IDbQuestion } from '@/types/Types'
import { useRouter } from 'next/router'
import { produce } from 'immer'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { cn } from '@/helpers/cn'
import { fetchDataFromDb } from '@/helpers/db/db.read'
import { readScoresFromLocalStorage, saveScoresToLocalStorage } from '@/helpers/helpers.storage'
import { SimpleButton } from '@/components/ux/Button'

type Players = { name: string; points: number }[]
type IScores = { name: string; total: number; points: (number | null)[] }[]

const Button = ({
  points,
  answeredPoints,
  onClick
}: {
  onClick: (points: number) => void
  points: number
  answeredPoints?: number | null
}) => (
  <SimpleButton
    className={cn(
      'w-full px-4 py-2 text-white shadow disabled:opacity-20 lg:h-10',
      points <= 0 ? 'bg-red-500' : 'bg-blue-500'
    )}
    disabled={points === answeredPoints}
    onClick={() => onClick(points)}
  >
    {points}
  </SimpleButton>
)

const Buttons = ({
  addPoints,
  answeredPoints,
  questionPoints,
  extraPoints
}: {
  answeredPoints: number | null
  extraPoints: number | null
  questionPoints: number
  addPoints: (T: number) => void
}) => (
  <>
    <Button answeredPoints={answeredPoints} points={questionPoints} onClick={addPoints} />
    <Button
      answeredPoints={answeredPoints}
      points={questionPoints + questionPoints * 0.5}
      onClick={addPoints}
    />
    {/*if has extra points, and extra ponts not same as double points*/}
    {!!extraPoints && questionPoints + extraPoints !== questionPoints + questionPoints * 0.5 && (
      <Button
        answeredPoints={answeredPoints}
        points={questionPoints + extraPoints}
        onClick={addPoints}
      />
    )}
    <Button answeredPoints={answeredPoints} points={0} onClick={addPoints} />
    <Button
      answeredPoints={answeredPoints}
      points={questionPoints * 0.5 * -1}
      onClick={addPoints}
    />
  </>
)

function Page({ questions, players }: { questions: IDbQuestion[]; players: Players }) {
  // const [collapsed, setCollapsed] = useState(false)
  // console.log('questions', questions)
  const perRound = {} as Record<string, IDbQuestion[]>
  questions.map((question: IDbQuestion) => {
    perRound[question.roundNum] = [...(perRound[question.roundNum] || []), question]
  })

  // For traverse through players
  const [playerIndex, setPlayerIndex] = useState(0)
  const [playerTable, setPlayerTable] = useState(() => {
    const prevDataFromStorage = readScoresFromLocalStorage() as IScores

    return prevDataFromStorage
      ? prevDataFromStorage
      : players.map(player => ({
          name: player.name,
          total: 0,
          points: []
          // points: questions.map(() => undefined)
        }))
  })

  // const _played = useMemo(() => playerTable, [])
  const nextPlayerClick = () => setPlayerIndex(prev => prev + 1)
  const prevPlayerClick = () => setPlayerIndex(prev => prev - 1)

  const addPoints = (newPoints: number, questionIndex: number) => {
    if (playerTable && playerTable[playerIndex]) {
      const newGameObject = produce(playerTable, draft => {
        draft[playerIndex].points[questionIndex] = newPoints
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
            <li
              key={pIndex}
              className={cn(
                'cursor-pointer capitalize text-pink-500 underline',
                pIndex === playerIndex ? 'font-bold' : ''
              )}
            >
              <span onClick={() => setPlayerIndex(pIndex)}>
                {player?.name} <strong>{player?.total}</strong>
              </span>
            </li>
          ))}
        </ul>
      </header>

      <aside className="grow overflow-y-scroll">
        {Object.values(perRound).map((questions, roundIndex) => {
          return (
            <div
              className="rounded px-2 py-2"
              style={{ backgroundColor: `hsl(${roundIndex * 100} 40% 85%)` }}
            >
              <span>{roundIndex}</span>

              {questions.map((question, index) => {
                const points = playerTable[playerIndex]?.points?.[index]

                return (
                  <div
                    key={index}
                    className="border-blue my-2 items-center justify-between rounded-md border-2 px-4 py-4"
                  >
                    <div>
                      {index + 1} {question.answer} <strong>{question.points}</strong>
                    </div>
                    <div className="mt-2">
                      <div className="mb-2 flex w-full justify-between gap-4">
                        <Buttons
                          answeredPoints={points}
                          questionPoints={question.points}
                          extraPoints={question.extraPoints}
                          addPoints={points => addPoints(points, index)}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
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
  const router = useRouter()
  const [playedQuestions, setPlayedQuestions] = useState<IDbQuestion[] | null>(null)

  const retrieveData = useCallback(() => {
    void fetchDataFromDb(response => {
      if (response) {
        const rows = Object.values(response)
        const sortedByAppearance = rows?.sort((a, b) => a.timestamp - b.timestamp) || []
        setPlayedQuestions(sortedByAppearance)
      } else {
        setPlayedQuestions(null)
      }
    })
  }, [])

  useEffect(() => {
    retrieveData()
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
