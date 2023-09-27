import React, { useContext, useMemo, useState } from 'react'

import {
  SectionDescription,
  SectionDescriptionProps,
} from '@/components/SectionDescription'
import {
  SectionKeywords,
  SectionKeywordsProps,
} from '@/components/SectionKeywords'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { Services } from '@/enums/services'
import { UserType } from '@/enums/user-type'
import { queryClient } from '@/layouts/Default'
import { api } from '@/services/api'
import { Box, Button, CircularProgress, Divider } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { HeaderProfile, HeaderProfileProps } from '../HeaderProfile'

interface JobDetailsProps {
  header: HeaderProfileProps
  jobInfo: SectionKeywordsProps['keywords']
  description?: SectionDescriptionProps
  jobId: number
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  header,
  jobInfo,
  description,
  jobId,
}) => {
  const router = useRouter()
  const { user, candidates } = useContext(loggedContext)

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
      queryClient.invalidateQueries({ queryKey: [Services.LISTA_CANDIDATOS] })
    },
  })

  let labelButton = 'Se candidatar'

  const canApply = useMemo(() => {
    if (user?.tipo !== UserType.CANDIDATE) {
      return
    }

    const currentCandidate = candidates?.data?.find(
      candidate => candidate.id === user?.id
    )

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

  const [loadingRelatorio, setLoadingRelatorio] = useState(false)

  const handleRelatorio = async () => {
    // try {
    //   setLoadingRelatorio(true)
    //   const response = await api.get(Services.GERAR_RELATORIO, {
    //     params: {
    //       idVaga: jobId,
    //     },
    //   })
    //   console.log('response', response)
    // } catch (error) {
    //   alert('Relatório indisponível')
    // } finally {
    //   setLoadingRelatorio(false)
    // }
    window.open(`https://localhost:7260/relatorio-candidatos?idVaga=${jobId}`)
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

      {/*
      <Box mt={3}>
        <SectionChips title='Soft skills' labels={softSkillsAvailable} />
        <Box mt={2}>
          <SectionChips title='Hard skills' labels={hardSkillsAvailable} />
        </Box>
      </Box> */}

      {user?.tipo === UserType.CANDIDATE && (
        <>
          <Divider style={{ marginTop: 16 }} />

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
        </>
      )}

      {user?.tipo === UserType.RECRUITER && (
        <>
          <Divider style={{ marginTop: 16 }} />

          <Box my={3}>
            <Button
              fullWidth
              variant='contained'
              color={'primary'}
              size='medium'
              onClick={handleRelatorio}
            >
              {loadingRelatorio ? (
                <CircularProgress color='inherit' size={20} />
              ) : (
                'Gerar relatório'
              )}
            </Button>
          </Box>
        </>
      )}

      <Divider style={{ marginTop: 16 }} />
      <Box mt={3}>
        {!!description && <SectionDescription {...description} />}
      </Box>
    </Box>
  )
}
