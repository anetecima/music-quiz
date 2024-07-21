import IcoYouTube from '@/assets/icons/tv.svg'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import YouTube from 'react-youtube'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'
import { PointsWrap } from '@/components/ux/Points'
import { SectionContainer } from '@/components/ux/SectionContainer'

export const YouTubeWrap = ({
  name,
  setValue
}: {
  setValue: (name: string, value: string) => void
  name: string
}) => {
  const trackCode = useWatch({ name: name + '.track' })
  const start = useWatch({ name: name + '.start' })
  const length = useWatch({ name: name + '.length' })
  const [title, setTitle] = React.useState()

  if (!trackCode || trackCode.includes('http')) {
    return (
      <div
        className="flex min-h-40 min-w-[300px] items-center justify-center rounded
      border-2 border-dashed border-gray-700 lg:min-w-80 lg:px-8"
      >
        <IcoYouTube width={40} height={40} />
      </div>
    )
  }

  return (
    <>
      <div>
        <YouTube
          className="h-full w-full"
          videoId={trackCode}
          onReady={p => {
            try {
              if (p?.target?.getVideoData) {
                setTitle(p.target.getVideoData().title)
                setValue(name + '.songTitle', p.target.getVideoData().title)
                setValue(name + '.answer', p.target.getVideoData().title)
              }
            } catch {
              //
            }
          }}
          opts={{
            playerVars: {
              start: start || 0,
              end: Number(start || 0) + Number(length || 0),
              autoplay: 0
            }
          }}
        />
      </div>

      {title && <div className="py-2">{title}</div>}
    </>
  )
}

export const YouTubeRelatedStuff = ({
  option,
  categoryIndex,
  index
}: {
  index: number
  categoryIndex: number
  option: any
}) => {
  const { control, setValue } = useFormContext()

  return (
    <SectionContainer className="bg-yellow-300">
      <aside className="flex flex-col gap-4">
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
          render={({ field }) => <PointsWrap {...field} label="ilgums" />}
          defaultValue={15}
          name={`gameObject[${categoryIndex}].options[${index}].length`}
          control={control}
        />
      </aside>
      <aside>
        <YouTubeWrap setValue={setValue} name={`gameObject[${categoryIndex}].options[${index}]`} />
      </aside>
    </SectionContainer>
  )
}
