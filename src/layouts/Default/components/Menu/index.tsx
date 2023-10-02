import { useContext } from 'react'

import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes, PublicRoutes } from '@/enums/routes'
import { UserType } from '@/enums/user-type'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
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

  const { user, setLoginData } = useContext(loggedContext)

  const handleClickLogout = () => {
    setLoginData({})
    router.push(PublicRoutes.LOGIN)
  }

  const handleClickProfile = () => {
    router.push({
      pathname: `${PrivateRoutes.PEOPLES}/[id]`,
      query: {
        id: user?.id,
      },
    })
  }

  const handleClickJobs = () => {
    router.push(PrivateRoutes.JOBS)
  }

  const handleClickPeoples = () => {
    router.push(PrivateRoutes.PEOPLES)
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
      {user?.tipo !== UserType.COMPANY && [
        <MenuItem key={0} onClick={handleClickProfile}>
          <Avatar sx={{ bgcolor: '#BA2649' }}>
            {firstLetterOfFirstAndLastName(user?.nome ?? 'XX XX')}
          </Avatar>
          <Box ml={1}>Perfil</Box>
        </MenuItem>,
        <Divider key={1} />,
        <MenuItem key={2} onClick={handleClickPeoples}>
          <ListItemIcon>
            <People color={'primary'} fontSize='small' />
          </ListItemIcon>
          Candidatos
        </MenuItem>,
        <MenuItem key={3} onClick={handleClickJobs}>
          <ListItemIcon>
            <Work color={'primary'} fontSize='small' />
          </ListItemIcon>
          Vagas
        </MenuItem>,
      ]}
      <MenuItem onClick={handleClickLogout}>
        <ListItemIcon>
          <Logout color={'primary'} fontSize='small' />
        </ListItemIcon>
        Sair
      </MenuItem>
    </MenuMUI>
  )
}
