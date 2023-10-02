import { ReactElement, useContext, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import recruiterAdd from '@/assets/svg/add-recruiter.svg'
import { Modal } from '@/components/Modal'
import { PasswordRules } from '@/components/PasswordRules'
import { loggedContext } from '@/context/LoggedContext'
import { passwordRules } from '@/enums/passwords'
import { Services } from '@/enums/services'
import { createNumberID } from '@/helpers/createUUID'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Default, queryClient } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Recruiter } from '@/model/recruiter'
import { api } from '@/services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { Add, Close, Visibility, VisibilityOff } from '@mui/icons-material'
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import * as yup from 'yup'

type Inputs = {
  nome: string
  email: string
  senha: string
  confirmacaoSenha: string
}

interface MutateModel extends Inputs {
  id: number
  empresaId: number
}

const schema = yup
  .object({
    nome: yup
      .string()
      .required('O nome é obrigatório')
      .max(200, 'O máximo de caracteres é 200'),
    email: yup
      .string()
      .email('Digite um email válido')
      .required('O email é obrigatório')
      .max(200, 'O máximo de caracteres é 200'),
    senha: yup
      .string()
      .matches(passwordRules, { message: 'Crie uma senha mais segura' })
      .required('A senha é obrigatória'),
    confirmacaoSenha: yup
      .string()
      .oneOf([yup.ref('senha')], 'As duas senhas devem corresponder')
      .required(),
  })
  .required()

const Company = () => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowConfirmationPassword = () =>
    setShowConfirmationPassword(show => !show)

  const {
    data: recruiters,
    isLoading,
    error,
  } = useQuery({
    queryKey: [Services.LISTA_RECRUTADORES],
    queryFn: async () => (await api.get(Services.LISTA_RECRUTADORES)).data,
  })

  const { user } = useContext(loggedContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const {
    mutate,
    isLoading: mutateIsLoading,
    error: mutateError,
  } = useMutation({
    mutationFn: async (data: MutateModel) =>
      api.post(Services.CADASTRA_RECRUTADOR, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [Services.LISTA_RECRUTADORES] })
      handleClickClose()
      reset()
    },
  })

  const filteredRecruiters = useMemo(() => {
    return recruiters?.filter(
      (recruiter: Recruiter) => recruiter?.empresaId === user?.id
    )
  }, [recruiters, user?.id])

  const onSubmit: SubmitHandler<Inputs> = data => {
    if (!user?.id) {
      return
    }

    const model: MutateModel = {
      ...data,
      id: createNumberID(),
      empresaId: user?.id,
    }
    mutate(model)
  }

  const isEmptyRecruiters = filteredRecruiters?.length === 0

  return (
    <Container>
      <Typography variant='h6'>Bem vindo, {user?.nome}!</Typography>
      <Typography variant='subtitle1' mt={2}>
        Esses são os recrutadores que você tem cadastrado. Aqui você pode criar,
        editar e excluir acessos de maneira bem fácil.
      </Typography>
      <Typography variant='h6' mt={4}>
        Recrutadores
      </Typography>

      <Modal maxWidth='xs' fullWidth open={open} onClose={handleClickClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p={4} borderRadius={4}>
            {mutateError && (
              <Box my={3}>
                <Alert severity='error'>
                  Não foi possível adicionar o recrutador
                </Alert>
              </Box>
            )}
            <Typography variant='h6' fontWeight='400'>
              Adicionar um recrutador
            </Typography>
            <Typography variant='subtitle1'>
              Para criar a sua conta <b>insira o email e a senha</b> do
              recrutador
            </Typography>
            <Box mt={3}>
              <TextField
                {...register('nome')}
                helperText={errors.nome?.message}
                error={!!errors.nome?.message}
                inputProps={{
                  maxLength: 200,
                }}
                fullWidth
                size='small'
                variant='outlined'
                margin='dense'
                id='nome'
                type='text'
                placeholder='Nome do recurtador'
              />
            </Box>
            <Box mt={1}>
              <TextField
                {...register('email')}
                helperText={errors.email?.message}
                error={!!errors.email?.message}
                inputProps={{
                  maxLength: 200,
                }}
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
                {...register('senha')}
                helperText={errors.senha?.message}
                error={!!errors.senha?.message}
                fullWidth
                size='small'
                variant='outlined'
                margin='dense'
                id='senha'
                placeholder='Senha'
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Exibir senha escrita'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mt={1}>
              <TextField
                {...register('confirmacaoSenha')}
                helperText={errors.confirmacaoSenha?.message}
                error={!!errors.confirmacaoSenha?.message}
                fullWidth
                size='small'
                variant='outlined'
                margin='dense'
                id='confirmacaoSenha'
                placeholder='Confirme sua Senha'
                type={showConfirmationPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='Exibir senha escrita'
                        onClick={handleClickShowConfirmationPassword}
                        edge='end'
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <PasswordRules />
            <Box mt={3}>
              <Button fullWidth variant='contained' size='medium' type='submit'>
                {mutateIsLoading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : (
                  'Adicionar'
                )}
              </Button>
            </Box>
          </Box>
        </form>
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

      {isLoading ? (
        <Box
          mt={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <CircularProgress size={40} />
          <Typography variant='subtitle1'>Carregando recrutadores</Typography>
        </Box>
      ) : (
        <>
          {filteredRecruiters?.map((recruiter: any) => (
            <Box mt={2} key={recruiter.id}>
              <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
                <Avatar sx={{ bgcolor: '#BA2649' }}>
                  {firstLetterOfFirstAndLastName(recruiter.nome)}
                </Avatar>
                <Stack ml={2} flex={1}>
                  <Typography variant='subtitle1'>{recruiter.nome}</Typography>
                  <Typography variant='body1'>{recruiter.email}</Typography>
                </Stack>
                <Close />
              </Box>
              <Box my={2}>
                <Divider />
              </Box>
            </Box>
          ))}
        </>
      )}
    </Container>
  )
}

Company.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Company
