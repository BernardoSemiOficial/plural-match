import { globalThemeMUI } from '@/styles/global.material'
import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Header } from './components/Header'
import * as S from './default.css'
import { DefaultProps } from './types'

const queryClient = new QueryClient()

export const Default = ({ children }: DefaultProps) => {
  return (
    <ThemeProvider theme={globalThemeMUI}>
      <QueryClientProvider client={queryClient}>
        <div className={S.container}>
          <Header />
          {children}
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
