import type { IGame } from '@/types/types.game'
import type { SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { getGameFromStorage, updateStorage } from '@/helpers/helpers.storage'
import { EditorFields } from '@/features/editor/components/editor.fields'
import { EditorNav } from '@/features/editor/components/editor.nav'
import { newCategory } from '../../../Entities'

const GAME_KEY = 'gameObject'

export const Editor = () => {
  // Take from local storage or empty array
  const [state, _] = useState<IGame | undefined>(() => {
    return getGameFromStorage() as IGame
  })
  const [activeTab, setActiveTab] = useState(0)

  const onSubmit: SubmitHandler<IGame> = data => {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'my_amazing_game.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const methods = useForm({
    defaultValues: state
  })

  const { handleSubmit, getValues, control } = methods

  const {
    fields: categories,
    append,
    remove
  } = useFieldArray({
    control,
    name: GAME_KEY
  })

  return (
    <main className="px-4 py-2 lg:container md:mx-auto">
      <FormProvider {...methods}>
        <form onBlur={() => updateStorage(getValues())} onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 lg:flex lg:items-start lg:gap-8">
            <aside>
              <EditorNav
                fields={getValues()[GAME_KEY]}
                append={append}
                activeTab={activeTab}
                setActiveTab={props => {
                  setActiveTab(props)
                }}
              />
            </aside>

            {categories?.length > 0 ? (
              <section
                key={`${activeTab} ${categories.length}`}
                className="max-w-4xl rounded-2xl border-2 border-purple-500 p-4"
              >
                <EditorFields
                  categoryIndex={activeTab}
                  setActiveCategory={setActiveTab}
                  removeCategory={() => {
                    remove(activeTab)
                  }}
                />
              </section>
            ) : (
              <div
                className="mx-auto max-w-4xl rounded-2xl border-2 border-dashed border-purple-500 p-4"
                onClick={() => {
                  append(newCategory())
                  setActiveTab(categories.length)
                }}
              >
                <img
                  alt="add category"
                  src="/addAnything.jpeg"
                  className="cursor-pointer p-4 transition duration-500 hover:shadow-2xl"
                  width={500}
                />
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </main>
  )
}
