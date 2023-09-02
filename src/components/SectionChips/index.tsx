import { createUUID } from '@/helpers/createUUID'
import { Box, Chip, Typography } from '@mui/material'

interface SectionChipsProps {
  title: string
  labels: string[]
}

export const SectionChips = ({ title, labels }: SectionChipsProps) => {
  return (
    <Box>
      <Typography variant='subtitle1' fontWeight='bold'>
        {title}
      </Typography>
      <Box
        mt={1}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {labels.map(label => (
          <Chip
            key={createUUID()}
            variant='filled'
            color='primary'
            label={label}
            sx={{ fontSize: '15px' }}
          />
        ))}
      </Box>
    </Box>
  )
}
