import { ReactElement, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Box, Button, Chip, Typography } from '@mui/material'
import Link from 'next/link'

import * as S from './hard-skills.css'

const hardSkillsAvailable = [
  'Oracle',
  'JavaScript',
  'React JS',
  'Java',
  'PHP',
  'Vue JS',
  'Angular JS',
  'Python',
  'C#',
]

const SelfDeclaration = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleClickNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleClickBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <section className={S.container}>
      <MobileStepper
        steps={6}
        activeStep={activeStep}
        handleClickBack={handleClickBack}
        handleClickNext={handleClickNext}
      />
      <Box sx={{ marginTop: '24px' }}>
        <Typography variant='h6' sx={{ fontWeight: 400 }}>
          Quais os seus conhecimentos técnicos?
        </Typography>
        <Typography variant='subtitle1'>Selecione até 5 hard skills</Typography>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {hardSkillsAvailable.map(softSkill => (
            <Chip
              key={createUUID()}
              clickable
              variant='outlined'
              color='primary'
              label={softSkill}
            />
          ))}
        </Box>
        <Link href='create-password'>
          <Button
            fullWidth
            variant='contained'
            size='medium'
            sx={{ marginTop: '36px' }}
          >
            Continuar
          </Button>
        </Link>
      </Box>
    </section>
  )
}

SelfDeclaration.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default SelfDeclaration
