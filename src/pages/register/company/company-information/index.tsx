import { ReactElement } from 'react'

import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const CompanyInformation = () => {
  return (
    <Container>
      <Typography variant='h6' fontWeight='400'>
        Para criar a sua conta empresa precisamos de algumas informações
      </Typography>
      <Typography variant='subtitle1'>
        Para começar, quais são os dados da sua empresa?
      </Typography>
      <Box mt={4}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='email'
          type='email'
          placeholder='Nome da empresa'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='description'
          type='text'
          placeholder='Descrição'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='cnpj'
          type='text'
          placeholder='CNPJ'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='industry'
          type='text'
          placeholder='Setor de atuação'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='location'
          type='text'
          placeholder='Localização'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='yearFoudation'
          type='text'
          placeholder='Ano de fundação'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='site'
          type='text'
          placeholder='Site institucional'
        />
      </Box>
      <Box mt={4}>
        <Link href={PublicRoutes.COMPANY_CREDENTIALS}>
          <Button fullWidth variant='contained' size='medium'>
            Continuar
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

CompanyInformation.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default CompanyInformation
