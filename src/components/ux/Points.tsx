import { ComponentProps, forwardRef } from 'react'
import { cn } from '@/helpers/cn'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'

export const PointsWrap = forwardRef<
  HTMLDivElement,
  { onChange: (T: number) => void; checkEmpty?: boolean } & ComponentProps<typeof QuizInput>
>(({ label, checkEmpty, className = '', ...field }, ref) => (
  <div className={cn('flex flex-col gap-2 sm:flex-row sm:items-center', className)}>
    <QuizInput
      {...field}
      className="max-w-xs"
      type="number"
      label={label}
      ref={ref}
      error={checkEmpty && !field.value}
    />

    <div className="flex grow gap-1">
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
