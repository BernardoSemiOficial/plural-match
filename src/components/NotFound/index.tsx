import { FiAlertCircle } from 'react-icons/fi'

import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export const NotFound = () => {
  const router = useRouter()

  const handleGoToLastPage = () => {
    router.back()
  }

  return (
    <Container>
      <Box mt={3} textAlign='center'>
        <FiAlertCircle size={100} />
        <Typography variant='h1' fontWeight='bold'>
          404
        </Typography>
        <Typography variant='h6' fontWeight='bold'>
          Página não encontrada
        </Typography>
      </Box>
      <Box mt={3} textAlign='center'>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='medium'
          onClick={handleGoToLastPage}
        >
          Voltar para a página anterior
        </Button>
      </Box>
    </Container>
  )
}
