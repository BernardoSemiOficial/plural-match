import { ReactElement, useContext, useMemo } from 'react'

import { Default, queryClient } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'

import { HeaderProfile } from '@/components/HeaderProfile'
import { SelectiveProcessStep } from '@/components/SelectiveProcessStep'
import { loggedContext } from '@/context/LoggedContext'
import { Services } from '@/enums/services'
import { StatusStep } from '@/model/step'
import { api } from '@/services/api'
import { Box, Divider, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const Detail = () => {
  const router = useRouter()
  const { candidates } = useContext(loggedContext)
  const candidateId = router.query?.candidateId
  const jobId = router.query?.jobId

  const { mutate, isLoading, error } = useMutation({
    mutationFn: async (queryString: {
      idCandidato: string
      idVaga: string
      idProcesso: number
      status: StatusStep
    }) =>
      api.put(`${Services.ATUALIZA_STATUS_VAGA}`, null, {
        params: queryString,
      }),
    onSuccess() {
      console.log('trocou o status com sucesso')
      queryClient.invalidateQueries({ queryKey: [Services.LISTA_CANDIDATOS] })
    },
  })
  const candidate = useMemo(
    () =>
      candidates?.data?.find(candidate => candidate.id === Number(candidateId)),
    [candidateId, candidates?.data]
  )

  const process = useMemo(
    () =>
      candidate?.vagasSelecionadas?.find(
        job => job.vaga?.id_vaga === Number(jobId)
      ),
    [candidate?.vagasSelecionadas, jobId]
  )

  console.log('candidates?.data', candidates?.data)
  console.log('candidate', candidate)
  console.log('candidateId', candidateId)
  console.log('process', process)
  // const jobId = router.query?.id

  const handleChangeStatus = ({
    status,
    id,
  }: {
    status: StatusStep
    id: number
  }) => {
    if (!candidateId || !jobId || !id) {
      return
    }

    mutate({
      idCandidato: candidateId as string,
      idVaga: jobId as string,
      idProcesso: id,
      status: status,
    })
  }

  return (
    <Container>
      <HeaderProfile
        title={candidate?.nome}
        description={candidate?.dataNascimento}
      />

      <Box my={2}>
        <Divider />
      </Box>

      <Typography fontSize={16} fontWeight={600}>
        Progresso no processo seletivo
      </Typography>
      {/* <Typography fontSize={14} fontFamily='bold'>
        status: {labelStatus[status]}
      </Typography> */}

      <Box my={2}>
        <Divider />
      </Box>

      {process?.vaga?.etapas_processo_seletivo?.map((step, idx) => (
        <SelectiveProcessStep
          key={step.id}
          inputStatus={{
            onChange: handleChangeStatus,
          }}
          {...{ idx }}
          step={{
            description: step?.descricao_etapa_processo_seletivo,
            title: step?.name,
            links: step?.link_util,
            id: step?.id,
            status: step?.status,
          }}
        />
      ))}

      {/* <Box mt={4}>
        <Link href={'#'}>
          <Button fullWidth variant='contained' size='medium'>
            Salvar
          </Button>
        </Link>
      </Box> */}
    </Container>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Detail
