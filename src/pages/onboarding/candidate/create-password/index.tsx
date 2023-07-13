import { ReactElement, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import { Default } from '@/layouts/Default'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

import * as S from './create-password.css'

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
          Para finalizar o seu cadastro, digite a sua senha
        </Typography>
        <Typography variant='subtitle1'>
          Ela deve ter no mínimo 8 caracteres, sendo pelo menos uma letra
          maiúscula, uma letra minúscula e um numeral.
        </Typography>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='password'
          name='password'
          type='password'
          placeholder='Senha'
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
