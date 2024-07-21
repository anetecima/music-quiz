import { PropsWithChildren } from 'react'

export const SectionContainer = ({
  children,
  className = ''
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <article className={`my-4 flex flex-wrap gap-4 rounded bg-purple-300 p-4 shadow ${className}`}>
      {children}
    </article>
  )
}
