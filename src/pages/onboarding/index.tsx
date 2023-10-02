import { ReactElement } from 'react'

import OnBoarding from '@/assets/svg/onboarding-landing.svg'
import { PublicRoutes } from '@/enums/routes'
import { Container } from '@/layouts/Default/components/Container/Container'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { Default } from '../../layouts/Default'

const HomeOnboarding = () => {
  return (
    <Container>
      <Typography variant='h6'>Qual o seu objetivo?</Typography>
      <Typography variant='subtitle1'>
        Está procurando uma vaga de trabalho? então clique em{' '}
        <b>Cadastrar Candidato </b>
        para preencher seus dados. <br />
        Se você deseja publicar vagas de trabalho e deseja contratar
        profissionais, então clique em <b>Cadastrar Empresa</b>.
      </Typography>

      <Box textAlign='center' my={4} py={4}>
        <Image src={OnBoarding} alt='' title='' />
      </Box>

      <Link href={PublicRoutes.COMPANY_INFORMATION}>
        <Button
          fullWidth
          startIcon={<BusinessIcon />}
          variant='outlined'
          size='medium'
        >
          Cadastrar Empresa
        </Button>
      </Link>
      <Box mt={2}>
        <Link href={PublicRoutes.CANDIDATE_CHECK_MAIL}>
          <Button
            fullWidth
            startIcon={<PersonIcon />}
            variant='contained'
            size='medium'
          >
            Cadastrar Candidato
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

HomeOnboarding.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default HomeOnboarding
