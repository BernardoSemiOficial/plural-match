import { ReactElement, useContext } from 'react'

import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const CheckEmail = () => {
  const { candidate } = useContext(registerCandidateContext)

  return (
    <Container>
      <Typography variant='h6' fontWeight='400'>
        Para criar a sua conta precisamos validar o seu email
      </Typography>
      <Typography variant='subtitle1'>
        Para criar a sua conta precisamos validar o seu email
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
      <Box mt={4}>
        <Link href={PublicRoutes.CANDIDATE_PERSONAL_INFORMATION}>
          <Button fullWidth variant='contained' size='medium'>
            Continuar
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

CheckEmail.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default CheckEmail
