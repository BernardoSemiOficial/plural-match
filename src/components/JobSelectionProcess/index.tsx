import React from 'react'

import { createUUID } from '@/helpers/createUUID'
import { MOCK_CANDIDATES } from '@/mocks/candidates'
import { Box, Divider, Typography } from '@mui/material'

import { HeaderProfile } from '../HeaderProfile'
import { ItemList } from '../ItemList'

export const JobSelectionProcess: React.FC = () => {
  return (
    <Box>
      <Typography variant='h4' fontWeight='bold' mt={2}>
        Desenvolvedor Front End
      </Typography>

      <HeaderProfile title='Nubank SP' description='São Paulo, Campinas' />

      <Box my={2}>
        <Divider />
      </Box>

      {MOCK_CANDIDATES?.map(candidate => (
        <ItemList
          key={createUUID()}
          {...{
            item: {
              id: candidate.id,
              title: candidate.name,
              subtitle: `Vulnerabilidade: ${candidate.vulnerability}`,
              descrition: candidate.city,
              subDescription: candidate.state,
            },
          }}
        />
      ))}
    </Box>
  )
}
