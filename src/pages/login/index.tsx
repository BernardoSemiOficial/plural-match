import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'

const Login = () => {
  return (
    <Container>
      <Box>
        <Typography variant='h5' fontWeight='bold'>
          Informe seu e-mail e senha de cadastro para acessar sua conta.
        </Typography>
        <Box mt={3}>
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
      </Box>
      <Box mt={4}>
        <Button fullWidth variant='contained' size='medium'>
          Acessar conta
        </Button>
      </Box>
    </Container>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Login
