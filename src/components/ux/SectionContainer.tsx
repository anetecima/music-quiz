import { PropsWithChildren } from 'react'

export const SectionContainer = ({
  children,
  className = ''
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <article
      className={`flex flex-col gap-4 rounded border border-border-1 p-4 shadow sm:flex-row ${className}`}
    >
      {children}
    </article>
  )
}
