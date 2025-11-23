import { FormControl, InputLabel, TextField, TextFieldProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { QuestionType } from 'const'
import { forwardRef } from 'react'

export const QuizInput = forwardRef<HTMLDivElement, { label: string } & TextFieldProps>(
  ({ className = '', label, ...params }, ref) => {
    return <TextField {...params} className={className} label={label} size="small" ref={ref} />
  }
)

export const QuizTypeSelect = forwardRef<HTMLSelectElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <FormControl fullWidth={true}>
        <InputLabel id="demo-customized-select-label" className="bg-white px-2">
          {label}
        </InputLabel>
        <Select
          defaultValue="artist"
          variant="outlined"
          {...props}
          ref={ref}
          size="small"
          className="w-full"
        >
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
