import { ReactElement, useCallback, useContext, useMemo, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { UserType } from '@/enums/user-type'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Job } from '@/model/job'
import { deepMatchValue } from '@/utils/search'
import { AddOutlined } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Fab, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Jobs = () => {
  const router = useRouter()
  const [filters, setFilters] = useState<string[]>([])

  const { jobs, user } = useContext(loggedContext)

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
      pathname: `${PrivateRoutes.JOBS}/[id]`,
      query: { id },
    })
  }

  const [search, setSearch] = useState('')

  const filterJobs = useCallback((jobs: Job[], text?: string) => {
    if (!text || !jobs) {
      return jobs
    }

    return jobs.filter(
      (item: Job) =>
        deepMatchValue(item?.vaga?.titulo_vaga || '', text) ||
        deepMatchValue(item?.empresa?.nome || '', text)
    )
  }, [])

  const filteredJobs = useMemo(() => {
    if (!search) {
      return jobs?.data
    }

    return filterJobs(jobs?.data || [], search)
  }, [filterJobs, jobs?.data, search])

  return (
    <Container>
      <Typography variant='h4' fontWeight='bold'>
        Buscar vagas
      </Typography>

      <InputSearch
        onChange={({ target }) => setSearch(target.value)}
        value={search}
        placeholder='Vagas'
        id='jobs'
        type='jobs'
      />

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
          {filteredJobs?.map(job => {
            if (
              job?.vaga?.id_vaga === undefined ||
              job?.vaga?.id_vaga === null
            ) {
              return <></>
            }

            let subtitle = job?.vaga?.descricao
            if (!!subtitle && subtitle?.length > 30) {
              subtitle = subtitle.slice(0, 30) + ' ...'
            }
            return (
              <ItemList
                key={job?.vaga?.id_vaga}
                onClick={handleJob}
                {...{
                  item: {
                    id: job?.vaga?.id_vaga,
                    title: job?.vaga?.titulo_vaga,
                    subtitle: subtitle,
                    descrition: job?.empresa?.nome,
                    // subDescription: job.state,
                  },
                }}
              />
            )
          })}
        </Box>
      )}

      {user?.tipo === UserType.RECRUITER && (
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
      )}
    </Container>
  )
}

Jobs.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Jobs
