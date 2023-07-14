import { ReactElement } from 'react'
import { Button, Typography } from '@mui/material'
import Image from 'next/image'

import { Default } from '../../layouts/Default'
import svg from '../../assets/svg/success-registration.svg'

import * as S from './status.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

const OnboardingStatus = () => {
  const route = useRouter()
  const nextRoute: any = route.query?.['next-route']

  const routes: any = {
    'company-home': '/company/home',
    'candidate-home': '/candiate/home',
  }

  return (
    <div className={S.container}>
      <div className={S.content}>
        <Image src={svg} />
        <Typography mt={4} variant='h6'>
          Conta criada com sucesso!
        </Typography>
        <Typography mt={2} textAlign={'center'} width={'70%'}>
          Agora você já pode acessar sua conta com <b>e-mail e senha</b>.
        </Typography>
      </div>

      <Link href={{ pathname: `${routes[nextRoute]}` }}>
        <Button variant='contained'>Fazer logins</Button>
      </Link>
    </div>
  )
}

OnboardingStatus.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default OnboardingStatus
