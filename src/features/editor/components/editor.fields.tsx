import type { IInputProps } from '@/components/ux/Input'
import type { IGame, IQuestion } from '@/types/types.game'
import IcoDelete from '@/assets/icons/delete.svg'
import IcoYouTube from '@/assets/icons/tv.svg'
import React from 'react'
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form'
import YouTube from 'react-youtube'
import { updateStorage } from '@/helpers/helpers.storage'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput, QuizSelect } from '@/components/ux/Input'
import { Question } from '../../../Entities'

const PointsWrap = React.forwardRef<
  HTMLInputElement,
  { label: string; onChange: (T: number) => void } & IInputProps
>(({ label, ...field }, ref) => (
  <div className="flex flex-wrap items-center gap-2">
    <QuizInput {...field} type="number" label={label} ref={ref} />
    <div className="flex gap-1">
      {[10, 20, 30, 40, 50, 70].map(num => (
        <SimpleButton
          key={num}
          className="h-10 w-10 rounded bg-purple-400 text-xs font-semibold text-white shadow"
          onClick={() => {
            if (field.onChange) {
              field.onChange(num)
            }
          }}
        >
          {num}
        </SimpleButton>
      ))}
    </div>
  </div>
))

const YouTubeWrap = ({ option, name }: { name: string; option: IQuestion }) => {
  const trackCode = useWatch({ name })

  if (!trackCode || trackCode.includes('http')) {
    return (
      <div className="flex min-w-[220px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-400 shadow">
        <IcoYouTube width={60} />
      </div>
    )
  }

  return (
    <div className="flex h-[170px] w-fit items-center justify-center rounded-2xl border-2 border-dashed border-purple-600 p-4">
      <YouTube
        className="h-full w-full"
        videoId={trackCode}
        opts={{
          playerVars: {
            start: option.start || 0,
            autoplay: 0
          }
        }}
      />
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
  const { control, getValues } = useFormContext()

  const { fields, append, remove } = useFieldArray<IGame, `gameObject.${number}.options`>({
    name: `gameObject.${categoryIndex}.options` // unique name for your Field Array
  })

  return (
    <>
      <div className="mb-3 flex w-full">
        <Controller
          control={control}
          name={`gameObject.${categoryIndex}.categoryName`}
          render={({ field }) => (
            <QuizInput className="grow" label="kategorijas noasukums" {...field} />
          )}
        />
        <SimpleButton
          className="rounded-none border border-red-400 px-4 font-normal uppercase text-red-500"
          variant="outlined"
          onClick={() => {
            setActiveCategory(categoryIndex - 1)
            removeCategory()
          }}
        >
          dzēst kategoriju
        </SimpleButton>
      </div>

      {fields.map((option, index) => (
        <div key={option.id} className="relative mb-3 rounded-xl bg-[aqua] p-4 pr-12 shadow-xl">
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

          <div className="md:gap-3 lg:flex lg:items-center lg:p-2">
            <aside className="flex shrink-0 flex-col gap-4">
              <Controller
                render={({ field }) => <PointsWrap {...field} label="punkti par jautājumu" />}
                defaultValue={option.points}
                name={`gameObject[${categoryIndex}].options[${index}].points`}
                control={control}
              />

              <Controller
                render={({ field }) => <QuizSelect label="jautājums" {...field} />}
                defaultValue={option.question}
                name={`gameObject[${categoryIndex}].options[${index}].question`}
                control={control}
              />

              <Controller
                render={({ field }) => <QuizInput label="izpildītājs" {...field} />}
                defaultValue={option.answer}
                name={`gameObject[${categoryIndex}].options[${index}].answer`}
                control={control}
              />

              <Controller
                render={({ field }) => <QuizInput label="dziesmas nosaukums" {...field} />}
                defaultValue={option.songTitle}
                name={`gameObject[${categoryIndex}].options[${index}].songTitle`}
                control={control}
              />

              <Controller
                render={({ field }) => (
                  <div className="flex items-center gap-1">
                    <QuizInput className="w-full grow" label="youtube track kods" {...field} />
                    <SimpleButton
                      className="bg-purple-400 p-3 text-xs font-semibold text-white shadow"
                      onClick={() => {
                        try {
                          const url = new URL(field.value)
                          const slug = url.pathname.replace('/', '')
                          field.onChange(slug)
                        } catch {
                          //
                        }
                      }}
                    >
                      Format
                    </SimpleButton>
                  </div>
                )}
                defaultValue={option.track}
                name={`gameObject[${categoryIndex}].options[${index}].track`}
                control={control}
              />

              <Controller
                render={({ field }) => (
                  <QuizInput label="sākums (sekundes no video sākuma)" type="number" {...field} />
                )}
                defaultValue={option.start}
                name={`gameObject[${categoryIndex}].options[${index}].start`}
                control={control}
              />

              <Controller
                // render={({ field }) => <QuizInput label="ilgums" type="number" {...field} />}
                render={({ field }) => <PointsWrap {...field} label="ilgums" />}
                defaultValue={15}
                name={`gameObject[${categoryIndex}].options[${index}].length`}
                control={control}
              />

              <Controller
                render={({ field }) => <QuizInput label="Bonus jautājums" {...field} />}
                name={`gameObject[${categoryIndex}].options[${index}].bonusQuestion`}
                control={control}
              />

              <Controller
                render={({ field }) => <PointsWrap {...field} label="papildus punkti" />}
                defaultValue={option.extraPoints}
                name={`gameObject[${categoryIndex}].options[${index}].extraPoints`}
                control={control}
              />
            </aside>

            <aside className="mt-4 flex justify-center md:mt-0 md:p-2">
              <YouTubeWrap
                option={option}
                name={`gameObject[${categoryIndex}].options[${index}].track`}
              />
            </aside>
          </div>
        </div>
      ))}
      <SimpleButton
        className="h-14 w-full rounded-2xl border-2 border-dashed border-white bg-purple-500 text-base text-white shadow"
        variant="outlined"
        type="button"
        onClick={() => {
          append({
            ...Question
          })
        }}
      >
        <div className="inline">+ Pievienot jautājumu</div>
      </SimpleButton>
    </>
  )
}
