import React from 'react'

import { Modal } from '@/components/Modal'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'

export function ModalSelectJob({
  open,
  handleClickClose,
}: {
  open: boolean
  handleClickClose: () => void
}) {
  return (
    <Modal maxWidth='xs' fullWidth open={open} onClose={handleClickClose}>
      <Box p={4} borderRadius={4}>
        <Typography variant='subtitle1' fontWeight='400'>
          Selecione a vaga
        </Typography>
        <Box mt={1}>
          <TextField select size='small' label='Vagas' fullWidth>
            <MenuItem>Desenvolvedor Sênior</MenuItem>
          </TextField>
        </Box>
        <Box mt={8}>
          <Button fullWidth variant='contained' size='medium'>
            CONVIDAR
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
