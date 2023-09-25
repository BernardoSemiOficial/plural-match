import { ReactElement, useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  RegisterCompanyProvider,
  registerCompanyContext,
} from '@/context/RegisterCompanyContext'
import { PublicRoutes } from '@/enums/routes'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { MOCK_COMPANY_ACTIVITIES } from '@/mocks/companyActivities'
import { toPattern } from '@/utils/masks'
import { isValidCNPJ } from '@brazilian-utils/brazilian-utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import * as yup from 'yup'

type Inputs = {
  nome: string
  descricao: string
  cnpj: string
  setor: string
  localizacao: string
  fundacao: number
  site: string
}

const schema = yup
  .object({
    nome: yup
      .string()
      .required('O nome é obrigatório')
      .max(200, 'O máximo de caracteres é 200'),
    descricao: yup
      .string()
      .max(320, 'O máximo de caracteres é 320')
      .required('A descrição é obrigatória'),
    cnpj: yup
      .string()
      .max(18)
      .required('O CNPJ é obrigatório')
      .test('is-positive', 'Informe um Número válido', isValidCNPJ),
    setor: yup.string().required('O setor de atuação é obrigatório'),
    localizacao: yup
      .string()
      .required('A localização é obrigatória')
      .max(200, 'O máximo de caracteres é 200'),
    fundacao: yup
      .number()
      .required('O ano de fundação é obrigatório')
      .typeError('Digite apenas números')
      .min(4, 'O mínimo de caracteres é 4'),
    site: yup
      .string()
      .required('O site da empresa é obrigatório')
      .max(320, 'O máximo de caracteres é 320'),
  })
  .required()

const CompanyInformation = () => {
  const router = useRouter()
  const { setCompanyData } = useContext(registerCompanyContext)

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<Inputs> = data => {
    setCompanyData(data)
    router.push(PublicRoutes.COMPANY_CREDENTIALS)
  }

  return (
    <Container>
      <Typography variant='h6' fontWeight='400'>
        Para criar a sua conta empresa precisamos de algumas informações
      </Typography>
      <Typography variant='subtitle1'>
        Para começar, quais são os dados da sua empresa?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mt={4}>
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
            placeholder='Nome da empresa'
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
            fullWidth
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
            {...register('cnpj')}
            helperText={errors.cnpj?.message}
            error={!!errors.cnpj?.message}
            inputProps={{
              maxLength: 18,
            }}
            onChange={(event: any) => {
              const text = event.target.value
              setValue('cnpj', toPattern(text, '99.999.999/9999-99'))
            }}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='cnpj'
            type='text'
            placeholder='CNPJ'
          />
        </Box>
        <Box mt={1}>
          <TextField
            select
            fullWidth
            label='Setor de atuação'
            defaultValue=''
            inputProps={register('setor', {
              required: 'Selecione um setor',
            })}
            error={!!errors.setor?.message}
            helperText={errors.setor?.message}
          >
            {MOCK_COMPANY_ACTIVITIES.map(option => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mt={1}>
          <TextField
            {...register('localizacao')}
            helperText={errors.localizacao?.message}
            error={!!errors.localizacao?.message}
            inputProps={{
              maxLength: 200,
            }}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='localizacao'
            type='text'
            placeholder='Localização'
          />
        </Box>
        <Box mt={1}>
          <TextField
            {...register('fundacao')}
            helperText={errors.fundacao?.message}
            error={!!errors.fundacao?.message}
            inputProps={{
              maxLength: 4,
            }}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='fundacao'
            type='text'
            placeholder='Ano de fundação'
          />
        </Box>
        <Box mt={1}>
          <TextField
            {...register('site')}
            helperText={errors.site?.message}
            error={!!errors.site?.message}
            inputProps={{
              maxLength: 320,
            }}
            fullWidth
            size='small'
            variant='outlined'
            margin='dense'
            id='site'
            type='text'
            placeholder='Site institucional'
          />
        </Box>
        <Box mt={4}>
          <Button fullWidth variant='contained' size='medium' type='submit'>
            Continuar
          </Button>
        </Box>
      </form>
    </Container>
  )
}

CompanyInformation.getLayout = function getLayout(page: ReactElement) {
  return (
    <RegisterCompanyProvider>
      <Default>{page}</Default>
    </RegisterCompanyProvider>
  )
}

export default CompanyInformation
