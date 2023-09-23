import { ReactElement, useContext, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const PersonalInformation = () => {
  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)
  const router = useRouter()

  const [name, setName] = useState('')
  const [socialName, setSocialName] = useState('')
  const [birthday, setBirthday] = useState('')

  const handleClickContinue = () => {
    setCandidateData({
      nome: name,
      nomeSocial: socialName,
      dataNascimento: birthday,
    })

    router.push(PublicRoutes.CANDIDATE_SELF_DECLARATION)
  }

  return (
    <Container>
      <MobileStepper
        steps={stepsLength}
        activeStep={activeStep}
        handleClickBack={handleClickBackStep}
        handleClickNext={handleClickNextStep}
      />
      <Box mt={3}>
        <Typography variant='h6' fontWeight='400'>
          Informações pessoais
        </Typography>
        <Typography variant='subtitle1'>
          Preencha com as suas informações
        </Typography>
        <Box mt={2}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='name'
            type='text'
            placeholder='Nome'
            onChange={({ target }) => setName(target.value)}
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='social-name'
            type='text'
            placeholder='Nome social'
            onChange={({ target }) => setSocialName(target.value)}
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='birthday'
            type='date'
            placeholder='Data de nascimento'
            onChange={({ target }) => setBirthday(target.value)}
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
      </Box>
    </Container>
  )
}

PersonalInformation.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default PersonalInformation
