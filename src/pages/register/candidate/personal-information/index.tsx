import { ReactElement, useContext } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const PersonalInformation = () => {
  const { activeStep, stepsLength, handleClickBackStep, handleClickNextStep } =
    useContext(registerCandidateContext)

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
          />
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='birthdate'
            type='date'
            placeholder='Data de nascimento'
          />
        </Box>
        <Box mt={4}>
          <Link href={PublicRoutes.CANDIDATE_SELF_DECLARATION}>
            <Button fullWidth variant='contained' size='medium'>
              Continuar
            </Button>
          </Link>
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
