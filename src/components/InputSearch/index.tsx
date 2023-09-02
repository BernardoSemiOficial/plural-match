import React from 'react'

import type { TextFieldProps } from '@mui/material'
import { Box, TextField } from '@mui/material'

export const InputSearch: React.FC<TextFieldProps> = ({
  placeholder,
  id,
  type,
}) => {
  return (
    <Box mt={1}>
      <TextField
        fullWidth
        size='small'
        variant='outlined'
        margin='dense'
        {...{ placeholder, type, id }}
      />
    </Box>
  )
}
