import React, { ReactElement, useContext, useMemo, useState } from 'react'

import { JobDetails } from '@/components/JobDetails'
import { JobSelectionProcess } from '@/components/JobSelectionProcess'
import { SectionKeywordsProps } from '@/components/SectionKeywords'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { UserType } from '@/enums/user-type'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Home, Info, Paid, Work } from '@mui/icons-material'
import { Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'

const People = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)

  const jobId = router.query?.id
  const { jobs, candidates, user } = useContext(loggedContext)
  const job = useMemo(
    () => jobs?.data?.find(item => item?.vaga?.id_vaga === Number(jobId)),
    [jobId, jobs?.data]
  )
  console.log('job', job)
  console.log('jobId', jobId)
  console.log('candidates', candidates)

  const filteredCandidatesPerJob = useMemo(() => {
    const filtered = candidates?.data?.filter(candidate => {
      const jobs = candidate?.vagasSelecionadas
      console.log('jobs --->', jobs)
      const findJobs = jobs?.find(job => job.vaga.id_recrutador === user?.id)
      return !!findJobs
    })
    return filtered
  }, [candidates?.data, user?.id])

  console.log('filteredCandidatesPerJob', filteredCandidatesPerJob)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const jobInfo: SectionKeywordsProps['keywords'] = useMemo(() => {
    const labels = [
      {
        icon: <Work fontSize='small' />,
        label: job?.vaga?.modelo_trabalho,
      },
      {
        icon: <Home fontSize='small' />,
        label: job?.vaga?.modelo_contratacao,
      },
      {
        icon: <Paid fontSize='small' />,
        label: job?.vaga?.faixa_salarial,
      },
      {
        icon: <Info fontSize='small' />,
        label: job?.vaga?.situacao_vulnerabilidade,
      },
    ]
    return labels
  }, [
    job?.vaga?.faixa_salarial,
    job?.vaga?.modelo_contratacao,
    job?.vaga?.modelo_trabalho,
    job?.vaga?.situacao_vulnerabilidade,
  ])

  return (
    <Container>
      {user?.tipo === UserType.RECRUITER && (
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          style={{ marginBottom: 32 }}
        >
          <Tab label='Vaga' />
          <Tab label='Processo seletivo' />
        </Tabs>
      )}

      {value === 0 && (
        <JobDetails
          header={{
            title: job?.vaga?.titulo_vaga,
            description: job?.empresa?.nome,
          }}
          jobInfo={jobInfo}
          description={{
            title: 'Descrição da vaga',
            description: job?.vaga?.descricao,
          }}
          jobId={jobId}
        />
      )}
      {user?.tipo === UserType.RECRUITER && value === 1 && (
        <JobSelectionProcess
          header={{
            title: job?.vaga?.titulo_vaga,
            description: job?.empresa?.nome,
          }}
          candidates={filteredCandidatesPerJob || []}
          onClick={({ id }: { id: number }) => {
            router.push({
              pathname: `${PrivateRoutes.PROCESS_DETAIL}`,
              query: {
                candidateId: id,
                jobId: jobId,
              },
            })
          }}
        />
      )}
    </Container>
  )
}

People.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default People
