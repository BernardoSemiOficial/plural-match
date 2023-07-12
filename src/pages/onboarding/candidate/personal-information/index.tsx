import { ReactElement } from 'react'

import { Default } from '@/layouts/Default'

const PersonalInformation = () => {
  return (
    <>
      <h1>PersonalInformation</h1>
    </>
  )
}

PersonalInformation.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default PersonalInformation
