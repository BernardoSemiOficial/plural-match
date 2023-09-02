import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Avatar, Box, Stack, Typography } from '@mui/material'

interface AvatarDescriptionProps {
  people: {
    name: string
    age: string
  }
}

export const AvatarDescription = ({ people }: AvatarDescriptionProps) => {
  return (
    <Stack direction='row' spacing={2}>
      <Avatar sx={{ bgcolor: '#BA2649' }}>
        {firstLetterOfFirstAndLastName(people.name)}
      </Avatar>
      <Box>
        <Typography variant='h5' fontWeight='bold'>
          {people.name}
        </Typography>
        <Box mb={1}>
          <Typography variant='h5'>{people.age}</Typography>
        </Box>
      </Box>
    </Stack>
  )
}
