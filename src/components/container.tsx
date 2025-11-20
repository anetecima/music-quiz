import type { PropsWithChildren } from 'react'
import { cn } from '@/helpers/cn'

// import { SnowFall } from '@/components/snowFall'

export const MainGameWrapper = ({
  className = '',
  children
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <>
      {/* This will overlay over screen, consider z-index for everything */}
      {/*<SnowFall />*/}
      <section
        className={cn(
          'bg-home z-[2] flex min-h-screen flex-col items-center justify-center py-4',
          className
        )}
      >
        {/*<div className="absolute flex h-full w-full items-center justify-center bg-pink-200">*/}
        {/*  <p className="text-[50rem] text-gray-400">32</p>*/}
        {/*</div>*/}
        {children}
      </section>
    </>
  )
}
