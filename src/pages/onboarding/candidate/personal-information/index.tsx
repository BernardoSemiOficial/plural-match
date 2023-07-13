import { ReactElement, useState } from 'react'

import { Default } from '@/layouts/Default'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

import * as S from './personal-information.css'

const PersonalInformation = () => {
  const [activeStep, setActiveStep] = useState(1)

  return (
    <section className={S.container}>
      <MobileStepper steps={6} activeStep={activeStep} />
      <Box sx={{ marginTop: '24px' }}>
        <Typography variant='h6' sx={{ fontWeight: 400 }}>
          Informações pessoais
        </Typography>
        <Typography variant='subtitle1'>
          Preencha com as suas informações
        </Typography>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='name'
          type='text'
          placeholder='Nome'
          sx={{ marginTop: '24px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='social-name'
          type='text'
          placeholder='Nome social'
          sx={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='birthdate'
          type='date'
          placeholder='Data de nascimento'
          sx={{ marginTop: '16px' }}
        />
        <Link href='self-declaration'>
          <Button
            fullWidth
            variant='contained'
            size='medium'
            sx={{ marginTop: '36px' }}
          >
            Continuar
          </Button>
        </Link>
      </Box>
    </section>
  )
}

PersonalInformation.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default PersonalInformation
