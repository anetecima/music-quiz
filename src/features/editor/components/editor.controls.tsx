import { Controller, useFormContext } from 'react-hook-form'
import { useSelectCategoryIndex, useSelectQuestionIndex } from '@/features/editor/editor.provider'
import { QuizInput, QuizTypeSelect } from '@/components/ux/Input'
import { PointsWrap } from '@/components/ux/Points'

export const EditorInputControl = ({
  value,
  label,
  name
}: {
  label: string
  value?: string | number
  name: string
}) => {
  const { control } = useFormContext()
  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <Controller
      render={({ field }) => <QuizInput label={label} {...field} />}
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
  name
}: {
  label: string
  value?: string | number
  name: string
}) => {
  const { control } = useFormContext()

  const cIndex = useSelectCategoryIndex()
  const qIndex = useSelectQuestionIndex()

  return (
    <Controller
      render={({ field }) => <PointsWrap {...field} label={label} />}
      defaultValue={value}
      name={`gameObject[${cIndex}].options[${qIndex}].${name}`}
      control={control}
    />
  )
}
