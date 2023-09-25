import React, { useContext, useMemo, useState } from 'react'

import { ModalSelectJob } from '@/components/ModalSelectJob'
import {
  SectionDescription,
  SectionDescriptionProps,
} from '@/components/SectionDescription'
import {
  SectionKeywords,
  SectionKeywordsProps,
} from '@/components/SectionKeywords'
import { Box, Button, CircularProgress, Divider } from '@mui/material'

import { loggedContext } from '@/context/LoggedContext'
import { Services } from '@/enums/services'
import { UserType } from '@/enums/user-type'
import { queryClient } from '@/layouts/Default'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { HeaderProfile, HeaderProfileProps } from '../HeaderProfile'

interface JobDetailsProps {
  header: HeaderProfileProps
  jobInfo: SectionKeywordsProps['keywords']
  description?: SectionDescriptionProps
  jobId: string
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  header,
  jobInfo,
  description,
  jobId,
}) => {
  const { user, candidates } = useContext(loggedContext)

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (queryString: {
      idCandidato?: number
      idVaga?: string
      idEtapa?: number | null
    }) =>
      api.post(`${Services.ATRELA_CANDIDATO_VAGA}`, null, {
        params: queryString,
      }),
    onSuccess() {
      console.log('trocou o status com sucesso')
      queryClient.invalidateQueries({ queryKey: [Services.LISTA_CANDIDATOS] })
    },
  })

  const handleAtrelaCandidato = () => {
    const model = {
      idCandidato: user?.id,
      idVaga: jobId,
      idEtapa: null,
    }
    mutate(model)
  }

  const handleButton = () => {
    if (!filteredCandidatesPerJob) {
      handleAtrelaCandidato()
      return
    }
  }

  let labelButton = 'Se candidatar'

  const filteredCandidatesPerJob = useMemo(() => {
    if (user?.tipo !== UserType.CANDIDATE) {
      return
    }

    const filtered = candidates?.data?.filter(candidate => {
      const jobs = candidate?.vagasSelecionadas
      console.log('jobs --->', jobs)
      const findJobs = jobs?.find(job => job.vaga.id_vaga === Number(jobId))
      return !!findJobs
    })
    return filtered
  }, [candidates?.data, jobId, user?.tipo])

  if (filteredCandidatesPerJob) {
    labelButton = 'Acompanhar processo'
  }

  return (
    <Box>
      <HeaderProfile {...header} />
      {jobInfo?.length && (
        <>
          <Divider style={{ marginTop: 16 }} />
          <Box
            my={2}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            <SectionKeywords keywords={jobInfo} />
          </Box>
        </>
      )}

      <Divider style={{ marginTop: 16 }} />
      {/*
      <Box mt={3}>
        <SectionChips title='Soft skills' labels={softSkillsAvailable} />
        <Box mt={2}>
          <SectionChips title='Hard skills' labels={hardSkillsAvailable} />
        </Box>
      </Box> */}

      {user?.tipo === UserType.CANDIDATE && (
        <Box my={3}>
          <Button
            fullWidth
            variant='contained'
            color={filteredCandidatesPerJob ? 'success' : 'primary'}
            size='medium'
            onClick={handleButton}
          >
            {isLoading ? (
              <CircularProgress color='inherit' size={20} />
            ) : (
              labelButton
            )}
          </Button>
        </Box>
      )}

      <Divider style={{ marginTop: 16 }} />
      <Box mt={3}>
        {!!description && <SectionDescription {...description} />}
      </Box>

      <ModalSelectJob {...{ open, handleClickClose }} />
    </Box>
  )
}
