import { Box, Typography } from '@mui/material'
import React from 'react'
import { HeaderProfile } from '../HeaderProfile'

export const JobSelectionProcess: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' fontWeight='bold' mt={2}>
        Desenvolvedor Front End
      </Typography>

      <HeaderProfile title='Nubank SP' description='São Paulo, Campinas' />
    </Box>
  )
}
