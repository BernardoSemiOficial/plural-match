import { ReactElement, useContext, useState } from 'react'

import { MobileStepper } from '@/components/MobileStepper'
import {
  registerCandidateContext,
  RegisterCandidateProvider,
} from '@/context/RegisterCandidateContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'

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

  const [profession, setProfession] = useState('')
  const [workingModel, setWorkingModel] = useState('')
  const [hiringModel, setHiringModel] = useState('')
  const [salaryClaim, setSalaryClaim] = useState('')

  const handleClickContinue = () => {
    setCandidateData({
      profissao: profession,
      modeloTrabalho: workingModel,
      modeloContratacao: hiringModel,
      pretensaoSalarial: Number(salaryClaim),
    })

    router.push(PublicRoutes.CANDIDATE_SOFT_SKILLS)
  }

  console.log(candidate)

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
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='profession'
            label='Profissão'
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
            <MenuItem value='Enfermeiro Obstetra'>Enfermeiro Obstetra</MenuItem>
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
            onChange={({ target }) => setWorkingModel(target.value)}
          >
            <MenuItem value='presencial'>Presencial</MenuItem>
            <MenuItem value='home office'>Home Office</MenuItem>
            <MenuItem value='híbrido'>Hibrido</MenuItem>
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
            onChange={({ target }) => setHiringModel(target.value)}
          >
            <MenuItem value='CLT'>CLT</MenuItem>
            <MenuItem value='PJ'>PJ</MenuItem>
          </TextField>
        </Box>
        <Box mt={1}>
          <TextField
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='salary-claim'
            name='salary-claim'
            type='number'
            placeholder='Pretensão salarial'
            onChange={({ target }) => setSalaryClaim(target.value)}
          />
        </Box>
        <Box mt={4}>
          <Button
            fullWidth
            variant='contained'
            size='medium'
            onClick={handleClickContinue}
          >
            Continuar
          </Button>
        </Box>
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
