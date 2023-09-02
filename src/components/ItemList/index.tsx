import React from 'react'

import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'

import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

export const ItemList: React.FC<{
  item: {
    id: string
    title: string
    subtitle: string
    descrition: string
    subDescription: string
    img?: string
  }
}> = ({ item }) => {
  return (
    <Box mt={2} key={item.id}>
      <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
        {item?.img ? (
          <Image
            width={40}
            height={40}
            style={{ borderRadius: 8 }}
            src={
              'https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png'
            }
          />
        ) : (
          <Avatar sx={{ bgcolor: '#BA2649' }}>
            {firstLetterOfFirstAndLastName(item.title)}
          </Avatar>
        )}
        <Stack ml={2} flex={1}>
          <Typography variant='subtitle1' fontSize={16}>
            {item.title}
          </Typography>
          <Typography variant='body1' fontSize={14}>
            {item.subtitle}
          </Typography>
          <Typography variant='body1' fontSize={12}>
            {item.descrition} {item.subDescription}
          </Typography>
        </Stack>
      </Box>
      <Box my={2}>
        <Divider />
      </Box>
    </Box>
  )
}
