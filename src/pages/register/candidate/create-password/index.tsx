import { ReactElement, useContext } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  RegisterCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const CreatePassword = () => {
  const { activeStep, stepsLength, handleClickBackStep, handleClickNextStep } =
    useContext(RegisterCandidateContext)

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
          />
        </Box>
        <Box mt={4}>
          <Link
            href={{
              pathname: PublicRoutes.REGISTER_CREATED_ACCOUNT,
              query: { [QueryKeys.USER_TYPE]: QueryValues.USER_TYPE_CANDIDATE },
            }}
          >
            <Button fullWidth variant='contained' size='medium'>
              Continuar
            </Button>
          </Link>
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
