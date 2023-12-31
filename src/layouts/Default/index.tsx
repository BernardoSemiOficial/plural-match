import { ChatProvider } from '@/context/ChatContext'
import { LoggedProvider } from '@/context/LoggedContext'
import { globalThemeMUI } from '@/styles/global.material'
import { ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { Header } from './components/Header'
import * as S from './default.css'
import { DefaultProps } from './types'

export const queryClient = new QueryClient()

export const Default = ({ children }: DefaultProps) => {
  return (
    <ThemeProvider theme={globalThemeMUI}>
      <QueryClientProvider client={queryClient}>
        <LoggedProvider>
          <ChatProvider>
            <div className={S.container}>
              <Header />
              {children}
            </div>
          </ChatProvider>
        </LoggedProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
