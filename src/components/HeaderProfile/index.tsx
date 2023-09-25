import React from 'react'

import { AvatarDescription } from '@/components/AvatarDescription'
import CreateIcon from '@mui/icons-material/Create'
import { Box } from '@mui/material'

export interface HeaderProfileProps {
  title?: string
  description?: string
  edit?(): void
}

export const HeaderProfile: React.FC<HeaderProfileProps> = ({
  title,
  description,
  edit,
}) => {
  return (
    <Box>
      {!!edit && (
        <Box textAlign='right'>
          <CreateIcon color='primary' fontSize='large' />
        </Box>
      )}
      <AvatarDescription people={{ name: title, age: description }} />
    </Box>
  )
}
