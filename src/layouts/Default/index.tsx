import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { DefaultProps } from './types'

export const Default = ({ children }: DefaultProps) => {
  return (
    <div>
      <div>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}
