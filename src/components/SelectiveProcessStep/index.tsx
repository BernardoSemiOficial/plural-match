import React from 'react'

import { SELECTIVE_PROCESS_STEPS } from '@/mocks/selectiveProcessSteps'
import { Box, Divider, MenuItem, TextField, Typography } from '@mui/material'

export const SelectiveProcessStep: React.FC<{
  step: {
    id: string
    title: string
    description: string
    links: string
    status: string
    updated_at: string
  }
  idx: number
}> = ({ step, idx }) => {
  return (
    <Box>
      <Box
        display='flex'
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {!!step?.title && (
          <Typography fontSize={16} fontFamily={'bold'} mb={1}>
            {step.title}
          </Typography>
        )}
        {!!step?.updated_at && (
          <Typography fontSize={14} mb={1}>
            {step.updated_at}
          </Typography>
        )}
      </Box>
      {!!step?.description && (
        <Typography fontSize={14} fontFamily={'regular'} mb={1}>
          {step.description}
        </Typography>
      )}
      {step?.links && (
        <>
          <Typography fontSize={14} fontFamily={'bold'}>
            Links:
          </Typography>
          <Typography fontSize={14} fontFamily={'regular'}>
            {step.links}
          </Typography>
        </>
      )}

      <Box mt={2}>
        <TextField
          select
          fullWidth
          size='small'
          variant='outlined'
          margin='dense'
          id='social-class'
          label='Status da etapa'
          defaultValue='approved'
          disabled
        >
          <MenuItem value='approved'>Aprovado</MenuItem>
        </TextField>
      </Box>

      {idx !== SELECTIVE_PROCESS_STEPS.length - 1 && (
        <Box my={3}>
          <Divider />
        </Box>
      )}
    </Box>
  )
}
