import { ReactElement } from 'react'

export interface ErrorBoundaryProps {
  children: ReactElement
}

export interface ErrorBoundaryState {
  hasError: boolean
}
