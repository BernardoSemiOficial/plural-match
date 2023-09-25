import { yupResolver } from '@hookform/resolvers/yup'
import { ReactElement } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { stagesSelectionProcess } from '@/enums/selection-process'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { MOCK_HIRING_MODEL } from '@/mocks/hiringModel'
import { MOCK_JOB_MODEL } from '@/mocks/jobModel'
import { MOCK_SALARY_RANGE } from '@/mocks/salaryRange'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

type Inputs = {
  titulo_vaga: string
  descricao: string
  modelo_trabalho: string
  modelo_contratacao: string
  faixa_salarial: string
  situacao_vulnerabilidade: string
}

const schema = yup
  .object({
    titulo_vaga: yup
      .string()
      .required('O nome da vaga é obrigatório')
      .max(50, 'O máximo de caracteres é 50'),
    descricao: yup
      .string()
      .max(320, 'O máximo de caracteres é 320')
      .required('A descrição é obrigatória'),
    modelo_trabalho: yup
      .string()
      .required('O modelo de trabalho é obrigatório'),
    modelo_contratacao: yup
      .string()
      .required('O modelo de contratação é obrigatório'),
    faixa_salarial: yup.string().required('A faixa salarial é obrigatória'),
    situacao_vulnerabilidade: yup
      .string()
      .required('A vulnerabilidade social é obrigatória'),
  })
  .required()

const RegisterJob = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log('data', data)
  }

  return (
    <Container>
      <Typography variant='h6' fontWeight='400'>
        Crie sua vaga
      </Typography>
      <Typography variant='subtitle1'>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry&apos;s standard dummy text
        ever since the 1500s.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={3}>
          <TextField
            {...register('titulo_vaga')}
            helperText={errors.titulo_vaga?.message}
            error={!!errors.titulo_vaga?.message}
            inputProps={{
              maxLength: 50,
            }}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='titulo_vaga'
            type='text'
            placeholder='Título da vaga'
          />
        </Box>
        <Box mt={1}>
          <TextField
            {...register('descricao')}
            helperText={errors.descricao?.message}
            error={!!errors.descricao?.message}
            inputProps={{
              maxLength: 320,
            }}
            multiline
            fullWidth
            rows={5}
            size='small'
            variant='outlined'
            margin='dense'
            id='descricao'
            type='text'
            placeholder='Descrição'
          />
        </Box>
        <Box mt={1}>
          <TextField
            select
            fullWidth
            label='Modelo de trabalho'
            defaultValue=''
            inputProps={register('modelo_trabalho', {
              required: 'Selecione um modelo de trabalho',
            })}
            error={!!errors.modelo_trabalho?.message}
            helperText={errors.modelo_trabalho?.message}
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
            label='Modelo de contratação'
            defaultValue=''
            inputProps={register('modelo_contratacao', {
              required: 'Selecione um modelo de contratação',
            })}
            error={!!errors.modelo_contratacao?.message}
            helperText={errors.modelo_contratacao?.message}
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
            label='Faixa salarial'
            defaultValue=''
            inputProps={register('faixa_salarial', {
              required: 'Selecione uma faixa salarial',
            })}
            error={!!errors.faixa_salarial?.message}
            helperText={errors.faixa_salarial?.message}
          >
            {MOCK_SALARY_RANGE.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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

        <Button
          fullWidth
          color='success'
          variant='contained'
          size='medium'
          type='submit'
        >
          SALVAR
        </Button>
      </form>

      <Box my={3}>
        <Divider />
      </Box>

      <Stack
        direction='row'
        spacing={2}
        justifyContent='space-between'
        alignItems='center'
      >
        <Typography variant='h6' fontWeight='400'>
          Etapas do processo seletivo
        </Typography>
        <AddCircleOutlinedIcon color='primary' fontSize={'large'} />
      </Stack>

      <Stack
        mt={3}
        direction='row'
        spacing={5}
        justifyContent='space-between'
        alignItems={'flex-start'}
      >
        <TextField
          select
          fullWidth
          size='small'
          label='Selecione o tipo'
          helperText='Selecione qual a etapa'
        >
          {stagesSelectionProcess.map(stage => (
            <MenuItem key={stage.id} value={stage.id}>
              {stage.label}
            </MenuItem>
          ))}
        </TextField>
        <DeleteOutlineOutlinedIcon fontSize={'medium'} />
      </Stack>
      <Box mt={1}>
        <TextField
          fullWidth
          multiline
          rows={3}
          size='small'
          variant='outlined'
          margin='dense'
          id='description'
          type='text'
          placeholder='Descrição'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          multiline
          rows={3}
          size='small'
          variant='outlined'
          margin='dense'
          id='links'
          type='text'
          placeholder='Links úteis'
        />
      </Box>
      <Box mt={3}>
        <Button
          fullWidth
          color='success'
          variant='contained'
          size='medium'
          type='submit'
        >
          SALVAR
        </Button>
      </Box>
    </Container>
  )
}

RegisterJob.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default RegisterJob
