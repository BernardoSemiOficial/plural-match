import React from 'react'

import { AvatarDescription } from '@/components/AvatarDescription'
import CreateIcon from '@mui/icons-material/Create'
import { Box } from '@mui/material'

export const HeaderProfile: React.FC<{
  title: string
  description: string
}> = ({ title, description }) => {
  return (
    <Box>
      <Box textAlign='right'>
        <CreateIcon color='primary' fontSize='large' />
      </Box>
      <AvatarDescription people={{ name: title, age: description }} />
    </Box>
  )
}
