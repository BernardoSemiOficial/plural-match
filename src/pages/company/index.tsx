import { ReactElement, useState } from 'react'

import recruiterAdd from '@/assets/svg/add-recruiter.svg'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Add, Close } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import Image from 'next/image'

const recruiters = [
  {
    id: 1,
    name: 'Thiago Silva',
    email: 'thiago.silva@gmail.com',
  },
  {
    id: 2,
    name: 'Roberto Marcos',
    email: 'roberto.marcos@gmail.com',
  },
]

const Company = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  const isEmptyRecruiters = recruiters?.length === 0

  return (
    <Container>
      <Typography variant='h6'>Bem vindo, [Empresa]!</Typography>
      <Typography variant='subtitle1' mt={2}>
        Esses são os recrutadores que você tem cadastrado. Aqui você pode criar,
        editar e excluir acessos de maneira bem fácil.
      </Typography>
      <Typography variant='h6' mt={4}>
        Recrutadores
      </Typography>
      <Modal open={open} onClose={handleClickClose}>
        <Box
          p={4}
          borderRadius={4}
          position='absolute'
          top='50%'
          left='50%'
          bgcolor='#ffffff'
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant='h6' fontWeight='400'>
            Adicionar um recrutador
          </Typography>
          <Typography variant='subtitle1'>
            Para criar a sua conta <b>insira o email e a senha</b> do recrutador
          </Typography>
          <Box mt={3}>
            <TextField
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='email'
              type='email'
              placeholder='E-mail'
            />
          </Box>
          <Box mt={1}>
            <TextField
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='password'
              type='password'
              placeholder='senha'
            />
          </Box>
          <Box mt={3}>
            <Button fullWidth variant='contained' size='medium'>
              Adicionar
            </Button>
          </Box>
        </Box>
      </Modal>
      <Fab
        size='medium'
        color='primary'
        aria-label='adicionar recrutadores'
        onClick={handleClickOpen}
        sx={{ position: 'absolute', bottom: 24, right: 24 }}
      >
        <Add />
      </Fab>

      {isEmptyRecruiters && (
        <Box textAlign='center'>
          <Typography variant='body1' mt={6} mb={4}>
            Cadastre um recrutador para começar
          </Typography>
          <Image src={recruiterAdd} title='' alt='' />
        </Box>
      )}

      {recruiters?.map(recruiter => (
        <Box mt={2} key={recruiter.id}>
          <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
            <Avatar sx={{ bgcolor: '#BA2649' }}>
              {firstLetterOfFirstAndLastName(recruiter.name)}
            </Avatar>
            <Stack ml={2} flex={1}>
              <Typography variant='subtitle1'>{recruiter.name}</Typography>
              <Typography variant='body1'>{recruiter.email}</Typography>
            </Stack>
            <Close />
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
        </Box>
      ))}
    </Container>
  )
}

Company.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Company
