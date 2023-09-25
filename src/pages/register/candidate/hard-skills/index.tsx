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
import { hardSkillsAvailable } from '@/mocks/skills'
import { Alert, Box, Button, Chip, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const hardSkillsWithState = hardSkillsAvailable.reduce(
  (hardSkillsWithState, hardSkill) => {
    hardSkillsWithState.push({
      isSelected: false,
      label: hardSkill,
    })
    return hardSkillsWithState
  },
  [] as { isSelected: boolean; label: string }[]
)

const HardSkills = () => {
  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)

  const router = useRouter()

  const [hardSkills, setHardSkills] = useState(() => {
    return hardSkillsWithState.map(hardSkill => {
      if (candidate.hardSkills?.includes(hardSkill.label))
        hardSkill.isSelected = true

      return hardSkill
    })
  })

  const setSoftSkillsSelected = hardSkills.filter(
    hardSkill => hardSkill.isSelected
  )
  const setSoftSkillsSelectedFormatted = setSoftSkillsSelected.map(
    hardSkill => hardSkill.label
  )

  const handleClickContinue = () => {
    if (setSoftSkillsSelected.length >= 5 || setSoftSkillsSelected.length === 0)
      return

    setCandidateData({
      hardSkills: setSoftSkillsSelectedFormatted,
    })

    router.push(PublicRoutes.CANDIDATE_CREATE_PASSWORD)
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
          Quais os seus conhecimentos técnicos?
        </Typography>
        <Typography variant='subtitle1'>Selecione até 5 hard skills</Typography>
        <Box
          mt={2}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {hardSkills.map(hardSkill => (
            <Chip
              key={createUUID()}
              clickable
              variant={hardSkill.isSelected ? 'filled' : 'outlined'}
              color='primary'
              label={hardSkill.label}
              onClick={() =>
                setHardSkills(skills => {
                  return skills.map(skill => {
                    if (skill.label === hardSkill.label)
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
            <Alert severity='error'>O limite é de 5 hard-skills</Alert>
          </Box>
        )}
        {setSoftSkillsSelected.length === 0 && (
          <Box mt={3}>
            <Alert severity='info'>As hard-skills são obrigatórias</Alert>
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

HardSkills.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default HardSkills
