import type { IGame } from '@/types/Types'
import { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { cn } from '@/helpers/cn'
import { getGameFromStorage, updateStorage } from '@/helpers/helpers.storage'
import { EditorCategory } from '@/features/editor/components/editor.category'
import { EditorNav } from '@/features/editor/components/editor.nav'
import { GAME_KEY } from '@/features/editor/editor.const'
import { downloadToFile, newCategory } from '@/features/editor/editor.utils'

const EditorAddAnything = ({
  append,
  setActiveTab
}: {
  append: any
  setActiveTab: (T: number) => void
}) => {
  function addCategory() {
    append(newCategory())
    setActiveTab(0)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center" onClick={addCategory}>
      <img
        alt="add category"
        src="/addAnything.jpeg"
        className="cursor-pointer p-4 transition duration-500 hover:shadow-2xl"
        width={500}
      />
    </div>
  )
}

const isVertical = false

const EditorForm = ({ game }: { game?: IGame }) => {
  const [activeTab, setActiveTab] = useState(0)
  const form = useForm<IGame>({ defaultValues: game })
  const { handleSubmit, getValues, control } = form

  const categories = useFieldArray<IGame>({
    control,
    name: GAME_KEY
  })

  const { fields, append, remove } = categories

  function onFormBlur() {
    updateStorage(getValues())
  }

  function onCategoryRemove() {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1)
    }

    remove(activeTab)
    updateStorage(getValues())
  }

  return (
    <FormProvider {...form}>
      <form onBlur={onFormBlur} onSubmit={handleSubmit(downloadToFile)}>
        <div className={cn('flex flex-col gap-8 lg:items-start', isVertical ? '' : 'lg:flex-row ')}>
          <EditorNav
            append={append}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isVertical={isVertical}
          />

          {fields?.length > 0 ? (
            //Key: on nav-change-category refresh questions block
            <section key={`${activeTab} ${fields.length}`} className="flex flex-col gap-4">
              <EditorCategory categoryIndex={activeTab} onCategoryRemove={onCategoryRemove} />
            </section>
          ) : (
            <EditorAddAnything append={append} setActiveTab={setActiveTab} />
          )}
        </div>
      </form>
    </FormProvider>
  )
}

export const Editor = () => {
  const game = getGameFromStorage()

  return (
    <main className="container h-screen p-4 md:mx-auto">
      <EditorForm game={game} />
    </main>
  )
}
