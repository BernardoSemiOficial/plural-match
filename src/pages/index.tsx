import { ReactElement, ReactNode } from 'react'

import { Button } from '@mui/material'

import { Default } from '../layouts/Default'

interface HomeProps {
  children: ReactNode
  environment: string
}

const Home = ({ environment }: HomeProps) => {
  return (
    <>
      <h1>Hello</h1>
      <Button variant='text'>Text</Button>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      environment: process.env.NEXT_PUBLIC_ENVIRONMENT,
    },
  }
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Home
