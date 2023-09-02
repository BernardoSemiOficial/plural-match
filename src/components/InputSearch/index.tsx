import React from 'react'
import { Box, TextField, Typography } from '@mui/material'

export const InputSearch: React.FC = () => {
  return (
    <Box mt={1}>
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        margin='dense'
        id='candidates'
        type='candidates'
        placeholder='Pesquise por um candidato'
      />
    </Box>
  )
}
