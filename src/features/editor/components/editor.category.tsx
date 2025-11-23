import type { IGame } from '@/types/Types'
import { Trash2 } from 'lucide-react'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { updateStorage } from '@/helpers/helpers.storage'
import { EditorCategoryInputs } from '@/features/editor/components/editor.categoryInputs'
import { EditorCategoryYoutube } from '@/features/editor/components/editor.categoryYoutube'
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

  function onSort() {
    const sorted = [...fields].sort((a, b) => a.points - b.points)
    replace(sorted)
  }

  return (
    <div className="flex flex-col gap-2 rounded-md border border-gray-200 p-5 shadow">
      <Controller
        control={control}
        name={`gameObject.${categoryIndex}.categoryName`}
        render={({ field }) => <QuizInput label="Ievadiet kategorijas nosaukumu" {...field} />}
      />
      <div className="mb-2 flex grow gap-2">
        <SimpleButton
          className="grow border border-red-400 p-1 uppercase text-red-500"
          variant="outlined"
          onClick={removeCategory}
        >
          Dzēst kategoriju
        </SimpleButton>
        <SimpleButton
          className="grow border border-blue-400 p-1 uppercase text-blue-500"
          variant="outlined"
          onClick={onSort}
        >
          Sortet pec punktiem
        </SimpleButton>
      </div>
    </div>
  )
}

export const EditorCategory = ({
  categoryIndex,
  onCategoryRemove
}: {
  categoryIndex: number
  onCategoryRemove: () => void
}) => {
  const { getValues } = useFormContext()

  // Array of questions(options)
  const { fields, append, remove, replace } = useFieldArray<IGame, `gameObject.${number}.options`>({
    name: `gameObject.${categoryIndex}.options` // unique name for your Field Array
  })

  function onRemoveQuestion(index: number) {
    remove(index)
    setInterval(() => updateStorage(getValues()), 100)

    // in case last question, remove category and switch to previous
    if (fields.length === 1) {
      onCategoryRemove()
    }
  }

  function onAddQuestionBtnClick() {
    append({ ...Question })

    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight)
    }, 100)
  }

  function onRemoveCategory() {
    if (confirm('R u Sure u Want to Erase?')) {
      onCategoryRemove()
    }
  }

  return (
    <>
      <CategoryNav
        replace={replace}
        categoryIndex={categoryIndex}
        removeCategory={onRemoveCategory}
      />

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="rounded-xl border border-border-1 p-4 shadow-xl sm:min-w-[740px]"
        >
          <div className="mb-2 flex justify-between">
            <span className="rounded-md bg-pink-200 p-2 text-xs">
              {categoryIndex} - {index}
            </span>

            <SimpleButton
              className="px-2 text-xs text-red-800"
              onClick={() => onRemoveQuestion(index)}
            >
              <Trash2 width={20} />
            </SimpleButton>
          </div>

          <EditorCategoryProvider cIndex={categoryIndex} qIndex={index}>
            <div className="flex flex-col gap-4">
              <EditorCategoryYoutube question={field} />
              <EditorCategoryInputs categoryIndex={categoryIndex} index={index} question={field} />
            </div>
          </EditorCategoryProvider>
        </div>
      ))}

      <SimpleButton
        className="mb-2 h-14  bg-cta  font-bold text-white"
        onClick={onAddQuestionBtnClick}
      >
        + Pievienot jautājumu
      </SimpleButton>
    </>
  )
}
