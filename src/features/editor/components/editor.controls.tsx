import type { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useSelectCategoryIndex, useSelectQuestionIndex } from '@/features/editor/editor.provider'
import { QuizInput, QuizTypeSelect } from '@/components/ux/Input'
import { PointsWrap } from '@/components/ux/Points'

export const EditorInputControl = ({
  value,
  label,
  name,
  ...props
}: { label: string } & ComponentProps<'input'>) => {
  const { control } = useFormContext()
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <Controller
      render={({ field }) => (
        <QuizInput
          error={props.required && !field.value}
          label={label}
          inputProps={props}
          {...field}
        />
      )}
      defaultValue={value}
      name={`gameObject[${cIndex}].options[${qIndex}].${name}`}
      control={control}
    />
  )
}

export const EditorSelectControl = ({
  value,
  label,
  name
}: {
  label: string
  value?: string
  name: string
}) => {
  const { control } = useFormContext()
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <Controller
      render={({ field }) => <QuizTypeSelect label={label} {...field} />}
      defaultValue={value}
      name={`gameObject[${cIndex}].options[${qIndex}].${name}`}
      control={control}
    />
  )
}

export const EditorPointsControl = ({
  value,
  label,
  name,
  checkEmpty = false,
  isDisabled = false
}: {
  isDisabled?: boolean
  checkEmpty?: boolean
  label: string
  value?: string | number
  name: string
}) => {
  const { control } = useFormContext()
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <Controller
      render={({ field }) => {
        return (
          <PointsWrap isDisabled={isDisabled} checkEmpty={checkEmpty} {...field} label={label} />
        )
      }}
      defaultValue={value}
      name={`gameObject[${cIndex}].options[${qIndex}].${name}`}
      control={control}
    />
  )
}
