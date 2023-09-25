import { calculateAge } from '@/helpers/calculateAge'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Avatar, Box, Stack, Typography } from '@mui/material'

interface AvatarDescriptionProps {
  people: {
    name?: string
    age?: string
  }
}

export const AvatarDescription = ({ people }: AvatarDescriptionProps) => {
  return (
    <Stack direction='row' spacing={2} alignItems={'center'}>
      <Avatar sx={{ bgcolor: '#BA2649' }}>
        {people?.name ? firstLetterOfFirstAndLastName(people.name) : '-'}
      </Avatar>
      <Box>
        <Typography variant='h5' fontWeight='bold'>
          {people.name}
        </Typography>
        <Box mb={1}>
          <Typography variant='h5'>
            {calculateAge(people?.age ?? '01-01-2000')} anos
          </Typography>
        </Box>
      </Box>
    </Stack>
  )
}
