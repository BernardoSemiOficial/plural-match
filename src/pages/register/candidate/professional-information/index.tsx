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
import { MOCK_HIRING_MODEL } from '@/mocks/hiringModel'
import { MOCK_JOB_MODEL } from '@/mocks/jobModel'
import { MOCK_SALARY_RANGE } from '@/mocks/salaryRange'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type FormProfessionalInformation = {
  profession: string
  workingModel: string
  hiringModel: string
  salaryClaim: number
  about: string
  professionalExperience: string
  academicExperience: string
  dreamsGoals: string
}

const schema = yup
  .object({
    profession: yup.string().required('A profissão é obrigatória'),
    workingModel: yup.string().required('O modelo de trabalho é obrigatório'),
    hiringModel: yup.string().required('O modelo de contratação é obrigatório'),
    salaryClaim: yup.number().required('A pretensão salarial é obrigatória'),
    about: yup.string().required('O sobre você é obrigatório'),
    professionalExperience: yup
      .string()
      .required('A experiência profissional é obrigatória'),
    academicExperience: yup
      .string()
      .required('A experiência acadêmica é obrigatória'),
    dreamsGoals: yup.string().required('O sonhos e objetivos é obrigatório'),
  })
  .required()

const ProfessionalInformation = () => {
  const {
    candidate,
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)
  const router = useRouter()

  const [profession, setProfession] = useState(candidate.profissao)
  const [workingModel, setWorkingModel] = useState(candidate.modeloTrabalho)
  const [hiringModel, setHiringModel] = useState(candidate.modeloContratacao)
  const [salaryClaim, setSalaryClaim] = useState(candidate.pretensaoSalarial)
  const [about, setAbout] = useState(candidate.sobre)
  const [professionalExperience, setProfessionalExperience] = useState(
    candidate.experienciaProfissional
  )
  const [academicExperience, setAcademicExperience] = useState(
    candidate.experienciaAcademica
  )
  const [dreamsGoals, setDreamsGoals] = useState(candidate.sonhosObjetivos)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormProfessionalInformation>({
    resolver: yupResolver(schema),
  })

  const handleSubmitForm: SubmitHandler<FormProfessionalInformation> = data => {
    setCandidateData({
      profissao: data.profession,
      modeloTrabalho: data.workingModel,
      modeloContratacao: data.hiringModel,
      pretensaoSalarial: data.salaryClaim,
      sobre: data.about,
      experienciaProfissional: data.professionalExperience,
      experienciaAcademica: data.academicExperience,
      sonhosObjetivos: data.dreamsGoals,
    })

    router.push(PublicRoutes.CANDIDATE_SOFT_SKILLS)
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
          Informações profissionais
        </Typography>
        <Typography variant='subtitle1'>
          Preencha com as suas informacões
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Box mt={3}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='profession'
              label='Profissão'
              inputProps={register('profession')}
              error={!!errors.profession?.message}
              helperText={errors.profession?.message}
              value={profession}
              onChange={({ target }) => setProfession(target.value)}
            >
              <MenuItem value='desempregado'>Desempregado</MenuItem>
              <MenuItem value='Médico'>Médico</MenuItem>
              <MenuItem value='Engenheiro'>Engenheiro</MenuItem>
              <MenuItem value='Professor'>Professor</MenuItem>
              <MenuItem value='Advogado'>Advogado</MenuItem>
              <MenuItem value='Contador'>Contador</MenuItem>
              <MenuItem value='Administrador'>Administrador</MenuItem>
              <MenuItem value='Psicólogo'>Psicólogo</MenuItem>
              <MenuItem value='Arquiteto'>Arquiteto</MenuItem>
              <MenuItem value='Farmacêutico'>Farmacêutico</MenuItem>
              <MenuItem value='Dentista'>Dentista</MenuItem>
              <MenuItem value='Técnico em Enfermagem'>
                Técnico em Enfermagem
              </MenuItem>
              <MenuItem value='Eletricista'>Eletricista</MenuItem>
              <MenuItem value='Mecânico'>Mecânico</MenuItem>
              <MenuItem value='Jornalista'>Jornalista</MenuItem>
              <MenuItem value='Programador de Computador'>
                Programador de Computador
              </MenuItem>
              <MenuItem value='Designer Gráfico'>Designer Gráfico</MenuItem>
              <MenuItem value='Chef de Cozinha'>Chef de Cozinha</MenuItem>
              <MenuItem value='Policial'>Policial</MenuItem>
              <MenuItem value='Bombeiro'>Bombeiro</MenuItem>
              <MenuItem value='Enfermeiro'>Enfermeiro</MenuItem>
              <MenuItem value='Fisioterapeuta'>Fisioterapeuta</MenuItem>
              <MenuItem value='Economista'>Economista</MenuItem>
              <MenuItem value='Geólogo'>Geólogo</MenuItem>
              <MenuItem value='Publicitário'>Publicitário</MenuItem>
              <MenuItem value='Veterinário'>Veterinário</MenuItem>
              <MenuItem value='Astrônomo'>Astrônomo</MenuItem>
              <MenuItem value='Biólogo'>Biólogo</MenuItem>
              <MenuItem value='Artista Plástico'>Artista Plástico</MenuItem>
              <MenuItem value='Cientista de Dados'>Cientista de Dados</MenuItem>
              <MenuItem value='Contador Público'>Contador Público</MenuItem>
              <MenuItem value='Terapeuta Ocupacional'>
                Terapeuta Ocupacional
              </MenuItem>
              <MenuItem value='Sociólogo'>Sociólogo</MenuItem>
              <MenuItem value='Técnico em Radiologia'>
                Técnico em Radiologia
              </MenuItem>
              <MenuItem value='Pedreiro'>Pedreiro</MenuItem>
              <MenuItem value='Mecânico de Aeronaves'>
                Mecânico de Aeronaves
              </MenuItem>
              <MenuItem value='Cabeleireiro'>Cabeleireiro</MenuItem>
              <MenuItem value='Engenheiro Civil'>Engenheiro Civil</MenuItem>
              <MenuItem value='Músico'>Músico</MenuItem>
              <MenuItem value='Técnico em Informática'>
                Técnico em Informática
              </MenuItem>
              <MenuItem value='Enfermeiro Obstetra'>
                Enfermeiro Obstetra
              </MenuItem>
              <MenuItem value='Psiquiatra'>Psiquiatra</MenuItem>
              <MenuItem value='Consultor Financeiro'>
                Consultor Financeiro
              </MenuItem>
              <MenuItem value='Agrônomo'>Agrônomo</MenuItem>
              <MenuItem value='Jardineiro'>Jardineiro</MenuItem>
              <MenuItem value='Escritor'>Escritor</MenuItem>
              <MenuItem value='Cineasta'>Cineasta</MenuItem>
              <MenuItem value='Psicopedagogo'>Psicopedagogo</MenuItem>
              <MenuItem value='Político'>Político</MenuItem>
              <MenuItem value='Nutricionista'>Nutricionista</MenuItem>
              <MenuItem value='Técnico em Segurança do Trabalho'>
                Técnico em Segurança do Trabalho
              </MenuItem>
            </TextField>
          </Box>
          <Box mt={1}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='working-model'
              label='Modelo de trabalho'
              inputProps={register('workingModel')}
              error={!!errors.workingModel?.message}
              helperText={errors.workingModel?.message}
              value={workingModel}
              onChange={({ target }) => setWorkingModel(target.value)}
            >
              {MOCK_JOB_MODEL.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={1}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='hiring-model'
              label='Modelo de contratação'
              inputProps={register('hiringModel')}
              error={!!errors.hiringModel?.message}
              helperText={errors.hiringModel?.message}
              value={hiringModel}
              onChange={({ target }) => setHiringModel(target.value)}
            >
              {MOCK_HIRING_MODEL.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={1}>
            <TextField
              select
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='salary-claim'
              name='salary-claim'
              type='number'
              label='Pretensão salarial'
              inputProps={register('salaryClaim')}
              error={!!errors.salaryClaim?.message}
              helperText={errors.salaryClaim?.message}
              value={salaryClaim}
              onChange={({ target }) => setSalaryClaim(Number(target.value))}
            >
              {MOCK_SALARY_RANGE.map(salaryRange => (
                <MenuItem key={salaryRange} value={salaryRange}>
                  {salaryRange}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={1}>
            <TextField
              {...register('about')}
              helperText={errors.about?.message}
              error={!!errors.about?.message}
              inputProps={{
                maxLength: 1000,
              }}
              multiline
              rows={3}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='about'
              type='text'
              placeholder='Sobre você'
              value={about}
              onChange={({ target }) => setAbout(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              {...register('professionalExperience')}
              helperText={errors.professionalExperience?.message}
              error={!!errors.professionalExperience?.message}
              inputProps={{
                maxLength: 1000,
              }}
              multiline
              rows={3}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='professionalExperience'
              type='text'
              placeholder='Experiência Profissional'
              value={professionalExperience}
              onChange={({ target }) => setProfessionalExperience(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              {...register('academicExperience')}
              helperText={errors.academicExperience?.message}
              error={!!errors.academicExperience?.message}
              inputProps={{
                maxLength: 1000,
              }}
              multiline
              rows={3}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='academicExperience'
              type='text'
              placeholder='Experiência Acadêmica'
              value={academicExperience}
              onChange={({ target }) => setAcademicExperience(target.value)}
            />
          </Box>
          <Box mt={1}>
            <TextField
              {...register('dreamsGoals')}
              helperText={errors.dreamsGoals?.message}
              error={!!errors.dreamsGoals?.message}
              multiline
              rows={3}
              inputProps={{
                maxLength: 1000,
              }}
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='dreamsGoals'
              type='text'
              placeholder='Sonhos e Objetivos'
              value={dreamsGoals}
              onChange={({ target }) => setDreamsGoals(target.value)}
            />
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

ProfessionalInformation.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCandidateProvider>
      <Default>{page}</Default>
    </RegisterCandidateProvider>
  )
}

export default ProfessionalInformation
