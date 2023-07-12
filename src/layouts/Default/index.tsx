import { globalThemeMUI } from '@/styles/global.material'
import { ThemeProvider } from '@mui/material'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import * as S from './default.css'
import { DefaultProps } from './types'

export const Default = ({ children }: DefaultProps) => {
  return (
    <ThemeProvider theme={globalThemeMUI}>
      <div className={S.container}>
        <Header />
        {children}
      </div>
    </ThemeProvider>
  )
}
