import { Box, Divider, Typography } from '@mui/material'
import React from 'react'
import { HeaderProfile } from '../HeaderProfile'
import { ItemList } from '../ItemList'
import { MOCK_CANDIDATES } from '@/mocks/candidates'
import { createUUID } from '@/helpers/createUUID'

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
