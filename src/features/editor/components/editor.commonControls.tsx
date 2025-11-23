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
      defaultValue={value}
      name={`gameObject[${cIndex}].options[${qIndex}].${name}`}
      control={control}
      render={({ field }) => (
        <QuizInput
          fullWidth={true}
          error={props.required && !field.value}
          label={label}
          inputProps={props}
          {...field}
        />
      )}
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
  name,
  checkEmpty = false,
  ...props
}: {
  name: string
  value?: string | number
  checkEmpty?: boolean
  className?: string
  label: string
}) => {
  const { control } = useFormContext()
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <Controller
      render={({ field }) => <PointsWrap checkEmpty={checkEmpty} {...field} {...props} />}
      defaultValue={value}
      name={`gameObject[${cIndex}].options[${qIndex}].${name}`}
      control={control}
    />
  )
}
