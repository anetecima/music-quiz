import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import MuiInput, { InputProps } from '@material-ui/core/Input'
import React from 'react'

export const QuizInput = React.forwardRef<HTMLInputElement, { label: string } & InputProps>(
  ({ className = '', label, ...params }, ref) => {
    return (
      <FormControl className={className}>
        <InputLabel className="whitespace-nowrap">{label}</InputLabel>
        <MuiInput ref={ref} {...params} fullWidth />
      </FormControl>
    )
  }
)

export const QuizSelect = React.forwardRef<HTMLSelectElement, { label: string }>(
  ({ label, ...props }, ref) => {
    return (
      <FormControl>
        <InputLabel>{label}</InputLabel>
        <Select defaultValue="artist" variant="standard" {...props} ref={ref}>
          <MenuItem value="artist">artist</MenuItem>
          <MenuItem value="song">song</MenuItem>
          <MenuItem value="video">video</MenuItem>
        </Select>
      </FormControl>
    )
  }
)
