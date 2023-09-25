import React from 'react'

import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import styles from './styles.module.css'

export const ItemList: React.FC<{
  item: {
    goToPage: object
    id: number
    title?: string
    subtitle?: string
    descrition?: string
    subDescription?: string
    img?: string
  }
}> = ({ item }) => {
  let labelDescription = item?.descrition
  if (item?.descrition && item?.subDescription) {
    labelDescription += ` ${item?.subDescription}`
  }
  return (
    <div className={styles.container} key={item.id}>
      <Link href={item.goToPage}>
        <Box mt={2} key={item.id}>
          <Box flexDirection={'row'} display={'flex'} alignItems={'center'}>
            {item?.img ? (
              <Image
                width={40}
                height={40}
                style={{ borderRadius: 8 }}
                alt='banco brasileiro NuBank'
                src={
                  'https://logodownload.org/wp-content/uploads/2019/08/nubank-logo-2.png'
                }
              />
            ) : (
              <Avatar sx={{ bgcolor: '#BA2649' }}>
                {item?.title ? firstLetterOfFirstAndLastName(item.title) : '-'}
              </Avatar>
            )}
            <Stack ml={2} flex={1}>
              <Typography variant='subtitle1' fontSize={16}>
                {item?.title || '-'}
              </Typography>
              <Typography variant='body1' fontSize={14}>
                {item?.subtitle || '-'}
              </Typography>
              {!!labelDescription && (
                <Typography variant='body1' fontSize={12}>
                  {labelDescription}
                </Typography>
              )}
            </Stack>
          </Box>
          <Box my={2}>
            <Divider />
          </Box>
        </Box>
      </Link>
    </div>
  )
}
