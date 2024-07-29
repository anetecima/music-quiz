import type { IGame } from '@/types/Types'
import { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { getGameFromStorage, updateStorage } from '@/helpers/helpers.storage'
import { EditorFields } from '@/features/editor/components/editor.fields'
import { EditorNav } from '@/features/editor/components/editor.nav'
import { GAME_KEY } from '@/features/editor/editor.const'
import { newCategory } from '@/features/editor/editor.utils'

const downloadToFile = (data: IGame) => {
  let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
  let downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', 'my_amazing_game.json')
  document.body.appendChild(downloadAnchorNode) // required for firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

const EditorAddAnything = ({
  append,
  setActiveTab
}: {
  append: any
  setActiveTab: (T: number) => void
}) => {
  return (
    <div
      className="flex h-screen w-screen items-center justify-center"
      onClick={() => {
        append(newCategory())
        setActiveTab(0)
      }}
    >
      <img
        alt="add category"
        src="/addAnything.jpeg"
        className="cursor-pointer p-4 transition duration-500 hover:shadow-2xl"
        width={500}
      />
    </div>
  )
}

const EditorForm = ({ game }: { game: undefined | IGame }) => {
  const [activeTab, setActiveTab] = useState(0)
  const form = useForm<IGame>({ defaultValues: game })
  const { handleSubmit, getValues, control } = form

  const categories = useFieldArray<IGame>({
    control,
    name: GAME_KEY
  })

  const { fields, append, remove } = categories

  return (
    <FormProvider {...form}>
      <div className="h-full py-4 lg:flex lg:items-start lg:gap-8">
        <EditorNav append={append} activeTab={activeTab} setActiveTab={setActiveTab} />
        {fields?.length > 0 ? (
          <form onBlur={() => updateStorage(getValues())} onSubmit={handleSubmit(downloadToFile)}>
            <section
              className="max-w-4xl rounded-2xl p-4"
              // on nav-change-category refresh questions block
              key={`${activeTab} ${fields.length}`}
            >
              <EditorFields
                categoryIndex={activeTab}
                setActiveCategory={setActiveTab}
                removeCategory={() => remove(activeTab)}
              />
            </section>
          </form>
        ) : (
          <EditorAddAnything append={append} setActiveTab={setActiveTab} />
        )}
      </div>
    </FormProvider>
  )
}

export const Editor = () => {
  const [game, setGame] = useState<IGame | undefined>()

  useEffect(() => {
    const game = getGameFromStorage() as IGame
    setGame(game || null)
  }, [])

  if (game === undefined) {
    return null
  }

  return (
    <main className="h-screen px-4 py-2 md:mx-auto">
      <EditorForm game={game} />
    </main>
  )
}
