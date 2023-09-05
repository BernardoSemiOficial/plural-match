import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, TextField, Typography } from '@mui/material'
import Link from 'next/link'

const RegisterJob = () => {
  return (
    <Container>
      <Typography variant='h6' fontWeight='600'>
        Edite o seu perfil
      </Typography>
      <Typography variant='subtitle1'>
        Mantenha o seu perfil sempre atualizado para encontrar as melhores vagas
      </Typography>
      <Box mt={3}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='title'
          type='text'
          placeholder='Nome'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='description'
          type='text'
          placeholder='Data de nascimento'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='company'
          type='text'
          placeholder='Localidade'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='working-model'
          type='text'
          placeholder='Modelo de trabalho'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='hiring-model'
          type='text'
          placeholder='Modelo de contratação'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='salary-range'
          type='text'
          placeholder='Faixa salarial'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='vulnerability-situation'
          type='text'
          placeholder='Situação de vulnerabilidade'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          multiline
          rows={5}
          size='small'
          variant='outlined'
          margin='dense'
          id='vulnerability-situation'
          type='text'
          placeholder='Sobre'
        />
      </Box>

      <Box mt={4}>
        <Link href={'#'}>
          <Button fullWidth variant='contained' size='medium' color='success'>
            Salvar alterações
          </Button>
        </Link>
      </Box>
    </Container>
  )
}

RegisterJob.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default RegisterJob
