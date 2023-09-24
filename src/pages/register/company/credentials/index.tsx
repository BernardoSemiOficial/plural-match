import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import {
  Company,
  RegisterCompanyProvider,
  registerCompanyContext,
} from '@/context/RegisterCompanyContext'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { createNumberID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'

type Inputs = {
  email: string
  senha: string
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
      .required('A senha é obrigatória')
      .min(6, 'O mínimo de caracteres é 6')
      .max(20, 'O máximo de caracteres é 20'),
  })
  .required()

const CompanyCredentials = () => {
  const router = useRouter()
  const { company } = useContext(registerCompanyContext)

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
    console.log('model', model)
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
            inputProps={{
              maxLength: 20,
              minLength: 6,
            }}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='senha'
            type='password'
            placeholder='Senha'
          />
        </Box>

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
