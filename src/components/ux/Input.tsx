import FormControl from '@mui/material/FormControl'
import MuiInput, { InputProps } from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { QuestionType } from 'const'
import { forwardRef } from 'react'

export type IInputProps = InputProps

export const QuizInput = forwardRef<HTMLInputElement, { label: string } & InputProps>(
  ({ className = '', label, ...params }, ref) => {
    return (
      <FormControl className={className}>
        <InputLabel variant="standard" className="whitespace-nowrap">
          {label}
        </InputLabel>
        <MuiInput ref={ref} {...params} fullWidth />
      </FormControl>
    )
  }
)

export const QuizTypeSelect = forwardRef<HTMLSelectElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <FormControl className="w-full">
        <InputLabel variant="standard">{label}</InputLabel>
        <Select defaultValue="artist" variant="standard" {...props} ref={ref}>
          {Object.values(QuestionType).map(val => (
            <MenuItem key={val} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }
)
