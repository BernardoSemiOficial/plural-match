import { ReactNode } from 'react'

import * as S from './containerWithBackground.css'

interface ContainerWithBackgroundProps {
  children: ReactNode
}

export const containerWithBackgroundStyle = {
  content: S.content,
  actions: S.actions,
}

export const ContainerWithBackground = ({
  children,
}: ContainerWithBackgroundProps) => {
  return <div className={S.container}>{children}</div>
}
