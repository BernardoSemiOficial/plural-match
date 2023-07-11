import { ReactNode, createContext, useState } from 'react'

export enum ColorModeName {
  DARK = 'dark',
  LIGHT = 'light',
}

type ColorMode = ColorModeName.DARK | ColorModeName.LIGHT

type ProviderThemeColorProps = {
  children: ReactNode
}

type ThemeColorContext = {
  colorMode: ColorMode
  toggleThemeColor: () => void
}

export const themeColorContext = createContext({} as ThemeColorContext)

export const ThemeColorProvider = ({ children }: ProviderThemeColorProps) => {
  const [colorMode, setColorMode] = useState<ColorMode>(ColorModeName.LIGHT)

  const toggleThemeColor = () => {
    setColorMode(colorMode =>
      colorMode === ColorModeName.LIGHT
        ? ColorModeName.DARK
        : ColorModeName.LIGHT
    )
  }

  return (
    <themeColorContext.Provider value={{ colorMode, toggleThemeColor }}>
      {children}
    </themeColorContext.Provider>
  )
}
