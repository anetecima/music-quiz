'use client'

import { Moon, Sun } from 'lucide-react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ComponentProps } from 'react'
import { cn } from '@/helpers/cn'
import { useIsClient } from '@/hooks/useIsClient'

type ThemeProviderProps = Parameters<typeof NextThemesProvider>[0]

/**
 * Your app's theme provider component.
 * 'use client' is essential for next-themes to work with app-dir.
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const ThemeModeButton = ({ className = '' }: ComponentProps<'button'>) => {
  const { theme, setTheme } = useTheme()
  const isClient = useIsClient()

  if (!isClient) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'mint' : 'light')}
      className={cn('bg-game-100 z-[2] cursor-pointer rounded-md p-3', className)}
    >
      {theme === 'light' ? <Sun /> : <Moon />}
    </button>
  )
}
