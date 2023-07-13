import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Button, TextField, Typography } from '@mui/material'

import * as S from './credentials.css'
import Link from 'next/link'

const CompanyCredentials = () => {
  return (
    <div className={S.container}>
      <div>
        <Typography variant='h6' sx={{ fontWeight: 400 }}>
          Para criar a conta da empresa, digite as credenciais
        </Typography>
        <Typography variant='subtitle1' mt={2}>
          Preencha com o email da empresa e uma senha.
        </Typography>

        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='email'
          type='email'
          placeholder='E-mail'
          sx={{ marginTop: '32px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='password'
          type='password'
          placeholder='Senha'
          sx={{ marginTop: '16px' }}
        />
      </div>

      <Link href='/status'>
        <Button
          fullWidth
          variant='contained'
          size='medium'
          sx={{ marginTop: '36px' }}
        >
          Criar conta
        </Button>
      </Link>
    </div>
  )
}

CompanyCredentials.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default CompanyCredentials
