import { ReactElement } from 'react'

import RegistrationSuccess from '@/assets/svg/success-registration.svg'
import { QueryKeys, QueryValues } from '@/enums/querys'
import { PrivateRoutes, PublicRoutes } from '@/enums/routes'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Default } from '../../../layouts/Default'

const CreatedAccount = () => {
  const router = useRouter()
  const routerQuery = router?.query

  const goToPage =
    routerQuery?.[QueryKeys.USER_TYPE] === QueryValues.USER_TYPE_COMPANY
      ? PrivateRoutes.COMPANY
      : PrivateRoutes.CANDIDATE

  return (
    <Container>
      <Box textAlign='center'>
        <Image
          src={RegistrationSuccess}
          title='Imagem indicando que deu tudo certo o cadastro'
          alt='Imagem indicando que deu tudo certo o cadastro'
        />
        <Typography variant='h6' mt={4}>
          Conta criada com sucesso!
        </Typography>
        <Typography mt={2}>
          Agora você já pode acessar sua conta com <b>e-mail e senha</b>.
        </Typography>
        <Box mt={4}>
          <Link href={PublicRoutes.LOGIN}>
            <Button fullWidth variant='contained' size='medium'>
              Fazer login
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  )
}

CreatedAccount.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default CreatedAccount
