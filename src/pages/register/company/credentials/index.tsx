import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { PasswordRules } from '@/components/PasswordRules'
import {
  RegisterCompanyProvider,
  registerCompanyContext,
} from '@/context/RegisterCompanyContext'
import { passwordRules } from '@/enums/passwords'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { createNumberID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Company } from '@/model/company'
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

type Inputs = {
  email: string
  senha: string
  confirmacaoSenha: string
}

const schema = yup
  .object({
    email: yup
      .string()
      .email('Digite um email válido')
      .required('O email é obrigatório')
      .max(200, 'O máximo de caracteres é 200'),
    senha: yup
      .string()
      .matches(passwordRules, { message: 'Crie uma senha mais segura' })
      .required('A senha é obrigatória'),
    confirmacaoSenha: yup
      .string()
      .oneOf([yup.ref('senha')], 'As duas senhas devem corresponder')
      .required(),
  })
  .required()

const CompanyCredentials = () => {
  const router = useRouter()
  const { company } = useContext(registerCompanyContext)

  const [password, setPassword] = useState('')
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
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data: Company) =>
      api.post(Services.CADASTRA_EMPRESA, data),
    onSuccess() {
      router.push({
        pathname: PublicRoutes.REGISTER_CREATED_ACCOUNT,
        query: { [QueryKeys.USER_TYPE]: QueryValues.USER_TYPE_COMPANY },
      })
    },
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    const model = {
      ...company,
      ...data,
      id: createNumberID(),
    }
    mutate(model)
  }

  return (
    <Container>
      {error && (
        <Box my={3}>
          <Alert severity='error'>Não foi possível realizar o cadastro</Alert>
        </Box>
      )}
      <Typography variant='h6' fontWeight='400'>
        Para criar a conta da empresa, digite as credenciais
      </Typography>
      <Typography variant='subtitle1'>
        Preencha com o email da empresa e uma senha.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={4}>
          <TextField
            {...register('email')}
            helperText={errors.email?.message}
            error={!!errors.email?.message}
            inputProps={{
              maxLength: 200,
            }}
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
            {...register('senha')}
            helperText={errors.senha?.message}
            error={!!errors.senha?.message}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='senha'
            placeholder='Senha'
            type={showPassword ? 'text' : 'password'}
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
        <Box mt={1}>
          <TextField
            {...register('confirmacaoSenha')}
            helperText={errors.confirmacaoSenha?.message}
            error={!!errors.confirmacaoSenha?.message}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='confirmacaoSenha'
            placeholder='Confirme sua Senha'
            value={confirmationPassword}
            onChange={({ target }) => setConfirmationPassword(target.value)}
            type={showConfirmationPassword ? 'text' : 'password'}
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
          <Button fullWidth variant='contained' size='medium' type='submit'>
            {isLoading ? (
              <CircularProgress color='inherit' size={20} />
            ) : (
              'Criar conta'
            )}
          </Button>
        </Box>
      </form>
    </Container>
  )
}

CompanyCredentials.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCompanyProvider>
      <Default>{page}</Default>
    </RegisterCompanyProvider>
  )
}

export default CompanyCredentials
