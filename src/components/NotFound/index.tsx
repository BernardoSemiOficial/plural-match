import { FiAlertCircle } from 'react-icons/fi'

import { useRouter } from 'next/router'

export const NotFound = () => {
  const router = useRouter()

  const handleGoToLastPage = () => {
    router.back()
  }

  return (
    <section>
      <FiAlertCircle size={100} />
      <p>404</p>
      <p>Página não encontrada</p>
      <div>
        <button onClick={handleGoToLastPage}>
          Voltar para a página anterior
        </button>
      </div>
    </section>
  )
}
