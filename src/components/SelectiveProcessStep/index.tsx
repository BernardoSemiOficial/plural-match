import React from 'react'

import { SELECTIVE_PROCESS_STEPS } from '@/mocks/selectiveProcessSteps'
import { MOCK_STATUS_STEP } from '@/mocks/statusStep'
import { StatusStep } from '@/model/step'
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
  inputStatus: {
    onChange({ status, id }: { status: StatusStep; id: number }): void
  }
}> = ({ step, idx, inputStatus }) => {
  return (
    <Box>
      <Box
        display='flex'
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {!!step?.title && (
          <Typography fontSize={16} fontWeight={600} mb={1}>
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
          <Typography fontSize={14} fontWeight={600}>
            Links:
          </Typography>
          <Typography fontSize={14} fontFamily={'regular'}>
            {step.links}
          </Typography>
        </>
      )}

      <Box mt={3}>
        <TextField
          select
          fullWidth
          label='Selecione o status'
          size='small'
          defaultValue={step.status}
          disabled={
            step.status === StatusStep.APROVADO ||
            step.status === StatusStep.REPROVADO
          }
          onChange={({ target }) =>
            inputStatus?.onChange?.({
              id: step.id,
              status: target.value,
            })
          }
        >
          {MOCK_STATUS_STEP.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
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
