import { ReactElement } from 'react'

import RegistrationSuccess from '@/assets/svg/success-registration.svg'
import { PublicRoutes } from '@/enums/routes'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'

import { Default } from '../../../layouts/Default'

const CreatedAccount = () => {
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
