import { Modal } from '@/components/Modal'
import { Job } from '@/model/job'
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

export function ModalSelectJob({
  open,
  handleClickClose,
  jobs,
  onClick,
  isLoading,
}: {
  open: boolean
  handleClickClose: () => void
  jobs?: Job[]
  onClick?({ idJob }: { idJob: string }): void
  isLoading: boolean
}) {
  const [jobSelected, setJobSelect] = useState<number | undefined>()
  return (
    <Modal maxWidth='xs' fullWidth open={open} onClose={handleClickClose}>
      <Box p={4} borderRadius={4}>
        <Typography variant='subtitle1' fontWeight='400'>
          Selecione a vaga
        </Typography>
        <Box mt={1}>
          <TextField
            select
            size='small'
            label='Vagas'
            fullWidth
            value={jobSelected}
            onChange={({ target }) => {
              setJobSelect(target.value as any)
            }}
          >
            {jobs?.map(job => (
              <MenuItem key={job?.vaga?.id_vaga} value={job?.vaga?.id_vaga}>
                {job?.vaga?.titulo_vaga}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box mt={8}>
          <Button
            disabled={isLoading}
            fullWidth
            variant='contained'
            size='medium'
            onClick={() => onClick?.({ idJob: jobSelected })}
          >
            {isLoading ? (
              <CircularProgress color='inherit' size={20} />
            ) : (
              'Convidar candidato'
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
