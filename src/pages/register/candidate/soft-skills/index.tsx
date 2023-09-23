import { ReactElement, useContext, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { softSkillsAvailable } from '@/mocks/skills'
import { Box, Button, Chip, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const SoftSkills = () => {
  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)

  const router = useRouter()
  const [softSkills, setSoftSkills] = useState([])

  const handleClickContinue = () => {
    setCandidateData({
      softSkills,
    })

    router.push(PublicRoutes.CANDIDATE_HARD_SKILLS)
  }

  console.log(candidate)

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
          {softSkillsAvailable.map(softSkill => (
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

SoftSkills.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default SoftSkills
