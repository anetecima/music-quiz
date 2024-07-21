import { QuestionType } from '@/types/types.game'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { QuizInput, QuizTypeSelect } from '@/components/ux/Input'
import { SectionContainer } from '@/components/ux/SectionContainer'

const Questions = ({
  option,
  categoryIndex,
  index
}: {
  index: number
  categoryIndex: number
  option: any
}) => {
  const fields = useWatch({ name: `gameObject[${categoryIndex}].options[${index}].typeOfQuestion` })
  const { control } = useFormContext()

  if (fields !== QuestionType.quiz) {
    return (
      <div className="flex w-full flex-col  flex-wrap gap-4">
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
      </div>
    )
  }

  return (
    <div className="w-full flex-1">
      <Controller
        render={({ field }) => (
          <QuizInput className="w-full" multiline label="Jautajums" {...field} />
        )}
        defaultValue={option.questions}
        name={`gameObject[${categoryIndex}].options[${index}].quiz.question`}
        control={control}
      />

      {/*<Controller
            render={({ field }) => (
                <QuizInput className="w-full" multiline label="Varianti" {...field} />
            )}
            defaultValue={option.questions}
            name={`gameObject[${categoryIndex}].options[${index}].quiz.variants`}
            control={control}
        />*/}

      {[0, 1, 2, 3].map(val => (
        <Controller
          key={val}
          render={({ field }) => (
            <QuizInput className="w-full" label={`Variant ${val + 1}`} {...field} />
          )}
          defaultValue=""
          name={`gameObject[${categoryIndex}].options[${index}].quiz.variants[${val}]`}
          control={control}
        />
      ))}
    </div>
  )
}

export const QuestionFields = ({
  option,
  categoryIndex,
  index
}: {
  index: number
  categoryIndex: number
  option: any
}) => {
  const { control } = useFormContext()

  return (
    <SectionContainer className="bg-pink-300">
      <aside className="w-full flex-1">
        <Controller
          render={({ field }) => <QuizTypeSelect label="Kas jauzmin" {...field} />}
          defaultValue={option.typeOfQuestion}
          name={`gameObject[${categoryIndex}].options[${index}].typeOfQuestion`}
          control={control}
        />
      </aside>

      <aside className="w-full flex-1">
        <Questions option={option} categoryIndex={categoryIndex} index={index} />
      </aside>
    </SectionContainer>
  )
}
