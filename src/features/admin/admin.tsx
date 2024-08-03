import IcoDelete from '@/assets/icons/close.svg'
import { useRouter } from 'next/router'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'

type Players = { name: string; points: number }[]

export const AdminPage = () => {
  const router = useRouter()
  const methods = useForm<Players[number]>()
  const { handleSubmit, control, reset } = methods

  const players: Players = router?.query?.players
    ? JSON.parse(router?.query?.players as string)
    : []

  const onSubmit: SubmitHandler<Players[number]> = data => {
    if (data.name) {
      const updateData = [
        ...players,
        {
          name: data.name,
          points: 0
        }
      ]

      reset()
      router.replace('?players=' + JSON.stringify(updateData))
    }
  }

  return (
    <>
      <main className="items-start gap-8 px-4 py-2 pt-[10%] md:mx-auto lg:flex lg:w-1/2">
        <aside className="boarder boarder-purple-600 flex flex-col gap-4 rounded p-4">
          {players?.map((field, index) => {
            return (
              <div
                className="flex items-center gap-4 text-sm font-bold capitalize text-pink-500"
                key={index}
              >
                {field?.name}
                <IcoDelete
                  className="text-red-600"
                  onClick={() => {
                    const newPlayers = players.filter((_, pIndex) => {
                      return index !== pIndex
                    })

                    router.replace('?players=' + JSON.stringify(newPlayers))
                  }}
                />
              </div>
            )
          })}
        </aside>

        <section className="grow">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto flex flex-col justify-center gap-2">
              <Controller
                render={({ field }) => <QuizInput label="Enter new player" {...field} />}
                name={`name`}
                control={control}
                defaultValue=""
              />

              <div className="flex h-10 gap-4">
                <SimpleButton type="submit" className="w-1/2 bg-amber-600 text-white">
                  Enter Next Player
                </SimpleButton>
                <SimpleButton
                  disabled={!players?.length}
                  className="w-1/2 bg-green-600 text-white disabled:opacity-30"
                  onClick={() => {
                    router.push('/scores?players=' + router?.query?.players)
                  }}
                >
                  Finish
                </SimpleButton>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  )
}
