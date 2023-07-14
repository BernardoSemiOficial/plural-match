import React, { ReactElement } from 'react'

import { Default } from '@/layouts/Default'
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

import * as S from './home.css'
import Image from 'next/image'
import svg from '../../../assets/svg/add-recruiter.svg'
import { Add, Close } from '@mui/icons-material'

const CompanyPersonalInformation = () => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const recruiters = [
    {
      name: 'Thiago Silva',
      email: 'thiago.silva@gmail.com',
    },
    {
      name: 'Roberto Marcos',
      email: 'roberto.marcos@gmail.com',
    },
  ]

  const firstLetters = (name: string) => {
    if (!name) {
      return name
    }

    const spplited = name.split(' ')
    let letters = spplited[0][0]
    const secondLetter = spplited?.[1]?.[0]

    if (secondLetter) {
      letters += secondLetter
    }
    return letters
  }

  return (
    <div className={S.container}>
      <Typography variant='h6'>Bem vindo, [Empresa]!</Typography>
      <Typography variant='subtitle1' mt={2}>
        Esses são os recrutadores que você tem cadastrado. Aqui você pode criar,
        editar e excluir acessos de maneira bem fácil.
      </Typography>

      <Typography variant='h6' mt={4}>
        Recrutadores
      </Typography>

      {!recruiters?.length && (
        <>
          <Typography
            variant='body1'
            textAlign={'center'}
            alignSelf={'center'}
            mt={6}
            mb={4}
            maxWidth={'160px'}
          >
            Cadastre um recrutador para começar
          </Typography>
          <Image src={svg} />
        </>
      )}

      {recruiters?.map(recruiter => (
        <Box mt={2}>
          <Box flexDir4ection={'row'} display={'flex'} alignItems={'center'}>
            <Avatar sx={{ bgcolor: '#BA2649' }}>
              {firstLetters(recruiter.name)}
            </Avatar>
            <Stack ml={2} flex={1}>
              <Typography variant='subtitle1'>{recruiter.name}</Typography>
              <Typography variant='body1'>{recruiter.email}</Typography>
            </Stack>
            <Close />
          </Box>
          <Divider style={{ marginTop: '16px' }} />
        </Box>
      ))}

      <Modal
        className={S.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box className={S.containerModal}>
          <Typography variant='h6' sx={{ fontWeight: 400 }}>
            Adicionar um recrutador
          </Typography>
          <Typography variant='subtitle1'>
            Para criar a sua conta <b>insira o email e a senha</b> do recrutador
          </Typography>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='email'
            type='email'
            placeholder='E-mail'
            sx={{ marginTop: '24px' }}
          />
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='senha'
            type='password'
            placeholder='senha'
            sx={{ marginTop: '8px' }}
          />
          <Button
            fullWidth
            variant='contained'
            size='medium'
            sx={{ marginTop: '36px' }}
          >
            Adicionar
          </Button>
        </Box>
      </Modal>

      <Fab
        onClick={handleOpen}
        className={S.buttonAdd}
        color='primary'
        aria-label='add'
        size='small'
      >
        <Add />
      </Fab>
    </div>
  )
}

CompanyPersonalInformation.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default CompanyPersonalInformation
