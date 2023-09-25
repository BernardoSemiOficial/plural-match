import { ReactElement, useContext, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { candidateContext } from '@/context/CandidateContext'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Typography } from '@mui/material'

const Peoples = () => {
  const [filters, setFilters] = useState<string[]>([])

  // const { data, isLoading, error } = useQuery({
  //   queryKey: [Services.LISTA_CANDIDATOS],
  //   queryFn: async () =>
  //     (await api.get<Candidate[]>(Services.LISTA_CANDIDATOS)).data,
  // })

  const { candidates } = useContext(candidateContext)

  const handleChangeSelectFilter = (
    event: SelectChangeEvent<typeof filters>
  ) => {
    const {
      target: { value },
    } = event ?? {}
    setFilters(typeof value === 'string' ? value.split(',') : value)
  }

  return (
    <Container>
      <Typography variant='h4' fontWeight='bold'>
        Buscar
      </Typography>

      <InputSearch
        placeholder='Pesquise por um candidato'
        id='candidates'
        type='candidates'
      />

      <DropDownFilter {...{ filters, handleChangeSelectFilter }} />

      {candidates.isLoading ? (
        <Box
          mt={4}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
        >
          <CircularProgress size={40} />
          <Typography variant='subtitle1'>Carregando candidatos</Typography>
        </Box>
      ) : (
        <Box mt={4}>
          {candidates.candidates?.map(candidate => {
            const infos = [
              candidate.sexo,
              candidate.orientacaoSexual,
              candidate.etnia,
              candidate.classeSocial,
              candidate.deficiencia,
            ]

            const concatInfo = infos
              .filter(info => info !== 'nenhuma')
              .reduce((concatInfo, info, idx, array) => {
                if (info) concatInfo += info
                if (idx < array.length - 2) concatInfo += ', '
                if (idx === array.length - 2) concatInfo += ' e '
                return concatInfo
              }, '')

            return (
              <ItemList
                key={createUUID()}
                {...{
                  item: {
                    id: String(candidate.id),
                    title: candidate?.nome ?? 'Nome',
                    subtitle: concatInfo ?? 'características pessoais',
                    descrition: 'Campinas',
                    subDescription: 'São Paulo',
                  },
                }}
              />
            )
          })}
        </Box>
      )}
    </Container>
  )
}

Peoples.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Peoples
