import type { IInputProps } from '@/components/ux/Input'
import { forwardRef } from 'react'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'

export const PointsWrap = forwardRef<
  HTMLDivElement,
  { label: string; onChange: (T: number) => void; checkEmpty?: boolean } & IInputProps
>(({ label, checkEmpty, ...field }, ref) => (
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
    <QuizInput
      {...field}
      type="number"
      label={label}
      ref={ref}
      error={checkEmpty && !field.value}
    />
    <div className="flex gap-1">
      {[10, 20, 30, 40, 50, 70].map(num => (
        <SimpleButton
          key={num}
          className="h-8 w-8 rounded-full bg-cta text-xs text-white shadow"
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
