import React from 'react'

import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'

import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export const ItemList: React.FC<{
  candidate: {
    id: string
    name: string
    vulnerability: string
    city: string
    state: string
  }
}> = ({ candidate }) => {
  return (
    <Box mt={2} key={candidate.id}>
      <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
        <Avatar sx={{ bgcolor: '#BA2649' }}>
          {firstLetterOfFirstAndLastName(candidate.name)}
        </Avatar>
        <Stack ml={2} flex={1}>
          <Typography variant='subtitle1'>{candidate.name}</Typography>
          <Typography variant='body1'>
            vulnerabilidade: {candidate.vulnerability}
          </Typography>
          <Typography variant='body1'>
            {candidate.city} {candidate.state}
          </Typography>
        </Stack>
      </Box>
      <Box my={2}>
        <Divider />
      </Box>
    </Box>
  )
}
