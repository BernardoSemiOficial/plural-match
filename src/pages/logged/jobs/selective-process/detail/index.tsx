import { ReactElement, useContext, useMemo, useState } from 'react'

import { HeaderProfile } from '@/components/HeaderProfile'
import { Modal } from '@/components/Modal'
import { SelectiveProcessStep } from '@/components/SelectiveProcessStep'
import { chatContext } from '@/context/ChatContext'
import { loggedContext } from '@/context/LoggedContext'
import { Services } from '@/enums/services'
import { UserType } from '@/enums/user-type'
import { Default, queryClient } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { StatusStep } from '@/model/step'
import { api } from '@/services/api'
import { formatDate } from '@/utils/formatDate'
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

const Detail = () => {
  const router = useRouter()
  const { candidates, jobs, user } = useContext(loggedContext)
  const candidateId = router.query?.candidateId
  const jobId = router.query?.jobId

  const {
    message,
    messagesRoom,
    updateMessage,
    initChatRoom,
    handleButtonSubmitMessage,
    handleInputSubmitMessage,
  } = useContext(chatContext)
  const [chatIsOpen, setChatIsOpen] = useState(false)

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
      queryClient.invalidateQueries({ queryKey: [Services.LISTA_CANDIDATOS] })
    },
  })

  const candidate = useMemo(
    () =>
      candidates?.data?.find(candidate => candidate.id === Number(candidateId)),
    [candidateId, candidates?.data]
  )

  const jobInfo = useMemo(
    () => jobs?.data?.find(job => job.vaga.id_vaga === Number(jobId)),
    [jobId, jobs?.data]
  )

  const process = useMemo(
    () =>
      candidate?.vagasSelecionadas?.find(
        job => job.vaga?.id_vaga === Number(jobId)
      ),
    [candidate?.vagasSelecionadas, jobId]
  )

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

  const handleClickOpenChat = () => {
    console.log('username', user?.nome)
    const userType =
      user?.tipo === UserType.CANDIDATE ? 'Candidato' : 'Recrutador'

    initChatRoom({
      username: user?.nome ?? userType,
      room:
        String(candidate?.id ?? 'candidato') +
        '-' +
        String(jobInfo?.vaga.id_recrutador ?? 'recrutador'),
    })
    setChatIsOpen(true)
  }

  const handleClickCloseChat = () => {
    setChatIsOpen(false)
  }

  return (
    <Container>
      <HeaderProfile title={candidate?.nome} age={candidate?.dataNascimento} />

      <Box mt={2}>
        <Button
          disabled={isLoading}
          fullWidth
          variant='contained'
          size='medium'
          onClick={handleClickOpenChat}
        >
          {user?.tipo === UserType.CANDIDATE
            ? 'Fale com o recrutador'
            : 'Fale com o candidato'}
        </Button>
      </Box>

      <Box my={2}>
        <Divider />
      </Box>

      <Typography fontSize={16} fontWeight={600}>
        Progresso no processo seletivo
      </Typography>

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
            description: step?.descricao_etapa_processo_seletivo ?? '',
            title: step?.name ?? '',
            links: step?.link_util ?? '',
            id: String(step?.id ?? ''),
            status: step?.status ?? '',
          }}
        />
      ))}

      <Modal
        open={chatIsOpen}
        onClose={handleClickCloseChat}
        maxWidth='xs'
        fullWidth
      >
        <Box p={5} borderRadius={4}>
          <Typography variant='h6' fontWeight='bold'>
            Seja bem vindo, {user?.nome}!
          </Typography>
          <Typography variant='subtitle2' fontWeight='400'>
            Envie uma mensagem para o{' '}
            {user?.tipo === UserType.CANDIDATE ? 'recrutador' : 'candidato'} a
            respeito da vaga, por exemplo, dúvida sobre o processo seletivo.
          </Typography>
          <Box mt={1} mb={3}>
            <Divider />
          </Box>

          {messagesRoom.length > 0 ? (
            messagesRoom.map((message, i) => (
              <Box
                key={i}
                p={2}
                my={1}
                ml={message.username === user?.nome ? '10%' : ''}
                mr={message.username === user?.nome ? '' : '10%'}
                borderRadius={1}
                color={'#ffffff'}
                sx={{
                  backgroundColor:
                    message.username === user?.nome ? '#BA2649' : '#afafaf',
                }}
              >
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography variant='subtitle2' fontWeight='bold'>
                    {message?.username}
                  </Typography>
                  <Typography variant='subtitle2' fontWeight='400'>
                    {formatDate(message.createdAt)}
                  </Typography>
                </Stack>
                <Box mb={1}>
                  <Divider />
                </Box>
                <Typography variant='subtitle2' fontWeight='400'>
                  {message.message}
                </Typography>
              </Box>
            ))
          ) : (
            <Box
              p={1}
              my={1}
              borderRadius={1}
              color={'#ffffff'}
              sx={{
                backgroundColor: '#BA2649',
              }}
            >
              <Typography
                variant='subtitle1'
                fontWeight='400'
                textAlign={'center'}
              >
                inicie uma conversa no chat abaixo
              </Typography>
            </Box>
          )}

          <Box mt={3} mb={1}>
            <Divider />
          </Box>

          <Box>
            <TextField
              fullWidth
              size='small'
              variant='outlined'
              margin='dense'
              id='message'
              type='message'
              placeholder='Envie sua mensagem'
              value={message}
              onChange={({ target }) => updateMessage(target.value)}
              onKeyUp={handleInputSubmitMessage}
            />
          </Box>
          <Box mt={2}>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              size='medium'
              onClick={handleButtonSubmitMessage}
            >
              Enviar Mensagem
            </Button>
          </Box>
          <Box mt={1}>
            <Button fullWidth variant='outlined' size='medium'>
              Fechar Chat
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

Detail.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default Detail
