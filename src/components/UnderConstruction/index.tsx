import Image from 'next/image'
import { useRouter } from 'next/router'
import svgUnderConstruction from 'public/assets/under-construction.svg'

export const UnderConstruction = () => {
  const router = useRouter()

  const handleGoToLastPage = () => {
    router.back()
  }

  return (
    <section>
      <figure>
        <Image
          objectFit='cover'
          width={300}
          height={300}
          quality={100}
          src={svgUnderConstruction}
          alt={''}
          title={''}
        />
      </figure>
      <p>Página em construção</p>
      <p>Essa página está sendo desenvolvida,</p>
      <p>logo mais, você poderá vê-la.</p>
      <div>
        <button onClick={handleGoToLastPage}>
          Voltar para a página anterior
        </button>
      </div>
    </section>
  )
}
