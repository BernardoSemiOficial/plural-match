import { ReactElement, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import { Default } from '@/layouts/Default'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import Link from 'next/link'

import * as S from './self-declaration.css'

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
          Autodeclaração
        </Typography>
        <Typography variant='subtitle1'>Como você se autodeclara?</Typography>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='sexual-gender'
          label='Gênero sexual'
          sx={{ marginTop: '24px' }}
        >
          <MenuItem value='Gênero sexual'>Gênero sexual</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='sexual-orientation'
          label='Orientação sexual'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Orientação sexual'>Orientação sexual</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='ethnicity'
          label='Etnia'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Etnia'>Etnia</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='social-class'
          label='Classe social'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Classe social'>Classe social</MenuItem>
        </TextField>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='deficiency'
          label='Deficiência'
          sx={{ marginTop: '16px' }}
        >
          <MenuItem value='Deficiência'>Deficiência</MenuItem>
        </TextField>
        <Link href='professional-information'>
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
