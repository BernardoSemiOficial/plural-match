import { ReactElement, useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { BRASIL_STATES } from '@/mocks/brasilStates'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type FormPersonalInformation = {
  name: string
  socialName?: string
  birthday: string
  city: string
  state: string
}

const schema = yup
  .object({
    name: yup
      .string()
      .required('O nome é obrigatório')
      .max(200, 'O máximo de caracteres é 200'),
    socialName: yup.string().max(200, 'O máximo de caracteres é 200'),
    birthday: yup.string().required('A data de nascimento é obrigatória'),
    city: yup.string().required('A cidade é obrigatória'),
    state: yup.string().required('O estado é obrigatório'),
  })
  .required()

const PersonalInformation = () => {
  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)
  const router = useRouter()

  const [name, setName] = useState(candidate.nome)
  const [socialName, setSocialName] = useState(candidate.nomeSocial)
  const [birthday, setBirthday] = useState(
    candidate.dataNascimento ?? '2000-01-01'
  )
  const [city, setCity] = useState(candidate.cidade)
  const [state, setState] = useState(candidate.estado)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormPersonalInformation>({
    resolver: yupResolver(schema),
  })

  const handleSubmitForm: SubmitHandler<FormPersonalInformation> = data => {
    setCandidateData({
      nome: data.name,
      nomeSocial: data.socialName ?? '',
      dataNascimento: data.birthday,
      cidade: data.city,
      estado: data.state,
    })

    router.push(PublicRoutes.CANDIDATE_SELF_DECLARATION)
  }

  return (
    <Container>
      <MobileStepper
        steps={stepsLength}
        activeStep={activeStep}
        handleClickBack={handleClickBackStep}
        handleClickNext={handleClickNextStep}
      />
      <Box mt={3}>
        <Typography variant='h6' fontWeight='400'>
          Informações pessoais
        </Typography>
        <Typography variant='subtitle1'>
          Preencha com as suas informações
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box mt={2}>
            <TextField
              {...register('name')}
              helperText={errors.name?.message}
              error={!!errors.name?.message}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='name'
              type='text'
              placeholder='Nome'
              label='Nome'
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              {...register('socialName')}
              helperText={errors.socialName?.message}
              error={!!errors.socialName?.message}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='social-name'
              type='text'
              placeholder='Nome social'
              label='Nome social'
              value={socialName}
              onChange={({ target }) => setSocialName(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              {...register('birthday')}
              helperText={errors.birthday?.message}
              error={!!errors.birthday?.message}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='birthday'
              type='date'
              label='Data de nascimento'
              value={birthday}
              onChange={({ target }) => setBirthday(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              {...register('city')}
              helperText={errors.city?.message}
              error={!!errors.city?.message}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='city'
              type='text'
              placeholder='Cidade'
              label='Cidade'
              value={city}
              onChange={({ target }) => setCity(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='state'
              type='text'
              placeholder='Estado'
              label='Estado'
              inputProps={register('state')}
              error={!!errors.state?.message}
              helperText={errors.state?.message}
              value={state}
              onChange={({ target }) => setState(target.value)}
            >
              {BRASIL_STATES.map(state => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={4}>
            <Button type='submit' fullWidth variant='contained' size='medium'>
              Continuar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  )
}

PersonalInformation.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default PersonalInformation
