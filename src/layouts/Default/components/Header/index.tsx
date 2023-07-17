import { PublicRoutes } from '@/enums/routes'
import Link from 'next/link'

import * as S from './header.css'

export const Header = () => {
  return (
    <header className={S.container}>
      <div className={S.content}>
        <Link href={PublicRoutes.HOME} passHref>
          <a title='Plural Match' translate='no'>
            <h1 className={S.title}>Plural Match</h1>
          </a>
        </Link>
      </div>
    </header>
  )
}
