import { PrivateRoutes } from '@/enums/routes'
import { calculateAge } from '@/helpers/calculateAge'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'
interface AvatarDescriptionProps {
  people: {
    name?: string
    company?: string
    age?: string
    jobIdEdit?: number
  }
}

export const AvatarDescription = ({ people }: AvatarDescriptionProps) => {
  const router = useRouter()

  if (!people) return <></>

  const handleClickEditJob = () => {
    router.push({
      pathname: PrivateRoutes.JOB_EDIT + '/[id]',
      query: { id: people.jobIdEdit },
    })
  }

  return (
    <Stack direction='row' spacing={2} alignItems={'center'}>
      <Avatar sx={{ bgcolor: '#BA2649' }}>
        {people?.name ? firstLetterOfFirstAndLastName(people.name) : '-'}
      </Avatar>
      <Box>
        <Typography variant='h5' fontWeight='bold'>
          {people.name}
        </Typography>
        {people.company && (
          <Box mb={1}>
            <Typography variant='h5'>{people.company}</Typography>
          </Box>
        )}
        {people.age && (
          <Box mb={1}>
            <Typography variant='h5'>
              {calculateAge(people?.age ?? '01-01-2000')} anos
            </Typography>
          </Box>
        )}
      </Box>
      {people.jobIdEdit && (
        <Box alignSelf='flex-start'>
          <CreateOutlinedIcon
            color='primary'
            fontSize='medium'
            onClick={handleClickEditJob}
          />
        </Box>
      )}
    </Stack>
  )
}
