import * as S from './header.css'

export const Header = () => {
  return (
    <header className={S.container}>
      <div className={S.content}>
        <h1 className={S.title}>Plural Match</h1>
      </div>
    </header>
  )
}
