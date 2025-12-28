import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from '@/helpers/cn'

export const HomeButton = ({ className = '' }: ComponentProps<'button'>) => {
  return (
    <Link
      href="/"
      className={cn(
        'absolute left-2 top-2 z-[2]',
        'text-game-200 border-game-100 h-12 w-12 rounded-md border-2 text-4xl',
        'flex items-center justify-center',
        className
      )}
    >
      <ChevronLeft />
    </Link>
  )
}
