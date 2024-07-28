import { TextField, TextFieldProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { QuestionType } from 'const'
import { forwardRef } from 'react'

export type IInputProps = TextFieldProps

export const QuizInput = forwardRef<HTMLDivElement, { label: string } & TextFieldProps>(
  ({ className = '', label, ...params }, ref) => {
    return <TextField {...params} className={className} label={label} size="medium" ref={ref} />
  }
)

export const QuizTypeSelect = forwardRef<HTMLSelectElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <Select defaultValue="artist" variant="outlined" {...props} ref={ref}>
        {Object.values(QuestionType).map(val => (
          <MenuItem key={val} value={val}>
            {val}
          </MenuItem>
        ))}
      </Select>
    )
  }
)
