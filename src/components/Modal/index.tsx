import { ReactNode } from 'react'

import type { DialogProps } from '@mui/material'
import { Box, Dialog } from '@mui/material'

interface ModalProps {
  open: boolean
  fullWidth?: boolean
  maxWidth?: DialogProps['maxWidth']
  children: ReactNode
  onClose: () => void
}

export const Modal = ({ children, onClose, ...props }: ModalProps) => {
  return (
    <Dialog {...props} onClose={onClose}>
      <Box>{children}</Box>
    </Dialog>
  )
}
