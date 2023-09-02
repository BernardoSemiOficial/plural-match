import { ReactElement, useState } from 'react'

import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { MOCK_CANDIDATES } from '@/mocks/candidates'
import type { SelectChangeEvent } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { DropDownFilter } from '@/components/DropdownFilter'
import { ItemList } from '@/components/ItemList'
import { InputSearch } from '@/components/InputSearch'

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

      <InputSearch
        placeholder='Pesquise por um candidato'
        id='candidates'
        type='candidates'
      />

      <DropDownFilter {...{ filters, handleChangeSelectFilter }} />

      <Box mt={4}>
        {MOCK_CANDIDATES?.map(candidate => (
          <ItemList {...{ candidate }} />
        ))}
      </Box>
    </Container>
  )
}

Peoples.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Peoples
