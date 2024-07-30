import type { IQuestion } from '@/types/Types'
import Image from 'next/image'
import Dialog from '@mui/material/Dialog'
import { HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import YouTube from 'react-youtube'
import { EditorInputControl } from '@/features/editor/components/editor.controls'
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
  const answer = useWatch({ name: name + '.answer' })

  if (!trackCode || trackCode.includes('http')) {
    return (
      <div className="flex h-full flex-col justify-start">
        <div className="text-center font-semibold">You need to Copy/paste track code</div>
        <div className="relative mx-auto w-full rounded-lg text-center transition-all hover:opacity-80">
          <div className="curspor z-2 pointer-events-none absolute left-0 top-0 flex h-full w-full items-center justify-center text-4xl">
            <HelpCircle width={84} height={84} className="text-red-500" />
          </div>
          <Image
            priority
            onClick={() => setOpen(true)}
            className="mx-auto cursor-zoom-in rounded-lg"
            src="/tutorial.png"
            alt="tutorial"
            width={340}
            height={239}
          />
        </div>
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
  }

  return (
    <>
      <YouTube
        className="h-full w-full"
        videoId={trackCode}
        onReady={p => {
          try {
            if (p?.target?.getVideoData && !answer) {
              setTitle(p.target.getVideoData().title)
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

        <EditorInputControl required name="length" value={15} label="ilgums" type="number" />

        {/*<EditorPointsControl checkEmpty name="length" value={15} label="ilgums" />*/}
      </aside>

      <aside className="flex-1">
        <YouTubeWrap />
      </aside>
    </SectionContainer>
  )
}
