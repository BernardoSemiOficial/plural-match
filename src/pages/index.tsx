import { ReactElement, ReactNode } from 'react'

import { PublicRoutes } from '@/enums/routes'
import {
  ContainerWithBackground,
  containerWithBackgroundStyle,
} from '@/layouts/Default/components/ContainerWithBackground'
import { Box, Button, Link, Typography } from '@mui/material'

import { Default } from '../layouts/Default'

interface HomeProps {
  children: ReactNode
  environment: string
}

const Home = ({ environment }: HomeProps) => {
  return (
    <ContainerWithBackground>
      <Box
        mt={3}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box className={containerWithBackgroundStyle.content}>
          <Typography
            variant='h1'
            textAlign='center'
            sx={{
              fontSize: '36px',
              letterSpacing: '1.25px',
              fontWeight: 'bold',
              color: '#ffffff',
            }}
          >
            PLURAL MATCH
          </Typography>
          <Box mt={3}>
            <Typography
              variant='subtitle1'
              textAlign='center'
              sx={{
                fontSize: '22px',
                lineHeight: '26px',
                fontWeight: 'bold',

                color: '#ffffff',
              }}
            >
              Recrutamento e seleção para pessoas em situação de
              vulnerabilidade.
            </Typography>
          </Box>
        </Box>
        <Box className={containerWithBackgroundStyle.actions}>
          <Link href={PublicRoutes.ONBOARDING}>
            <Button
              fullWidth
              variant='outlined'
              size='medium'
              sx={{ color: '#ffffff', borderColor: '#ffffff' }}
            >
              ABRIR A SUA CONTA
            </Button>
          </Link>
          <Box mt={2}>
            <Link href={PublicRoutes.LOGIN}>
              <Button fullWidth variant='contained' size='medium'>
                ACESSAR A CONTA
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </ContainerWithBackground>
  )
}

export async function getStaticProps() {
  return {
    props: {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    },
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Home
