import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'

import { HeaderProfile } from '@/components/HeaderProfile'
import { SelectiveProcessStep } from '@/components/SelectiveProcessStep'
import { SELECTIVE_PROCESS_STEPS } from '@/mocks/selectiveProcessSteps'
import { Box, Button, Divider, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Detail = () => {
  const router = useRouter()
  console.log('router.query', router.query)
  // const jobId = router.query?.id

  const status = 'inProgress'
  const labelStatus = {
    inProgress: 'Em andamento',
  }

  return (
    <Container>
      <HeaderProfile title='Bernardo' description='18 anos' />

      <Box my={2}>
        <Divider />
      </Box>

      <Typography fontSize={16}>Progresso no processo seletivo</Typography>
      <Typography fontSize={14} fontFamily='bold'>
        status: {labelStatus[status]}
      </Typography>

      <Box my={3}>
        <Divider />
      </Box>

      {SELECTIVE_PROCESS_STEPS.map((step, idx) => (
        <SelectiveProcessStep {...{ step, idx }} />
      ))}

      <Box mt={4}>
        <Link href={'#'}>
          <Button fullWidth variant='contained' size='medium'>
            Salvar
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Detail
