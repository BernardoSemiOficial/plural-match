import { useState } from 'react'

import CheckCircleGreen from '@/assets/check-circle-green.png'
import CheckCircleRed from '@/assets/check-circle-red.png'
import { ErrorType } from '@/enums/error-type'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'

import { Modal } from '../Modal'

interface NotificationProps {
  title: string
  type: ErrorType
}

export const Notification = ({ title, type }: NotificationProps) => {
  const [open, setOpen] = useState(true)

  const handleClickClose = () => setOpen(false)

  return (
    <Modal maxWidth='xs' fullWidth open={open} onClose={handleClickClose}>
      <Box p={5}>
        <Typography variant='h5' fontWeight='bold' textAlign='center'>
          {title}
        </Typography>
        <Box textAlign='center' py={2}>
          {type === ErrorType.SUCCESS ? (
            <Image src={CheckCircleGreen} alt='' title='' />
          ) : (
            <Image src={CheckCircleRed} alt='' title='' />
          )}
        </Box>
        <Box textAlign='center' pt={3}>
          <Button fullWidth variant='contained' size='medium'>
            ok
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
