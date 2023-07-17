import { ReactElement } from 'react'

import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const CompanyCredentials = () => {
  return (
    <Container>
      <Typography variant='h6' fontWeight='400'>
        Para criar a conta da empresa, digite as credenciais
      </Typography>
      <Typography variant='subtitle1'>
        Preencha com o email da empresa e uma senha.
      </Typography>
      <Box mt={4}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='email'
          type='email'
          placeholder='E-mail'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='password'
          type='password'
          placeholder='Senha'
        />
      </Box>

      <Box mt={4}>
        <Link
          href={{
            pathname: PublicRoutes.REGISTER_CREATED_ACCOUNT,
            query: { [QueryKeys.USER_TYPE]: QueryValues.USER_TYPE_COMPANY },
          }}
        >
          <Button fullWidth variant='contained' size='medium'>
            Criar conta
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

CompanyCredentials.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default CompanyCredentials
