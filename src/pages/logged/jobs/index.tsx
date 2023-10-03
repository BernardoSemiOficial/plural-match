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
import { deepMatchValue, verifyIfHasFilter } from '@/utils/search'
import { AddOutlined } from '@mui/icons-material'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Fab, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Jobs = () => {
  const router = useRouter()
  const [filters, setFilters] = useState<string[]>([])

  const { jobs, user, currentCandidate } = useContext(loggedContext)

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
    let newJobs = jobs?.data || []

    if (search) {
      newJobs = filterJobs(jobs?.data || [], search)
    }

    if (filters?.length) {
      newJobs = newJobs?.filter(job =>
        verifyIfHasFilter({
          declaracao: job?.vaga?.situacao_vulnerabilidade,
          filters,
        })
      )
    }

    return newJobs
  }, [filterJobs, filters, jobs?.data, search])

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
      {jobs?.isLoading && (
        <Box
          mt={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <CircularProgress size={40} />
          <Typography variant='subtitle1'>Carregando vagas</Typography>
        </Box>
      )}
      {!jobs?.isLoading && !jobs?.data?.length && (
        <Box
          mt={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <Typography variant='subtitle1'>Sem vagas</Typography>
        </Box>
      )}
      {Boolean(jobs?.data?.length) && (
        <Box mt={4}>
          {filteredJobs?.map(job => {
            if (
              job?.vaga?.id_vaga === undefined ||
              job?.vaga?.id_vaga === null
            ) {
              return <></>
            }

            return (
              <ItemList
                key={job?.vaga?.id_vaga}
                onClick={handleJob}
                {...{
                  item: {
                    id: job?.vaga?.id_vaga,
                    title: job?.vaga?.titulo_vaga,
                    subtitle: job?.vaga?.situacao_vulnerabilidade,
                    descrition: job?.empresa?.nome,
                    hasTag:
                      user?.tipo === UserType.CANDIDATE &&
                      !!currentCandidate?.vagasSelecionadas?.find(
                        jobCurrentCandidate =>
                          jobCurrentCandidate?.vaga?.id_vaga ===
                          job?.vaga?.id_vaga
                      ) &&
                      'Em andamento',
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
