import type { IInputProps } from '@/components/ux/Input'
import { forwardRef } from 'react'
import { SimpleButton } from '@/components/ux/Button'
import { QuizInput } from '@/components/ux/Input'

export const PointsWrap = forwardRef<
  HTMLDivElement,
  { label: string; onChange: (T: number) => void } & IInputProps
>(({ label, ...field }, ref) => (
  <div className="flex items-center gap-2">
    <QuizInput {...field} type="number" label={label} ref={ref} />
    <div className="flex gap-1">
      {[10, 20, 30, 40, 50, 70].map(num => (
        <SimpleButton
          key={num}
          className="bg-cta h-8 w-8 rounded-full text-xs text-white shadow"
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
