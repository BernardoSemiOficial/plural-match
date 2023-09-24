import { LocalStorageKeys } from '@/enums/local-storage'
import { PublicRoutes } from '@/enums/routes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Logout, People, Work } from '@mui/icons-material'
import {
  Avatar,
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

  const handleClickLogout = () => {
    handleClickClose()
    setLocalStorageValue({})
    router.push(PublicRoutes.LOGIN)
  }

  return (
    <MenuMUI
      id='menu'
      anchorEl={anchor}
      open={open}
      onClose={handleClickClose}
      onClick={handleClickClose}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 34,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
    >
      <MenuItem onClick={handleClickClose}>
        <Avatar /> Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClickClose}>
        <ListItemIcon>
          <People fontSize='small' />
        </ListItemIcon>
        Candidatos
      </MenuItem>
      <MenuItem onClick={handleClickClose}>
        <ListItemIcon>
          <Work fontSize='small' />
        </ListItemIcon>
        Vagas
      </MenuItem>
      <MenuItem onClick={handleClickLogout}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Sair
      </MenuItem>
    </MenuMUI>
  )
}
