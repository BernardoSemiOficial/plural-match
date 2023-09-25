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
import { PrivateRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { UserType } from '@/enums/user-type'
import { queryClient } from '@/layouts/Default'
import { api } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
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
  const router = useRouter()
  const { user, candidates } = useContext(loggedContext)
  console.log('candidates =========>', candidates)
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

  let labelButton = 'Se candidatar'

  const canApply = useMemo(() => {
    if (user?.tipo !== UserType.CANDIDATE) {
      return
    }

    console.log('user?.id', user?.id)

    const currentCandidate = candidates?.data?.find(
      candidate => candidate.id === user?.id
    )

    console.log('currentCandidate', currentCandidate)

    const findJobs = currentCandidate?.vagasSelecionadas?.find(
      job => job.vaga.id_vaga === Number(jobId)
    )
    return !!findJobs
  }, [candidates?.data, jobId, user?.id, user?.tipo])

  if (canApply) {
    labelButton = 'Acompanhar processo'
  }

  const handleAtrelaCandidato = () => {
    const model = {
      idCandidato: user?.id,
      idVaga: jobId,
      idEtapa: null,
    }
    mutate(model)
  }

  const handleButton = () => {
    if (labelButton === 'Se candidatar') {
      handleAtrelaCandidato()
      return
    }

    if (labelButton === 'Acompanhar processo') {
      router.push({
        pathname: `${PrivateRoutes.PROCESS_DETAIL}`,
        query: {
          candidateId: user?.id,
          jobId: jobId,
        },
      })
    }
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
            color={canApply ? 'success' : 'primary'}
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
