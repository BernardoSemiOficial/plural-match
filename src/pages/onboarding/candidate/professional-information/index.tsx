import { ReactElement, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import { Default } from '@/layouts/Default'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import Link from 'next/link'

import * as S from './professional-information.css'

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
          Informações profissionais
        </Typography>
        <Typography variant='subtitle1'>
          Preencha com as suas informacões
        </Typography>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='profession'
          label='Profissão'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Profissão'>Profissão</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='working-model'
          label='Modelo de trabalho'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Modelo de trabalho'>Modelo de trabalho</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='hiring-model'
          label='Modelo de contratação'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Modelo de contratação'>
            Modelo de contratação
          </MenuItem>
        </TextField>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='deficiency'
          name='salary-claim'
          type='number'
          placeholder='Pretensão salarial'
          sx={{ marginTop: '16px' }}
        />
        <Link href='soft-skills'>
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
