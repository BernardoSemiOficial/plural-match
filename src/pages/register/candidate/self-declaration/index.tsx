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
import Link from 'next/link'
import { useRouter } from 'next/router'

const SelfDeclaration = () => {
  const {
    activeStep,
    stepsLength,
    setCandidateData,
    handleClickBackStep,
    handleClickNextStep,
  } = useContext(registerCandidateContext)
  const router = useRouter()

  const [sexualGender, setSexualGender] = useState('')
  const [sexualOrientation, setSexualOrientation] = useState('')
  const [ethnicity, setEthnicity] = useState('')
  const [socialClass, setSocialClass] = useState('')
  const [deficiency, setDeficiency] = useState('')

  const handleClickContinue = () => {
    setCandidateData({
      sexo: sexualGender,
      orientacaoSexual: sexualOrientation,
      etnia: ethnicity,
      classeSocial: socialClass,
      deficiencia: deficiency,
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
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='sexual-gender'
            label='Gênero sexual'
            defaultValue='Gênero sexual'
            onChange={({ target }) => setSexualGender(target.value)}
          >
            <MenuItem value='homem'>Homem</MenuItem>
            <MenuItem value='mulher'>Mulher</MenuItem>
            <MenuItem value='não-binário'>não-binário</MenuItem>
            <MenuItem value='travesti'>travesti</MenuItem>
            <MenuItem value='transgênero'>transgênero</MenuItem>
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
            defaultValue='Orientação sexual'
            onChange={({ target }) => setSexualOrientation(target.value)}
          >
            <MenuItem value='heterossexual'>Heterossexual</MenuItem>
            <MenuItem value='homossexual'>Homossexual</MenuItem>
            <MenuItem value='bissexual'>Bissexual</MenuItem>
            <MenuItem value='pansexual'>Pansexual</MenuItem>
            <MenuItem value='assexual'>Assexual</MenuItem>
            <MenuItem value='demissexual'>Demissexual</MenuItem>
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
            defaultValue='Etnia'
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
            defaultValue='Classe social'
            onChange={({ target }) => setSocialClass(target.value)}
          >
            <MenuItem value='classe alta'>Classe Alta</MenuItem>
            <MenuItem value='classe média'>Classe Média</MenuItem>
            <MenuItem value='classe trabalhadora'>Classe Trabalhadora</MenuItem>
            <MenuItem value='classe baixa'>Classe Baixa</MenuItem>
            <MenuItem value='classe pobre'>Classe Pobre</MenuItem>
            <MenuItem value='classe em vulnerabilidade social'>
              Classe em Vulnerabilidade Social
            </MenuItem>
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
            defaultValue='Deficiência'
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
          </TextField>
        </Box>
        <Box mt={4}>
          <Link href={PublicRoutes.CANDIDATE_PROFESSIONAL_INFORMATION}>
            <Button
              fullWidth
              variant='contained'
              size='medium'
              onClick={handleClickContinue}
            >
              Continuar
            </Button>
          </Link>
        </Box>
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
