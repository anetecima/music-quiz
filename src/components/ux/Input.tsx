import FormControl from '@mui/material/FormControl'
import MuiInput, { InputProps } from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'

export type IInputProps = InputProps

export const QuizInput = React.forwardRef<HTMLInputElement, { label: string } & InputProps>(
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

export const QuizSelect = React.forwardRef<HTMLSelectElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <FormControl>
        <InputLabel variant="standard">{label}</InputLabel>
        <Select defaultValue="artist" variant="standard" {...props} ref={ref}>
          <MenuItem value="artist">artist</MenuItem>
          <MenuItem value="song">song</MenuItem>
          <MenuItem value="video">video</MenuItem>
        </Select>
      </FormControl>
    )
  }
)
