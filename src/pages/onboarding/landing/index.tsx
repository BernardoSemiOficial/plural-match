import { ReactElement, ReactNode } from 'react'

import { Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'

import { Default } from '../../../layouts/Default'
import { Svg } from '@/assets/svg'

interface OnboardingLandingProps {
  children: ReactNode
  environment: string
}

const OnboardingLanding = ({ environment }: OnboardingLandingProps) => {
  return (
    <div>
      <h1>Qual o seu objetivo?</h1>
      <p>
        Está procurando uma <b>vaga de trabalho</b> ou profissionais para a sua
        empresa?
      </p>

      <img src={Svg.OnboardingLanding} />

      <Button startIcon={<BusinessIcon />} variant='outlined'>
        Profissionais
      </Button>
      <Button startIcon={<PersonIcon />} variant='contained'>
        Vaga de trabalho
      </Button>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    },
  }
}

OnboardingLanding.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default OnboardingLanding
