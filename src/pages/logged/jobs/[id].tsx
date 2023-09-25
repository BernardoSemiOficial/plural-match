import React, { ReactElement, useContext, useMemo, useState } from 'react'

import { JobDetails } from '@/components/JobDetails'
import { JobSelectionProcess } from '@/components/JobSelectionProcess'
import { SectionKeywordsProps } from '@/components/SectionKeywords'
import { loggedContext } from '@/context/LoggedContext'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Home, Info, Paid, Work } from '@mui/icons-material'
import { Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'

const People = () => {
  const router = useRouter()
  const [value, setValue] = useState(0)

  const jobId = router.query?.id
  const { jobs } = useContext(loggedContext)
  const job = useMemo(
    () => jobs?.data?.find(item => item.id_vaga === Number(jobId)),
    [jobId, jobs?.data]
  )
  console.log('job', job)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const jobInfo: SectionKeywordsProps['keywords'] = useMemo(() => {
    const labels = {
      modelo_trabalho: { icon: <Work fontSize='small' />, label: 'Presencial' },
      modelo_contratacao: { icon: <Home fontSize='small' />, label: 'CLT' },
      faixa_salarial: { icon: <Paid fontSize='small' />, label: 'A combinar' },
      situacao_vulnerabilidade: {
        icon: <Info fontSize='small' />,
        label: 'Classe Social D',
      },
    }
    // const labels = [
    //   { icon: <Work fontSize='small' />, label: 'Presencial' },
    //   { icon: <Home fontSize='small' />, label: 'CLT' },
    //   { icon: <Paid fontSize='small' />, label: 'A combinar' },
    //   { icon: <Info fontSize='small' />, label: 'Classe Social D' },
    // ]
  }, [])

  return (
    <Container>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        style={{ marginBottom: 32 }}
      >
        <Tab label='Vaga' />
        <Tab label='Processo seletivo' />
      </Tabs>

      {value === 0 && (
        <JobDetails
          header={{
            title: job?.titulo_vaga,
            description: job?.descricao,
          }}
          jobInfo={[]}
        />
      )}
      {value === 1 && <JobSelectionProcess />}
    </Container>
  )
}

People.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default People
