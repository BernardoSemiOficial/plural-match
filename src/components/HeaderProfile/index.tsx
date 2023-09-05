import React from 'react'

import { AvatarDescription } from '@/components/AvatarDescription'
import CreateIcon from '@mui/icons-material/Create'
import { Box } from '@mui/material'

export const HeaderProfile: React.FC<{
  title: string
  description: string
  edit?(): void
}> = ({ title, description, edit }) => {
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
