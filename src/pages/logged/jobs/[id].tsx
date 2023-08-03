import { ReactElement, useState } from 'react'

import { createUUID } from '@/helpers/createUUID'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { candidateFilters } from '@/mocks/candidateFilters'
import { MOCK_CANDIDATES } from '@/mocks/candidates'
import type { SelectChangeEvent } from '@mui/material'
import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  ListItemText,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const Job = () => {
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
        <FormControl sx={{ minWidth: 1 }} size='small'>
          <InputLabel htmlFor='grouped-select'>Filtrar</InputLabel>
          <Select
            multiple
            value={filters}
            size='small'
            id='grouped-select'
            label='Filtrar por'
            onChange={handleChangeSelectFilter}
            input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
            MenuProps={MenuProps}
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map(value => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {candidateFilters.map(filter => [
              <ListSubheader key={createUUID()}>
                (<>{filter.category}</>)
              </ListSubheader>,
              filter.items.map(item => (
                <MenuItem key={item.id} value={item.label}>
                  <Checkbox checked={filters.indexOf(item.label) > -1} />
                  <ListItemText primary={item.label} />
                </MenuItem>
              )),
            ])}
          </Select>
        </FormControl>
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

Job.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Job
