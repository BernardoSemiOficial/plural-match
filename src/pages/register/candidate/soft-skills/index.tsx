import { ReactElement, useContext } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { softSkills } from '@/mocks/skills'
import { Box, Button, Chip, Typography } from '@mui/material'
import Link from 'next/link'

const SoftSkills = () => {
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
          Quais as suas habilidades e competências profissionais?
        </Typography>
        <Typography variant='subtitle1'>Selecione até 5 soft skills</Typography>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {softSkills.map(softSkill => (
            <Chip
              key={createUUID()}
              clickable
              variant='outlined'
              color='primary'
              label={softSkill}
            />
          ))}
        </Box>
        <Box mt={4}>
          <Link href={PublicRoutes.CANDIDATE_HARD_SKILLS}>
            <Button fullWidth variant='contained' size='medium'>
              Continuar
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

SoftSkills.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default SoftSkills
