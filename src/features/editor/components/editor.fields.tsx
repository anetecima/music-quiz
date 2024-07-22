import type { IGame } from '@/types/Types'
import IcoDelete from '@/assets/icons/delete.svg'
import React from 'react'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import { updateStorage } from '@/helpers/helpers.storage'
import { QuestionFields } from '@/features/editor/components/editor.fieldsQuestion'
import { YouTubeRelatedStuff } from '@/features/editor/components/editor.fieldsYoutube'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'
import { PointsWrap } from '@/components/ux/Points'
import { SectionContainer } from '@/components/ux/SectionContainer'
import { Question } from '../../../const'

const CategoryButtons = ({
  removeCategory,
  categoryIndex,
  replace
}: {
  replace: (T: any) => void
  categoryIndex: number
  removeCategory: () => void
}) => {
  const name = `gameObject[${categoryIndex}].options`
  const fields = useWatch({ name })

  return (
    <>
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
    </>
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
  const { control, getValues } = useFormContext()

  const { fields, append, remove, replace } = useFieldArray<IGame, `gameObject.${number}.options`>({
    name: `gameObject.${categoryIndex}.options` // unique name for your Field Array
  })

  return (
    <>
      <div className="flex flex-col gap-2 ">
        <Controller
          control={control}
          name={`gameObject.${categoryIndex}.categoryName`}
          render={({ field }) => (
            <QuizInput className="grow" label="kategorijas nosaukums" {...field} />
          )}
        />
        <div className="mb-2 flex grow gap-2">
          <CategoryButtons
            replace={replace}
            categoryIndex={categoryIndex}
            removeCategory={() => {
              if (confirm('R u Sure u Want to Erase?') === true) {
                setActiveCategory(categoryIndex - 1)
                removeCategory()
              }
            }}
          />
        </div>
      </div>

      {fields.map((option, index) => (
        <div key={option.id} className="relative mb-3  rounded-xl bg-[aqua] p-4 shadow-xl">
          <div
            className="absolute right-4 flex h-10 w-10 cursor-pointer items-center justify-center
            rounded border-2 border-white bg-pink-400 shadow transition hover:opacity-90"
            onClick={() => {
              remove(index)
              setInterval(() => updateStorage(getValues()), 100)
              // in case last question , remove category and switch to previous
              if (fields.length === 1) {
                setActiveCategory(categoryIndex - 1)
                removeCategory()
              }
            }}
          >
            <IcoDelete width={24} />
          </div>

          <div>
            <br />
            <br />
            <QuestionFields categoryIndex={categoryIndex} index={index} option={option} />

            <YouTubeRelatedStuff categoryIndex={categoryIndex} index={index} option={option} />

            <SectionContainer className="w-full bg-emerald-300">
              <Controller
                render={({ field }) => (
                  <PointsWrap
                    className="w-full flex-1 grow"
                    {...field}
                    label="punkti par jautājumu"
                  />
                )}
                defaultValue={option.points}
                name={`gameObject[${categoryIndex}].options[${index}].points`}
                control={control}
              />
            </SectionContainer>

            <SectionContainer className="bg-sky-400">
              <Controller
                render={({ field }) => (
                  <QuizInput className="min-w-[100px] flex-1" label="Bonus jautājums" {...field} />
                )}
                name={`gameObject[${categoryIndex}].options[${index}].bonusQuestion`}
                control={control}
              />

              <Controller
                render={({ field }) => <PointsWrap {...field} label="papildus punkti" />}
                defaultValue={option.extraPoints}
                name={`gameObject[${categoryIndex}].options[${index}].extraPoints`}
                control={control}
              />
            </SectionContainer>
          </div>
        </div>
      ))}

      <SimpleButton
        className="h-14 w-full rounded-2xl border-2 border-dashed border-white bg-purple-500 text-lg font-bold text-white shadow"
        onClick={() => {
          append({ ...Question })
        }}
      >
        <div className="inline">+ Pievienot jautājumu</div>
      </SimpleButton>
    </>
  )
}
