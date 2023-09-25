import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { createNumberID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { api } from '@/services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type FormPersonalInformation = {
  password: string
}

const schema = yup
  .object({
    password: yup
      .string()
      .required('A senha é obrigatória')
      .max(20, 'O máximo de caracteres é 20'),
  })
  .required()

const CreatePassword = () => {
  const router = useRouter()

  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
    clearCandidateStorage,
  } = useContext(registerCandidateContext)

  const [password, setPassword] = useState(candidate.senha)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPersonalInformation>({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () =>
      await api.post(Services.CADASTRA_CANDIDATO, {
        ...candidate,
        pretensaoSalarial: 9000,
        senha: password,
        id: createNumberID(),
      }),
    onSuccess() {
      router.push(PublicRoutes.REGISTER_CREATED_ACCOUNT, {
        query: { [QueryKeys.USER_TYPE]: QueryValues.USER_TYPE_CANDIDATE },
      })
      clearCandidateStorage()
    },
  })

  const handleSubmitForm: SubmitHandler<FormPersonalInformation> = data => {
    setCandidateData({ senha: data.password })
    mutate()
  }

  return (
    <Container>
      <MobileStepper
        steps={stepsLength}
        activeStep={activeStep}
        handleClickBack={handleClickBackStep}
        handleClickNext={handleClickNextStep}
      />
      {error && (
        <Box mt={3}>
          <Alert severity='error'>Não foi possível finalizar o cadastro</Alert>
        </Box>
      )}
      <Box mt={3}>
        <Typography variant='h6' fontWeight='400'>
          Para finalizar o seu cadastro, digite a sua senha
        </Typography>
        <Typography variant='subtitle1'>
          Ela deve ter no mínimo 8 caracteres, sendo pelo menos uma letra
          maiúscula, uma letra minúscula e um numeral.
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box mt={2}>
            <TextField
              {...register('password')}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='password'
              name='password'
              type='password'
              placeholder='Senha'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </Box>
          <Box mt={4}>
            <Button type='submit' fullWidth variant='contained' size='medium'>
              {isLoading ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                'Continuar'
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

CreatePassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default CreatePassword
