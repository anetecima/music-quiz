import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'
import * as React from 'react'

export const MuiButton = ({ children, ...props }: ButtonProps) => {
  return (
    <Button variant="outlined" {...props}>
      {children}
    </Button>
  )
}

export const SimpleButton = ({ className, children, ...props }: ButtonProps) => (
  <button className={`rounded shadow hover:opacity-80 ${className}`} type="button" {...props}>
    {children}
  </button>
)
