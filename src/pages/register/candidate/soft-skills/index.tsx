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
import { Alert, Box, Button, Chip, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const softSkillsWithState = softSkillsAvailable.reduce(
  (softSkillsWithState, softSkill) => {
    softSkillsWithState.push({
      isSelected: false,
      label: softSkill,
    })
    return softSkillsWithState
  },
  [] as { isSelected: boolean; label: string }[]
)

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

  const [softSkills, setSoftSkills] = useState(() => {
    return softSkillsWithState.map(softSkill => {
      if (candidate.softSkills?.includes(softSkill.label))
        softSkill.isSelected = true

      return softSkill
    })
  })

  const setSoftSkillsSelected = softSkills.filter(
    softSkill => softSkill.isSelected
  )
  const setSoftSkillsSelectedFormatted = setSoftSkillsSelected.map(
    softSkill => softSkill.label
  )

  const handleClickContinue = () => {
    setCandidateData({
      softSkills: setSoftSkillsSelectedFormatted,
    })

    router.push(PublicRoutes.CANDIDATE_HARD_SKILLS)
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
              variant={softSkill.isSelected ? 'filled' : 'outlined'}
              color='primary'
              label={softSkill.label}
              onClick={() =>
                setSoftSkills(skills => {
                  return skills.map(skill => {
                    if (skill.label === softSkill.label)
                      skill.isSelected = !skill.isSelected
                    return skill
                  })
                })
              }
            />
          ))}
        </Box>
        {setSoftSkillsSelected.length >= 5 && (
          <Box mt={3}>
            <Alert severity='error'>O limite é de 5 soft-skills</Alert>
          </Box>
        )}
        {setSoftSkillsSelected.length === 0 && (
          <Box mt={3}>
            <Alert severity='info'>As soft-skills são obrigatórias</Alert>
          </Box>
        )}
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
