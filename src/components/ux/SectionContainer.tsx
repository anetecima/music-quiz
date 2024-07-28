import { PropsWithChildren } from 'react'

export const SectionContainer = ({
  children,
  className = ''
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <article
      className={`border-border-1 flex gap-2 rounded border p-4 shadow sm:flex-row ${className}`}
    >
      {children}
    </article>
  )
}
