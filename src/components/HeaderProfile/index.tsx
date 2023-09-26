import React from 'react'

import { AvatarDescription } from '@/components/AvatarDescription'
import CreateIcon from '@mui/icons-material/Create'
import { Box } from '@mui/material'

export interface HeaderProfileProps {
  title?: string
  age?: string
  company?: string
  jobIdEdit?: number
  edit?(): void
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({
  title,
  age,
  company,
  jobIdEdit,
  edit,
}) => {
  return (
    <Box>
      {!!edit && (
        <Box textAlign='right'>
          <CreateIcon color='primary' fontSize='large' />
        </Box>
      )}
      <AvatarDescription people={{ name: title, age, company, jobIdEdit }} />
    </Box>
  )
}
