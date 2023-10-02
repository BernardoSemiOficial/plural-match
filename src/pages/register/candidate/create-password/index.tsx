import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { MobileStepper } from '@/components/MobileStepper'
import { PasswordRules } from '@/components/PasswordRules'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { passwordRules } from '@/enums/passwords'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { createNumberID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { api } from '@/services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type FormPersonalInformation = {
  password: string
  confirmationPassword: string
}

const schema = yup
  .object({
    password: yup
      .string()
      .matches(passwordRules, { message: 'Crie uma senha mais segura' })
      .required('A senha é obrigatória'),
    confirmationPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'As duas senhas devem corresponder')
      .required(),
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
  const [confirmationPassword, setConfirmationPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowConfirmationPassword = () =>
    setShowConfirmationPassword(show => !show)

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
    if (isLoading) return
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
              type={showPassword ? 'text' : 'password'}
              placeholder='Senha'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Exibir senha escrita'
                      onClick={handleClickShowPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mt={2}>
            <TextField
              {...register('confirmationPassword')}
              helperText={errors.confirmationPassword?.message}
              error={!!errors.confirmationPassword?.message}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='confirmationPassword'
              name='confirmationPassword'
              type={showConfirmationPassword ? 'text' : 'password'}
              placeholder='Confirme sua Senha'
              value={confirmationPassword}
              onChange={({ target }) => setConfirmationPassword(target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Exibir senha escrita'
                      onClick={handleClickShowConfirmationPassword}
                      edge='end'
                    >
                      {showConfirmationPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <PasswordRules />
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
