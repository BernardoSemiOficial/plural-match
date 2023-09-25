import { Box, Typography } from '@mui/material'

export interface SectionDescriptionProps {
  title: string
  description?: string
}

export const SectionDescription = ({
  title,
  description,
}: SectionDescriptionProps) => {
  return (
    <Box>
      <Typography variant='subtitle1' fontWeight='bold'>
        {title}
      </Typography>
      <Typography variant='body1'>{description || 'Sem conteúdo'}</Typography>
    </Box>
  )
}
