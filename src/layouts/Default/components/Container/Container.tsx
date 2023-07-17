import { ReactNode } from 'react'

import * as S from './container.css'

interface ContainerProps {
  children: ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={S.container}>{children}</div>
}
