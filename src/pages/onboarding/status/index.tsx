import { ReactElement, ReactNode } from 'react'

import { Button, Typography } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import PersonIcon from '@mui/icons-material/Person'
import Image from 'next/image'
import { Default } from '../../../layouts/Default'
import svg from '../../../assets/svg/success-registration.svg'

import * as S from './status.css'
import Link from 'next/link'

const OnboardingStatus = () => {
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

      <div className={S.containerButton}>
        <Link href={''}>
          <Button className={S.buttonPrimary} variant='contained'>
            Fazer login
          </Button>
        </Link>
      </div>
    </div>
  )
}

OnboardingStatus.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default OnboardingStatus
