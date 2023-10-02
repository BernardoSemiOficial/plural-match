import { useState } from 'react'

import { PublicRoutes } from '@/enums/routes'
import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Menu } from '../Menu'
import * as S from './header.css'

export const Header = () => {
  const router = useRouter()

  const [anchor, setAnchor] = useState<null | HTMLElement>(null)
  const open = Boolean(anchor)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  const handleClickClose = () => {
    setAnchor(null)
  }

  const showMenu = router?.pathname?.includes('logged')

  return (
    <header className={S.container}>
      <div
        className={S.content}
        style={{ justifyContent: showMenu ? 'space-between' : 'center' }}
      >
        {showMenu && (
          <Button onClick={handleClick}>
            <MenuIcon
              sx={{ color: '#ffffff', cursor: 'pointer' }}
              fontSize='medium'
            />
          </Button>
        )}

        <Link href={PublicRoutes.HOME} passHref>
          <a title='Plural Match' translate='no'>
            <h1 className={S.title}>Plural Match</h1>
          </a>
        </Link>
        {showMenu && <span></span>}
      </div>
      <Menu open={open} anchor={anchor} handleClickClose={handleClickClose} />
    </header>
  )
}
