import { ReactElement, useContext, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { AddOutlined } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Fab, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Jobs = () => {
  const router = useRouter()

  const [filters, setFilters] = useState<string[]>([])

  const { jobs } = useContext(loggedContext)
  console.log('jobs', jobs?.data)
  console.log('error', jobs?.error)

  const handleChangeSelectFilter = (
    event: SelectChangeEvent<typeof filters>
  ) => {
    const {
      target: { value },
    } = event ?? {}
    setFilters(typeof value === 'string' ? value.split(',') : value)
  }

  const handleJob = ({ id }: { id: number }) => {
    router.push({
      pathname: `${PrivateRoutes.JOBS}/${id}`,
    })
  }

  return (
    <Container>
      <Typography variant='h4' fontWeight='bold'>
        Buscar vagas
      </Typography>

      <InputSearch placeholder='Vagas' id='jobs' type='jobs' />

      <DropDownFilter {...{ filters, handleChangeSelectFilter }} />

      {jobs?.isLoading ? (
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
          {jobs?.data?.map(job => {
            if (job?.id_vaga === undefined || job?.id_vaga === null) {
              return <></>
            }

            return (
              <ItemList
                key={job.id_vaga}
                onClick={handleJob}
                {...{
                  item: {
                    goToPage: {
                      pathname: `${PrivateRoutes.JOBS}/[id]`,
                      query: { id: job.id_vaga },
                    },
                    id: job.id_vaga,
                    title: job.titulo_vaga,
                    subtitle: job.descricao,
                    descrition: 'Nubank',
                    // subDescription: job.state,
                  },
                }}
              />
            )
          })}
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
