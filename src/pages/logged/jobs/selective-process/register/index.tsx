import { ReactElement } from 'react'

import { stagesSelectionProcess } from '@/enums/selection-process'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
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

const RegisterJob = () => {
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
      <Box mt={3}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='title'
          type='text'
          placeholder='Título da vaga'
        />
      </Box>
      <Box mt={1}>
        <TextField
          multiline
          fullWidth
          rows={5}
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
          size='small'
          variant='outlined'
          margin='dense'
          id='company'
          type='text'
          placeholder='Empresa'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='working-model'
          type='text'
          placeholder='Modelo de trabalho'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='hiring-model'
          type='text'
          placeholder='Modelo de contratação'
        />
      </Box>
      <Box mt={1}>
        <TextField
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='salary-range'
          type='text'
          placeholder='Faixa salarial'
        />
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
        <Button fullWidth color='success' variant='contained' size='medium'>
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
