import { ReactElement, useContext, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Candidate } from '@/model/candidate'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Typography } from '@mui/material'

const Peoples = () => {
  const [filters, setFilters] = useState<string[]>([])

  const { candidates } = useContext(loggedContext)

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
        <CandidateList candidates={candidates.data} />
      )}
    </Container>
  )
}

export function CandidateList({
  candidates,
}: {
  candidates: Candidate[] | undefined
}) {
  return (
    <Box mt={4}>
      {candidates?.map(candidate => {
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
                goToPage: {
                  pathname: `${PrivateRoutes.PEOPLES}/[id]`,
                  query: {
                    id: candidate.id,
                  },
                },
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
  )
}

Peoples.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Peoples
