import { ReactElement, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { PrivateRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { api } from '@/services/api'
import { AddOutlined } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Fab, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const Jobs = () => {
  const router = useRouter()

  const [filters, setFilters] = useState<string[]>([])

  const { data, isLoading, error } = useQuery({
    queryKey: [Services.LISTA_CANDIDATOS],
    queryFn: async () => (await api.get(Services.LISTA_VAGA)).data,
  })

  console.log('jobs', data)
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

      <InputSearch placeholder='Vagas' id='jobs' type='jobs' />

      <DropDownFilter {...{ filters, handleChangeSelectFilter }} />

      {isLoading ? (
        <Box
          mt={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <CircularProgress size={40} />
          <Typography variant='subtitle1'>Carregando vagas</Typography>
        </Box>
      ) : (
        <Box mt={4}>
          {data?.map(job => (
            <ItemList
              key={createUUID()}
              {...{
                item: {
                  id: job.id_vaga,
                  title: job.titulo_vaga,
                  subtitle: job.descricao,
                  descrition: 'Nubank',
                  // subDescription: job.state,
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
        <Fab
          color='primary'
          aria-label='add'
          onClick={() => {
            router.push({
              pathname: PrivateRoutes.JOB_REGISTER,
            })
          }}
        >
          <AddOutlined />
        </Fab>
      </div>
    </Container>
  )
}

Jobs.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Jobs
