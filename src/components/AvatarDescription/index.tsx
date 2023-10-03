import { PrivateRoutes } from '@/enums/routes'
import { calculateAge } from '@/helpers/calculateAge'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
interface AvatarDescriptionProps {
  people: {
    name?: string
    company?: string
    age?: string
    jobIdEdit?: number
    img?: string
  }
}

export const AvatarDescription = ({ people }: AvatarDescriptionProps) => {
  const router = useRouter()
  const [imgSrc, setImgSrc] = useState<string | undefined>(people?.img)

  if (!people) return <></>

  const handleClickEditJob = () => {
    router.push({
      pathname: PrivateRoutes.JOB_EDIT + '/[id]',
      query: { id: people.jobIdEdit },
    })
  }

  return (
    <Stack direction='row' spacing={2} alignItems={'center'}>
      {imgSrc ? (
        <Image
          width={40}
          height={40}
          style={{ borderRadius: 8 }}
          alt='banco brasileiro NuBank'
          src={imgSrc}
          onError={() => {
            setImgSrc(
              'https://dbdzm869oupei.cloudfront.net/img/vinylrugs/preview/38596.png'
            )
          }}
        />
      ) : (
        <Avatar sx={{ bgcolor: '#BA2649' }}>
          {people?.name ? firstLetterOfFirstAndLastName(people.name) : '-'}
        </Avatar>
      )}

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
            titleAccess='Editar vaga'
            onClick={handleClickEditJob}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      )}
    </Stack>
  )
}
