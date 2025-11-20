import type { IInputProps } from '@/components/ux/Input'
import { forwardRef } from 'react'
import { cn } from '@/helpers/cn'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'

export const PointsWrap = forwardRef<
  HTMLDivElement,
  {
    isDisabled?: boolean
    label: string
    onChange: (T: number) => void
    checkEmpty?: boolean
  } & IInputProps
>(({ label, checkEmpty, isDisabled = false, ...field }, ref) => (
  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
    <QuizInput
      {...field}
      type="number"
      label={label}
      disabled={isDisabled}
      ref={ref}
      error={checkEmpty && !field.value}
    />
    <div className="flex gap-1">
      {[10, 20, 30, 40, 50, 70].map(num => (
        <SimpleButton
          key={num}
          className={cn(
            'h-8 w-8 rounded-full text-xs text-white shadow',
            isDisabled ? 'bg-pink-200' : 'bg-cta'
          )}
          onClick={() => {
            if (field.onChange && !isDisabled) {
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
