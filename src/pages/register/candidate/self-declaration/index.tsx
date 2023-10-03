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
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { MOCK_GENDERS } from '@/mocks/gender'
import { MOCK_SEXUAL_ORIENTATION } from '@/mocks/sexualOrientation'
import { MOCK_ETHNICITY } from '@/mocks/ethnicity'
import { MOCK_SOCIAL_CLASS } from '@/mocks/socialClass'
import { MOCK_DEFICIENCIES } from '@/mocks/deficiencies'

type FormSelfDeclaration = {
  sexualGender: string
  sexualOrientation: string
  ethnicity: string
  socialClass: string
  deficiency: string
}

const schema = yup
  .object({
    sexualGender: yup.string().required('O gênero sexual é obrigatório'),
    sexualOrientation: yup
      .string()
      .required('A orientação sexual é obrigatória'),
    ethnicity: yup.string().required('A etinia é obrigatória'),
    socialClass: yup.string().required('A classe social é obrigatória'),
    deficiency: yup.string().required('A deficiência é obrigatória'),
  })
  .required()

const SelfDeclaration = () => {
  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)
  const router = useRouter()

  const [sexualGender, setSexualGender] = useState(candidate.sexo)
  const [sexualOrientation, setSexualOrientation] = useState(
    candidate.orientacaoSexual
  )
  const [ethnicity, setEthnicity] = useState(candidate.etnia)
  const [socialClass, setSocialClass] = useState(candidate.classeSocial)
  const [deficiency, setDeficiency] = useState(candidate.deficiencia)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSelfDeclaration>({
    resolver: yupResolver(schema),
  })

  const handleSubmitForm: SubmitHandler<FormSelfDeclaration> = data => {
    setCandidateData({
      sexo: data.sexualGender,
      orientacaoSexual: data.sexualOrientation,
      etnia: data.ethnicity,
      classeSocial: data.socialClass,
      deficiencia: data.deficiency,
    })

    router.push(PublicRoutes.CANDIDATE_PROFESSIONAL_INFORMATION)
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
          Autodeclaração
        </Typography>
        <Typography variant='subtitle1'>Como você se autodeclara?</Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box mt={3}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='sexual-gender'
              label='Gênero'
              inputProps={register('sexualGender')}
              error={!!errors.sexualGender?.message}
              helperText={errors.sexualGender?.message}
              value={sexualGender}
              onChange={({ target }) => setSexualGender(target.value)}
            >
              {MOCK_GENDERS?.map(gender => (
                <MenuItem key={`menu-item-gender-${gender}`} value={gender}>
                  {gender}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='sexual-orientation'
              label='Orientação sexual'
              inputProps={register('sexualOrientation')}
              error={!!errors.sexualOrientation?.message}
              helperText={errors.sexualOrientation?.message}
              value={sexualOrientation}
              onChange={({ target }) => setSexualOrientation(target.value)}
            >
              {MOCK_SEXUAL_ORIENTATION?.map(orientation => (
                <MenuItem
                  key={`menu-item-orientation-${orientation}`}
                  value={orientation}
                >
                  {orientation}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='ethnicity'
              label='Etnia'
              inputProps={register('ethnicity')}
              error={!!errors.ethnicity?.message}
              helperText={errors.ethnicity?.message}
              value={ethnicity}
              onChange={({ target }) => setEthnicity(target.value)}
            >
              {MOCK_ETHNICITY?.map(item => (
                <MenuItem key={`menu-item-ethnicity-${item}`} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='social-class'
              label='Classe social'
              inputProps={register('socialClass')}
              error={!!errors.socialClass?.message}
              helperText={errors.socialClass?.message}
              value={socialClass}
              onChange={({ target }) => setSocialClass(target.value)}
            >
              {MOCK_SOCIAL_CLASS?.map(item => (
                <MenuItem key={`menu-item-social-class-${item}`} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={2}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='deficiency'
              label='Deficiência'
              inputProps={register('deficiency')}
              error={!!errors.deficiency?.message}
              helperText={errors.deficiency?.message}
              value={deficiency}
              onChange={({ target }) => setDeficiency(target.value)}
            >
              {MOCK_DEFICIENCIES?.map(item => (
                <MenuItem key={`menu-item-deficiencies-${item}`} value={item}>
                  {item}
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

SelfDeclaration.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default SelfDeclaration
