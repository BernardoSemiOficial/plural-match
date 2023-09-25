import React, {
  ReactElement,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form'

import { loggedContext } from '@/context/LoggedContext'
import { stagesSelectionProcess } from '@/enums/selection-process'
import { Services } from '@/enums/services'
import { createNumberID } from '@/helpers/createUUID'
import { Default, queryClient } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { MOCK_HIRING_MODEL } from '@/mocks/hiringModel'
import { MOCK_JOB_MODEL } from '@/mocks/jobModel'
import { MOCK_SALARY_RANGE } from '@/mocks/salaryRange'
import { MOCK_SOCIAL_VULNERABILITIES } from '@/mocks/socialVulnerabilities'
import { StatusStep } from '@/model/step'
import { api } from '@/services/api'
import { yupResolver } from '@hookform/resolvers/yup'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import type { SelectChangeEvent } from '@mui/material'
import {
  Box,
  Button,
  Checkbox,
  Divider,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type Inputs = {
  titulo_vaga: string
  descricao: string
  modelo_trabalho: string
  modelo_contratacao: string
  faixa_salarial: string
}

interface MutateModel extends Inputs {
  id_vaga: number
  id_recrutador: number
  etapas_processo_seletivo: {
    id: number
    name: string
    descricao_etapa_processo_seletivo: string
    link_util?: string
  }[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const schema = yup
  .object({
    titulo_vaga: yup
      .string()
      .required('O nome da vaga é obrigatório')
      .max(50, 'O máximo de caracteres é 50'),
    descricao: yup
      .string()
      .max(1300, 'O máximo de caracteres é 1300')
      .required('A descrição é obrigatória'),
    modelo_trabalho: yup
      .string()
      .required('O modelo de trabalho é obrigatório'),
    modelo_contratacao: yup
      .string()
      .required('O modelo de contratação é obrigatório'),
    faixa_salarial: yup.string().required('A faixa salarial é obrigatória'),
  })
  .required()

function setKeyStepField({
  id,
  field,
}: {
  id: number
  field: 'name' | 'descricao_etapa_processo_seletivo' | 'link_util'
}) {
  return `${id}-${field}`
}

function createSchemaStep({ id }: { id: number }) {
  console.log('createSchemaStep', id)
  const schemaStep = yup
    .object({
      [setKeyStepField({ id, field: 'name' })]: yup
        .string()
        .required('O nome do processo é obrigatório'),
      [setKeyStepField({ id, field: 'descricao_etapa_processo_seletivo' })]: yup
        .string()
        .max(320, 'O máximo de caracteres é 320')
        .required('A descrição é obrigatória'),
      [setKeyStepField({ id, field: 'link_util' })]: yup
        .string()
        .max(320, 'O máximo de caracteres é 320'),
    })
    .required()
  return schemaStep
}

function merge(...schemas: any) {
  const [first, ...rest] = schemas

  const merged = rest.reduce(
    (mergedSchemas: any, schema: any) => mergedSchemas.concat(schema),
    first
  )

  return merged
}

const Step = ({
  step,
  onDelete,
  register,
  errors,
}: {
  step: number
  onDelete({ id }: { id: number }): void
  register: UseFormRegister<any>
  errors: FieldErrors<any>
}) => {
  console.log('step <=======', step)
  const keyFieldName = setKeyStepField({ id: step, field: 'name' })
  const keyFieldDescription = setKeyStepField({
    id: step,
    field: 'descricao_etapa_processo_seletivo',
  })
  const keyFieldLinks = setKeyStepField({ id: step, field: 'link_util' })

  console.log('keyFieldName', keyFieldName)
  console.log('keyFieldDescription', keyFieldDescription)
  console.log('keyFieldLinks', keyFieldLinks)
  return (
    <>
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
          label='Selecione o processo'
          defaultValue=''
          inputProps={register(keyFieldName, {
            required: 'Selecione um processo',
          })}
          error={!!errors?.[keyFieldName]?.message}
          helperText={errors?.[keyFieldName]?.message}
          id={keyFieldName}
        >
          {stagesSelectionProcess.map(stage => (
            <MenuItem key={stage.id} value={stage.label}>
              {stage.label}
            </MenuItem>
          ))}
        </TextField>

        <DeleteOutlineOutlinedIcon
          onClick={() => onDelete({ id: step })}
          fontSize={'medium'}
        />
      </Stack>
      <Box mt={1}>
        <TextField
          {...register(keyFieldDescription)}
          helperText={errors?.[keyFieldDescription]?.message}
          error={!!errors?.[keyFieldDescription]?.message}
          inputProps={{
            maxLength: 320,
          }}
          multiline
          fullWidth
          rows={5}
          size='small'
          variant='outlined'
          margin='dense'
          id={keyFieldDescription}
          type='text'
          placeholder='Descrição'
          label='Descrição'
        />
      </Box>
      <Box mt={1}>
        <TextField
          {...register(keyFieldLinks)}
          helperText={errors?.[keyFieldLinks]?.message}
          error={!!errors?.[keyFieldLinks]?.message}
          inputProps={{
            maxLength: 320,
          }}
          fullWidth
          multiline
          rows={3}
          size='small'
          variant='outlined'
          margin='dense'
          id={keyFieldLinks}
          type='text'
          placeholder='Links úteis'
          label='Links úteis'
        />
      </Box>
    </>
  )
}

const RegisterJob = () => {
  const router = useRouter()
  const { user } = useContext(loggedContext)

  const [steps, setSteps] = useState<number[]>([1])
  console.log('steps', steps)
  const [socialVulnerabilities, setSocialVulnerabilities] = React.useState<
    string[]
  >([])

  const stepsSchemas = useMemo(() => {
    const schemas = steps?.map(id => createSchemaStep({ id })) || []
    return schemas
  }, [steps])

  const schemas = useMemo(() => {
    const merged = merge(schema, ...stepsSchemas)
    return merged
  }, [stepsSchemas])

  console.log('schemas', schemas)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schemas),
  })

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (data: MutateModel) =>
      api.post(Services.CADASTRA_VAGA, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [Services.LISTA_CANDIDATOS] })
      router.back()
    },
  })

  const onSubmit: SubmitHandler<Inputs> = (data: any) => {
    console.log('data', data)
    console.log('socialVulnerabilities', socialVulnerabilities)

    const stepsModel = steps?.map(step => {
      const keyFieldName = setKeyStepField({ id: step, field: 'name' })
      const keyFieldDescription = setKeyStepField({
        id: step,
        field: 'descricao_etapa_processo_seletivo',
      })
      const keyFieldLinks = setKeyStepField({ id: step, field: 'link_util' })

      return {
        id: createNumberID(),
        name: data?.[keyFieldName],
        descricao_etapa_processo_seletivo: data?.[keyFieldDescription],
        link_util: data?.[keyFieldLinks] || '',
        status: StatusStep.NAO_INICIADO,
      }
    })

    console.log('stepsModel', stepsModel)

    const model: any = {
      id_vaga: createNumberID(),
      id_recrutador: user?.id,

      titulo_vaga: data.titulo_vaga,
      descricao: data.descricao,
      modelo_trabalho: data.modelo_trabalho,
      modelo_contratacao: data.modelo_contratacao,
      faixa_salarial: data.faixa_salarial,
      situacao_vulnerabilidade: socialVulnerabilities?.length
        ? socialVulnerabilities.join(', ')
        : '',

      etapas_processo_seletivo: stepsModel,
      // ...data,
    }
    console.log('model', model)
    mutate(model)
  }

  const addStep = useCallback(() => {
    if (steps?.length >= 20) {
      return
    }

    setSteps(oldState => [...oldState, oldState[oldState.length - 1] + 1])
  }, [steps?.length])

  const removeStep = useCallback(
    ({ id }: { id: number }) => {
      if (steps?.length <= 1) {
        return
      }
      setSteps(oldState => oldState.filter(step => step !== id))
    },
    [steps]
  )

  const handleChange = (
    event: SelectChangeEvent<typeof socialVulnerabilities>
  ) => {
    const {
      target: { value },
    } = event
    setSocialVulnerabilities(
      typeof value === 'string' ? value.split(',') : value
    )
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
            label='Título da vaga'
          />
        </Box>
        <Box mt={3}>
          <TextField
            {...register('descricao')}
            helperText={errors.descricao?.message}
            error={!!errors.descricao?.message}
            inputProps={{
              maxLength: 1300,
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
            label='Descrição'
          />
        </Box>
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
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
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
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
        <Box mt={3}>
          <TextField
            select
            fullWidth
            size='small'
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
        <Box mt={3}>
          <InputLabel id='multiple-checkbox-label-vulnerabilities'>
            Situação de vulnerabilidade
          </InputLabel>
          <Select
            label='Situação de vulnerabilidade'
            labelId='multiple-checkbox-label-vulnerabilities'
            id='multiple-checkbox-vulnerabilities'
            multiple
            fullWidth
            size='small'
            value={socialVulnerabilities}
            onChange={handleChange}
            input={<OutlinedInput label='Situação de vulnerabilidade' />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {MOCK_SOCIAL_VULNERABILITIES.map(name => (
              <MenuItem key={name.value} value={name.value}>
                <Checkbox
                  checked={socialVulnerabilities.indexOf(name.value) > -1}
                />
                <ListItemText primary={name.label} />
              </MenuItem>
            ))}
          </Select>
        </Box>

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
          <AddCircleOutlinedIcon
            onClick={addStep}
            color='primary'
            fontSize={'large'}
          />
        </Stack>

        {steps?.map((step, idx) => (
          <Box key={`step-${step}`}>
            <Step
              step={step}
              onDelete={removeStep}
              register={register}
              errors={errors}
            />
            {idx !== steps.length - 1 && (
              <Box my={3}>
                <Divider />
              </Box>
            )}
          </Box>
        ))}

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
      </form>
    </Container>
  )
}

RegisterJob.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default RegisterJob
