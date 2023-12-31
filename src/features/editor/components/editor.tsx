import type { IGame } from '@/types/types.game'
import React, { useState } from 'react'
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { getGameFromStorage, updateStorage } from '@/helpers/helpers.storage'
import { EditorFields } from '@/features/editor/components/editor.fields'
import { EditorNav } from '@/features/editor/components/editor.nav'
import { newCategory } from '../../../Entities'

export const Editor = () => {
  const [state, _] = useState<IGame>(() => {
    return getGameFromStorage() as IGame
  })

  const onSubmit: SubmitHandler<IGame> = data => {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data))
    let downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute('href', dataStr)
    downloadAnchorNode.setAttribute('download', 'my_amazing_game.json')
    document.body.appendChild(downloadAnchorNode) // required for firefox
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const methods = useForm<IGame>({
    defaultValues: state
  })

  const { handleSubmit, getValues, control } = methods
  const [activeTab, setActiveTab] = useState(0)
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'gameObject'
  })

  return (
    <main className="px-4 py-2 lg:container md:mx-auto">
      <FormProvider {...methods}>
        <form onBlur={() => updateStorage(getValues())} onSubmit={handleSubmit(onSubmit)}>
          <div className="py-4 lg:flex lg:items-start lg:gap-8">
            <aside className="">
              <EditorNav
                fields={getValues().gameObject}
                append={append}
                activeTab={activeTab}
                setActiveTab={props => {
                  setActiveTab(props)
                }}
              />
            </aside>

            {fields?.length > 0 ? (
              <section
                key={`${activeTab} ${fields.length}`}
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
                  setActiveTab(fields.length)
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
