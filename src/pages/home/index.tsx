import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

import * as S from './home.css'

const Home = () => {
  return (
    <section className={S.container}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '24px',
        }}
      >
        <Box className={S.typography}>
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
          <Typography
            variant='subtitle1'
            textAlign='center'
            sx={{
              fontSize: '22px',
              lineHeight: '26px',
              fontWeight: 'bold',
              marginTop: '24px',
              color: '#ffffff',
            }}
          >
            Recrutamento e seleção para pessoas em situação de vulnerabilidade.
          </Typography>
        </Box>

        <Box className={S.buttons}>
          <Link href='/home/onboarding'>
            <Button
              fullWidth
              variant='outlined'
              size='medium'
              sx={{ color: '#ffffff', borderColor: '#ffffff' }}
            >
              ABRIR A SUA CONTA
            </Button>
          </Link>
          <Link href='/onboarding/status'>
            <Button
              fullWidth
              variant='contained'
              size='medium'
              sx={{ marginTop: '16px' }}
            >
              ACESSAR A CONTA
            </Button>
          </Link>
        </Box>
      </Box>
    </section>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Home
