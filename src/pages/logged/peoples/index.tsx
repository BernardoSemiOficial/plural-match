import { ReactElement, useCallback, useContext, useMemo, useState } from 'react'

import { DropDownFilter } from '@/components/DropdownFilter'
import { InputSearch } from '@/components/InputSearch'
import { ItemList } from '@/components/ItemList'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { createUUID } from '@/helpers/createUUID'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { Candidate } from '@/model/candidate'
import { deepMatchValue } from '@/utils/search'
import type { SelectChangeEvent } from '@mui/material'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const Peoples = () => {
  const router = useRouter()
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

  const [search, setSearch] = useState('')

  const filterJobs = useCallback((jobs: Candidate[], text?: string) => {
    if (!text || !jobs) {
      return jobs
    }

    return jobs.filter(
      (item: Candidate) =>
        deepMatchValue(item?.nome || '', text) ||
        deepMatchValue(item?.sexo || '', text) ||
        deepMatchValue(item?.orientacaoSexual || '', text) ||
        deepMatchValue(item?.etnia || '', text) ||
        deepMatchValue(item?.classeSocial || '', text) ||
        deepMatchValue(item?.deficiencia || '', text)
    )
  }, [])

  const filteredCandidates = useMemo(() => {
    if (!search) {
      return candidates?.data
    }

    return filterJobs(candidates?.data || [], search)
  }, [candidates?.data, filterJobs, search])

  return (
    <Container>
      <Typography variant='h4' fontWeight='bold'>
        Buscar
      </Typography>

      <InputSearch
        onChange={({ target }) => setSearch(target.value)}
        value={search}
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
        <CandidateList
          candidates={filteredCandidates}
          onClick={({ id }: { id: number }) => {
            router.push({
              pathname: `${PrivateRoutes.PEOPLES}/[id]`,
              query: {
                id,
              },
            })
          }}
        />
      )}
    </Container>
  )
}

export function CandidateList({
  candidates,
  onClick,
}: {
  candidates: Candidate[] | undefined
  onClick({ id }: { id: number }): void
}) {
  const { user } = useContext(loggedContext)

  return (
    <Box mt={4}>
      {candidates
        ?.filter(candidate => {
          if (user?.id !== candidate.id) return candidate
        })
        ?.map(candidate => {
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
              onClick={onClick}
              {...{
                item: {
                  id: String(candidate.id),
                  title: candidate?.nome ?? 'Nome',
                  subtitle: concatInfo ?? 'características pessoais',
                  descrition: candidate.cidade ?? 'Campinas',
                  subDescription: candidate.estado ?? 'São Paulo',
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
