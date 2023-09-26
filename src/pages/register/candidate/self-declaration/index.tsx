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
              <MenuItem value='homem'>Homem</MenuItem>
              <MenuItem value='mulher'>Mulher</MenuItem>
              <MenuItem value='não-binário'>não-binário</MenuItem>
              <MenuItem value='travesti'>travesti</MenuItem>
              <MenuItem value='transgênero'>transgênero</MenuItem>
              <MenuItem value='não declarado'>Prefiro não declarar</MenuItem>
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
              <MenuItem value='heterossexual'>Heterossexual</MenuItem>
              <MenuItem value='homossexual'>Homossexual</MenuItem>
              <MenuItem value='bissexual'>Bissexual</MenuItem>
              <MenuItem value='pansexual'>Pansexual</MenuItem>
              <MenuItem value='assexual'>Assexual</MenuItem>
              <MenuItem value='demissexual'>Demissexual</MenuItem>
              <MenuItem value='não declarado'>Prefiro não declarar</MenuItem>
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
              <MenuItem value='árabes'>Árabes</MenuItem>
              <MenuItem value='japoneses'>Japoneses</MenuItem>
              <MenuItem value='europeus'>Europeus</MenuItem>
              <MenuItem value='indígenas'>Indígenas</MenuItem>
              <MenuItem value='africanos'>Africanos</MenuItem>
              <MenuItem value='latino-americanos'>Latino-americanos</MenuItem>
              <MenuItem value='judeos'>Judeus</MenuItem>
              <MenuItem value='ciganos'>Ciganos</MenuItem>
              <MenuItem value='coreanos'>Coreanos</MenuItem>
              <MenuItem value='não declarado'>Prefiro não declarar</MenuItem>
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
              <MenuItem value='classe alta'>Classe Alta</MenuItem>
              <MenuItem value='classe média'>Classe Média</MenuItem>
              <MenuItem value='classe baixa'>Classe Baixa</MenuItem>
              <MenuItem value='não declarado'>Prefiro não declarar</MenuItem>
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
              <MenuItem value='nenhuma'>Nenhuma</MenuItem>
              <MenuItem value='visual'>Visual</MenuItem>
              <MenuItem value='auditiva'>Auditiva</MenuItem>
              <MenuItem value='física'>Física</MenuItem>
              <MenuItem value='intelectual'>Intelectual</MenuItem>
              <MenuItem value='múltipla'>Múltipla</MenuItem>
              <MenuItem value='autismo'>Autismo</MenuItem>
              <MenuItem value='raras e crônicas'>
                Doenças Raras e Crônicas
              </MenuItem>
              <MenuItem value='não declarado'>Prefiro não declarar</MenuItem>
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
