import type { IGame } from '@/types/Types'
import { Trash2 } from 'lucide-react'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { updateStorage } from '@/helpers/helpers.storage'
import { QuestionFields } from '@/features/editor/components/editor.fieldsQuestion'
import { YouTubeRelatedStuff } from '@/features/editor/components/editor.fieldsYoutube'
import { EditorCategoryProvider } from '@/features/editor/editor.provider'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'
import { Question } from '../../../const'

const CategoryNav = ({
  removeCategory,
  categoryIndex,
  replace
}: {
  replace: (T: any) => void
  categoryIndex: number
  removeCategory: () => void
}) => {
  const { control } = useFormContext()
  const fields = useWatch({ control, name: `gameObject[${categoryIndex}].options` })

  return (
    <div className="flex flex-col gap-2">
      <Controller
        control={control}
        name={`gameObject.${categoryIndex}.categoryName`}
        render={({ field }) => <QuizInput label="Ievadiet kategorijas nosaukumu" {...field} />}
      />
      <div className="mb-2 flex grow gap-2">
        <SimpleButton
          className="h-12 w-full rounded-none border border-red-400 px-4 text-xs uppercase text-red-500"
          variant="outlined"
          onClick={removeCategory}
        >
          dzēst kategoriju
        </SimpleButton>
        <SimpleButton
          className="w-full rounded-none border border-blue-400 px-4 text-xs uppercase text-blue-500"
          variant="outlined"
          onClick={() => {
            const sorted = [...fields].sort((a, b) => a.points - b.points)
            replace(sorted)
          }}
        >
          sortet pec punktiem
        </SimpleButton>
      </div>
    </div>
  )
}

export const EditorFields = ({
  categoryIndex,
  removeCategory,
  setActiveCategory
}: {
  removeCategory: () => void
  setActiveCategory: (T: number) => void
  categoryIndex: number
}) => {
  const { getValues } = useFormContext()

  const { fields, append, remove, replace } = useFieldArray<IGame, `gameObject.${number}.options`>({
    name: `gameObject.${categoryIndex}.options` // unique name for your Field Array
  })

  return (
    <>
      <CategoryNav
        replace={replace}
        categoryIndex={categoryIndex}
        removeCategory={() => {
          if (confirm('R u Sure u Want to Erase?')) {
            if (categoryIndex > 0) {
              setActiveCategory(categoryIndex - 1)
            }
            removeCategory()
          }
        }}
      />

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="relative my-4 rounded-xl border border-border-1 p-4 shadow-xl"
        >
          <div className="mb-2 flex justify-between">
            <span className="rounded-lg border-2 p-1 text-xs shadow">
              {categoryIndex} - {index}
            </span>
            <SimpleButton
              className="flex items-center justify-center px-2 text-xs text-red-800"
              onClick={() => {
                remove(index)

                setInterval(() => {
                  updateStorage(getValues())
                }, 100)

                // in case last question, remove category and switch to previous
                if (fields.length === 1) {
                  if (categoryIndex > 0) {
                    setActiveCategory(categoryIndex - 1)
                  }

                  removeCategory()
                }
              }}
            >
              <Trash2 width={20} />
            </SimpleButton>
          </div>
          <EditorCategoryProvider cIndex={categoryIndex} qIndex={index}>
            <div className="flex flex-col gap-4">
              <YouTubeRelatedStuff question={field} />
              <QuestionFields categoryIndex={categoryIndex} index={index} question={field} />
            </div>
          </EditorCategoryProvider>
        </div>
      ))}

      <SimpleButton
        className="h-14 w-full rounded-xl border-dashed bg-cta font-bold text-white shadow"
        onClick={() => {
          append({ ...Question })
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
          }, 100)
        }}
      >
        <div className="inline">+ Pievienot jautājumu</div>
      </SimpleButton>
    </>
  )
}
