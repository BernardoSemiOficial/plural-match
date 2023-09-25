import { ReactElement, useState } from 'react'

import { LocalStorageKeys } from '@/enums/local-storage'
import { PrivateRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Candidate } from '@/model/candidate'
import { api } from '@/services/api'
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

const Login = () => {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [_, setLocalStorageValue] = useLocalStorage(
    LocalStorageKeys.CANDIDATE,
    {}
  )

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () =>
      (
        await api.get<{ id: number; tipo: string; user: Candidate }>(
          Services.LOGIN,
          {
            params: {
              email,
              senha: password,
            },
          }
        )
      ).data,
    onSuccess(data) {
      setLocalStorageValue({ ...data.user, tipo: data.tipo })
      if (data.tipo === 'recrutador' || data.tipo === 'candidato')
        router.push(PrivateRoutes.PEOPLES)

      if (data.tipo === 'empresa') router.push(PrivateRoutes.COMPANY)
    },
  })

  const handleClickLogin = () => {
    mutate()
  }

  return (
    <Container>
      <Box>
        <Typography variant='h5' fontWeight='bold'>
          Informe seu e-mail e senha de cadastro para acessar sua conta.
        </Typography>
        {error && (
          <Box mt={3}>
            <Alert severity='error'>
              Não foi possível realizar o login no momento
            </Alert>
          </Box>
        )}
        <Box mt={3}>
          <TextField
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
        <Box mt={1}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='password'
            type='password'
            placeholder='Senha'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
      </Box>
      <Box mt={4}>
        <Button
          fullWidth
          variant='contained'
          size='medium'
          onClick={handleClickLogin}
        >
          {isLoading ? (
            <CircularProgress color='inherit' size={20} />
          ) : (
            'Acessar conta'
          )}
        </Button>
      </Box>
    </Container>
  )
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Login
