import { ReactElement, useContext } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const ProfessionalInformation = () => {
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
          Informações profissionais
        </Typography>
        <Typography variant='subtitle1'>
          Preencha com as suas informacões
        </Typography>
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='profession'
            label='Profissão'
          >
            <MenuItem value='Profissão'>Profissão</MenuItem>
          </TextField>
        </Box>
        <Box mt={1}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='working-model'
            label='Modelo de trabalho'
          >
            <MenuItem value='Modelo de trabalho'>Modelo de trabalho</MenuItem>
          </TextField>
        </Box>
        <Box mt={1}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='hiring-model'
            label='Modelo de contratação'
          >
            <MenuItem value='Modelo de contratação'>
              Modelo de contratação
            </MenuItem>
          </TextField>
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='deficiency'
            name='salary-claim'
            type='number'
            placeholder='Pretensão salarial'
          />
        </Box>
        <Box mt={4}>
          <Link href={PublicRoutes.CANDIDATE_SOFT_SKILLS}>
            <Button fullWidth variant='contained' size='medium'>
              Continuar
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

ProfessionalInformation.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default ProfessionalInformation
