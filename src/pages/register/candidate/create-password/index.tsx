import { ReactElement, useContext, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
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

const CreatePassword = () => {
  const router = useRouter()

  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)

  const [password, setPassword] = useState(candidate.senha)

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async () =>
      await api.post(Services.CADASTRA_CANDIDATO, {
        ...candidate,
        senha: password,
      }),
    onSuccess() {
      router.push(PublicRoutes.REGISTER_CREATED_ACCOUNT, {
        query: { [QueryKeys.USER_TYPE]: QueryValues.USER_TYPE_CANDIDATE },
      })
    },
  })

  const handleClickContinue = () => {
    setCandidateData({ senha: password })
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
          <Alert severity='error'>O campo da senha deve ser preenchido</Alert>
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
        <Box mt={2}>
          <TextField
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
          <Button
            fullWidth
            variant='contained'
            size='medium'
            onClick={handleClickContinue}
          >
            {isLoading ? (
              <CircularProgress color='inherit' size={20} />
            ) : (
              'Continuar'
            )}
          </Button>
        </Box>
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
