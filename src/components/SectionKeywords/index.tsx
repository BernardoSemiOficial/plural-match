import { ReactElement } from 'react'

import { createUUID } from '@/helpers/createUUID'
import { Chip } from '@mui/material'

interface SectionKeywordsProps {
  keywords: {
    icon: ReactElement
    label: string
  }[]
}

export const SectionKeywords = ({ keywords }: SectionKeywordsProps) => {
  return (
    <>
      {keywords.map(keyword => (
        <Chip
          key={createUUID()}
          icon={keyword.icon}
          variant='outlined'
          color='primary'
          label={keyword.label}
          size='medium'
          sx={{ fontSize: '15px' }}
        />
      ))}
    </>
  )
}
