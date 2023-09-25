import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type FormEmail = {
  email: string
}

const schema = yup
  .object({
    email: yup.string().email().required('O email é obrigatório'),
  })
  .required()

const CheckEmail = () => {
  const router = useRouter()
  const { candidate, setCandidateData } = useContext(registerCandidateContext)
  const [email, setEmail] = useState(candidate.email)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormEmail>({
    resolver: yupResolver(schema),
  })

  const handleSubmitForm: SubmitHandler<FormEmail> = data => {
    setCandidateData({ email: data.email })
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
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <Box mt={3}>
          <TextField
            {...register('email')}
            helperText={errors.email?.message}
            error={!!errors.email?.message}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='email'
            type='email'
            placeholder='E-mail'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </Box>
        <Box mt={4}>
          <Button type='submit' fullWidth variant='contained' size='medium'>
            Continuar
          </Button>
        </Box>
      </form>
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
