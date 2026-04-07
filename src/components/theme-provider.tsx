'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ThemeProviderProps extends React.ComponentProps<typeof NextThemesProvider> {
  /** Custom storage key for persisting theme preference */
  storageKey?: string
}

export function ThemeProvider({
  children,
  storageKey = 'natraj-theme',
  defaultTheme = 'system',
  enableSystem = true,
  ...props
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
