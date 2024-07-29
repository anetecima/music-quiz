import { IQuestion } from '@/types/Types'
import Image from 'next/image'
import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import YouTube from 'react-youtube'
import {
  EditorInputControl,
  EditorPointsControl
} from '@/features/editor/components/editor.controls'
import { useSelectCategoryIndex, useSelectQuestionIndex } from '@/features/editor/editor.provider'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'
import { SectionContainer } from '@/components/ux/SectionContainer'

const YouTubeWrap = () => {
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()
  const { setValue } = useFormContext()
  const [title, setTitle] = useState()
  const [open, setOpen] = useState(false)
  const name = `gameObject[${cIndex}].options[${qIndex}]`
  const trackCode = useWatch({ name: name + '.track' })
  const start = useWatch({ name: name + '.start' })
  const length = useWatch({ name: name + '.length' })

  if (!trackCode || trackCode.includes('http')) {
    return (
      <div className="flex h-full flex-col justify-start">
        You need to Copy/paste track code
        <Image
          priority
          onClick={() => setOpen(true)}
          className="cursor-zoom-in"
          src="/tutorial.png"
          alt="tutorial"
          width={340}
          height={239}
        />
        <Dialog open={open} onClose={() => setOpen(false)} className="">
          <div className="flex max-w-[800px] items-center justify-center bg-white">
            <Image
              className="cursor-zoom-in"
              src="/tutorial.png"
              alt="tutorial"
              width={700}
              height={600}
            />
          </div>
        </Dialog>
      </div>
    )
    // return (
    //   <div className="flex min-h-40 min-w-[300px] items-center justify-center rounded border-2 border-dashed border-gray-700 lg:min-w-80 lg:px-8">
    //     <IcoYouTube width={40} height={40} />
    //   </div>
    // )
  }

  return (
    <>
      <YouTube
        className="h-full w-full"
        videoId={trackCode}
        onReady={p => {
          try {
            if (p?.target?.getVideoData) {
              setTitle(p.target.getVideoData().title)
              // setValue(name + '.songTitle', p.target.getVideoData().title)
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
      {title && <div className="max-w-[300px] shrink py-2">{title}</div>}
    </>
  )
}

export const YouTubeRelatedStuff = ({ question }: { question: IQuestion }) => {
  const { control } = useFormContext()
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <SectionContainer>
      <aside className="flex flex-1 flex-col gap-4">
        <Controller
          render={({ field }) => (
            <div className="flex items-center gap-1">
              <QuizInput className="w-full grow" label="youtube track kods" {...field} />
              <SimpleButton
                className="bg-cta p-3 text-xs font-semibold text-white shadow"
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
          defaultValue={question.track}
          name={`gameObject[${cIndex}].options[${qIndex}].track`}
          control={control}
        />

        <EditorInputControl
          name="start"
          value={question.start}
          label="sākums (sekundes no video sākuma)"
        />

        <EditorPointsControl name="length" value={15} label="ilgums" />
      </aside>

      <aside className="flex-1">
        <YouTubeWrap />
      </aside>
    </SectionContainer>
  )
}
