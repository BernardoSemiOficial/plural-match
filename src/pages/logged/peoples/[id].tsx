import React, { ReactElement, useState } from 'react'

import { JobDetails } from '@/components/JobDetails'
import { JobSelectionProcess } from '@/components/JobSelectionProcess'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Tab, Tabs } from '@mui/material'

const People = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label='Vaga' />
        <Tab label='Processo seletivo' />
      </Tabs>

      {value === 0 && <JobDetails />}
      {value === 1 && <JobSelectionProcess />}
    </Container>
  )
}

People.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default People
