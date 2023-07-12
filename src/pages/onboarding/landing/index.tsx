import { ReactElement, ReactNode } from 'react'

import { Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import Image from 'next/image'
import { Default } from '../../../layouts/Default'
import svg from '../../../assets/svg/onboarding-landing.svg'

import * as S from './landing.css'

const OnboardingLanding = () => {
  return (
    <div className={S.container}>
      <div>
        <h1 className={S.title}>Qual o seu objetivo?</h1>
        <p className={S.description}>
          Está procurando uma <b>vaga de trabalho</b> ou profissionais para a
          sua empresa?
        </p>
      </div>

      <Image src={svg} />

      <div className={S.containerButton}>
        <Button
          className={S.buttonPrimary}
          startIcon={<BusinessIcon />}
          variant='outlined'
        >
          Profissionais
        </Button>
        <Button startIcon={<PersonIcon />} variant='contained'>
          Vaga de trabalho
        </Button>
      </div>
    </div>
  )
}

OnboardingLanding.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default OnboardingLanding
