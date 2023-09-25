import { useContext } from 'react'

import { candidateContext } from '@/context/CandidateContext'
import { LocalStorageKeys } from '@/enums/local-storage'
import { PublicRoutes } from '@/enums/routes'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Logout, People, Work } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  ListItemIcon,
  MenuItem,
  Menu as MenuMUI,
} from '@mui/material'
import { useRouter } from 'next/router'

interface MenuProps {
  open: boolean
  anchor: HTMLElement | null
  handleClickClose: () => void
}

export const Menu = ({ open, anchor, handleClickClose }: MenuProps) => {
  const router = useRouter()

  const [_, setLocalStorageValue] = useLocalStorage(
    LocalStorageKeys.CANDIDATE,
    {}
  )

  const { candidate } = useContext(candidateContext)

  const handleClickLogout = () => {
    setLocalStorageValue({})
    router.push(PublicRoutes.LOGIN)
  }

  return (
    <MenuMUI
      id='menu'
      aria-labelledby='demo-positioned-button'
      anchorEl={anchor}
      open={open}
      onClose={handleClickClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <MenuItem onClick={handleClickClose}>
        <Avatar sx={{ bgcolor: '#BA2649' }}>
          {firstLetterOfFirstAndLastName(candidate?.nome ?? 'XX XX')}
        </Avatar>
        <Box ml={1}>Perfil</Box>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClickClose}>
        <ListItemIcon>
          <People color={'primary'} fontSize='small' />
        </ListItemIcon>
        Candidatos
      </MenuItem>
      <MenuItem onClick={handleClickClose}>
        <ListItemIcon>
          <Work color={'primary'} fontSize='small' />
        </ListItemIcon>
        Vagas
      </MenuItem>
      <MenuItem onClick={handleClickLogout}>
        <ListItemIcon>
          <Logout color={'primary'} fontSize='small' />
        </ListItemIcon>
        Sair
      </MenuItem>
    </MenuMUI>
  )
}
