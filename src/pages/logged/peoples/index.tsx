import { ReactElement, useState } from 'react'

import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { MOCK_CANDIDATES } from '@/mocks/candidates'
import type { SelectChangeEvent } from '@mui/material'
import {
  Avatar,
  Box,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { DropDownFilter } from '@/components/DropdownFilter'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const Peoples = () => {
  const [filters, setFilters] = useState<string[]>([])

  const handleChangeSelectFilter = (
    event: SelectChangeEvent<typeof filters>
  ) => {
    const {
      target: { value },
    } = event ?? {}
    setFilters(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Container>
      <Typography variant='h4' fontWeight='bold'>
        Buscar
      </Typography>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='candidates'
          type='candidates'
          placeholder='Pesquise por um candidato'
        />
      </Box>
      <Box mt={2} maxWidth={300}>
        <DropDownFilter {...{ filters, handleChangeSelectFilter }} />
      </Box>
      <Box mt={4}>
        {MOCK_CANDIDATES?.map(candidate => (
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
        ))}
      </Box>
    </Container>
  )
}

Peoples.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Peoples
