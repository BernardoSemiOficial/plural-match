import { ReactElement, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { CandidateProvider } from '@/context/CandidateContext'
import { Services } from '@/enums/services'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Candidate } from '@/model/candidate'
import { api } from '@/services/api'
import { AddOutlined } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Fab, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'

const Peoples = () => {
  const [filters, setFilters] = useState<string[]>([])

  const { data, isLoading, error } = useQuery({
    queryKey: [Services.LISTA_CANDIDATOS],
    queryFn: async () =>
      (await api.get<Candidate[]>(Services.LISTA_CANDIDATOS)).data,
  })

  console.log({ data })
  console.log('error', error)

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

      {isLoading ? (
        <Box
          mt={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <CircularProgress size={40} />
          <Typography variant='subtitle1'>Carregando candidatos</Typography>
        </Box>
      ) : (
        <Box mt={4}>
          {data?.map(candidate => (
            <ItemList
              key={createUUID()}
              {...{
                item: {
                  id: String(candidate.id),
                  title: candidate?.nome ?? 'Nome',
                  subtitle: `Vulnerabilidade: ${candidate?.deficiencia}`,
                  descrition: 'São Paulo',
                  subDescription: 'Campinas',
                },
              }}
            />
          ))}
        </Box>
      )}

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
  return (
    <CandidateProvider>
      <Default>{page}</Default>
    </CandidateProvider>
  )
}

export default Peoples
