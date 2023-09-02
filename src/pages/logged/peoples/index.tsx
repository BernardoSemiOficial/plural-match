import { ReactElement, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { MOCK_CANDIDATES } from '@/mocks/candidates'
import { AddOutlined } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import { Box, Fab, Typography } from '@mui/material'

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
        {[...MOCK_CANDIDATES, ...MOCK_CANDIDATES]?.map(candidate => (
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

      <div
        style={{
          position: 'fixed',
          bottom: '40px',
          width: '100%',
          maxWidth: '700px',
          justifyContent: 'flex-end',
          display: 'flex',
        }}
      >
        <Fab color='primary' aria-label='add'>
          <AddOutlined />
        </Fab>
      </div>
    </Container>
  )
}

Peoples.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Peoples
