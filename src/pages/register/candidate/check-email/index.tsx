import { ReactElement, useContext, useState } from 'react'

import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const CheckEmail = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const { setCandidateData } = useContext(registerCandidateContext)

  const handleClickContinue = () => {
    setCandidateData({ email })
    router.push(PublicRoutes.CANDIDATE_PERSONAL_INFORMATION)
  }

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
          onChange={({ target }) => setEmail(target.value)}
        />
      </Box>
      <Box mt={4}>
        <Button
          fullWidth
          variant='contained'
          size='medium'
          onClick={handleClickContinue}
        >
          Continuar
        </Button>
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
