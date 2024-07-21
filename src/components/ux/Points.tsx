import React from 'react'
import { SimpleButton } from '@/components/ux/Button'
import { IInputProps, QuizInput } from '@/components/ux/Input'

export const PointsWrap = React.forwardRef<
  HTMLInputElement,
  { label: string; onChange: (T: number) => void } & IInputProps
>(({ label, ...field }, ref) => (
  <div className="flex flex-wrap items-center gap-4">
    <QuizInput {...field} type="number" label={label} ref={ref} />
    <div className="flex gap-1">
      {[10, 20, 30, 40, 50, 70].map(num => (
        <SimpleButton
          key={num}
          className="h-8 w-8 rounded bg-purple-400 text-xs font-bold text-white shadow lg:h-10 lg:w-10"
          onClick={() => {
            if (field.onChange) {
              field.onChange(num)
            }
          }}
        >
          {num}
        </SimpleButton>
      ))}
    </div>
  </div>
))
