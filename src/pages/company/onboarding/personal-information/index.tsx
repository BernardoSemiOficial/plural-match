import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Button, TextField, Typography } from '@mui/material'

import * as S from './personal-information.css'
import Link from 'next/link'

const CompanyPersonalInformation = () => {
  return (
    <div className={S.container}>
      <div>
        <Typography variant='h6' sx={{ fontWeight: 400 }}>
          Para criar a sua conta empresa precisamos de algumas informações
        </Typography>
        <Typography variant='subtitle1' mt={2}>
          Para começar, quais são os dados da sua empresa?
        </Typography>

        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='email'
          type='email'
          placeholder='Nome da empresa'
          sx={{ marginTop: '32px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='description'
          type='text'
          placeholder='Descrição'
          sx={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='cnpj'
          type='text'
          placeholder='CNPJ'
          sx={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='industry'
          type='text'
          placeholder='Setor de atuação'
          sx={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='location'
          type='text'
          placeholder='Localização'
          sx={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='yearFoudation'
          type='text'
          placeholder='Ano de fundação'
          sx={{ marginTop: '16px' }}
        />
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='site'
          type='text'
          placeholder='Site institucional'
          sx={{ marginTop: '16px' }}
        />
      </div>

      <Link href='/company/onboarding/credentials'>
        <Button
          fullWidth
          variant='contained'
          size='medium'
          sx={{ marginTop: '36px' }}
        >
          Continuar
        </Button>
      </Link>
    </div>
  )
}

CompanyPersonalInformation.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default CompanyPersonalInformation
