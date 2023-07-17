import { ReactElement, useContext } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  RegisterCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const SelfDeclaration = () => {
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
          Autodeclaração
        </Typography>
        <Typography variant='subtitle1'>Como você se autodeclara?</Typography>
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='sexual-gender'
            label='Gênero sexual'
            defaultValue='Gênero sexual'
          >
            <MenuItem value='Gênero sexual'>Gênero sexual</MenuItem>
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='sexual-orientation'
            label='Orientação sexual'
            defaultValue='Orientação sexual'
          >
            <MenuItem value='Orientação sexual'>Orientação sexual</MenuItem>
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='ethnicity'
            label='Etnia'
            defaultValue='Etnia'
          >
            <MenuItem value='Etnia'>Etnia</MenuItem>
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='social-class'
            label='Classe social'
            defaultValue='Classe social'
          >
            <MenuItem value='Classe social'>Classe social</MenuItem>
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='deficiency'
            label='Deficiência'
            defaultValue='Deficiência'
          >
            <MenuItem value='Deficiência'>Deficiência</MenuItem>
          </TextField>
        </Box>
        <Box mt={4}>
          <Link href={PublicRoutes.CANDIDATE_PROFESSIONAL_INFORMATION}>
            <Button fullWidth variant='contained' size='medium'>
              Continuar
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

SelfDeclaration.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default SelfDeclaration
