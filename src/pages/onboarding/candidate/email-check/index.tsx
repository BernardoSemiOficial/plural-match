import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Button, TextField, Typography } from '@mui/material'

import * as S from './email-check.css'

const EmailCheck = () => {
  return (
    <section className={S.container}>
      <Typography variant='h6' sx={{ fontWeight: 400 }}>
        Para criar a sua conta precisamos validar o seu email
      </Typography>
      <Typography variant='subtitle1'>
        Para criar a sua conta precisamos validar o seu email
      </Typography>
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        margin='dense'
        id='email'
        type='email'
        placeholder='E-mail'
        sx={{ marginTop: '24px' }}
      />
      <Button
        fullWidth
        variant='contained'
        size='medium'
        sx={{ marginTop: '36px' }}
      >
        Continuar
      </Button>
    </section>
  )
}

EmailCheck.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default EmailCheck
