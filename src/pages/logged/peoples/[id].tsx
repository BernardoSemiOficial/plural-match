import { ReactElement, useContext, useState } from 'react'

import { CandidatedVacancies } from '@/components/CandidatedVacancies'
import { HeaderProfile } from '@/components/HeaderProfile'
import { ModalSelectJob } from '@/components/ModalSelectJob'
import { SectionChips } from '@/components/SectionChips'
import { SectionDescription } from '@/components/SectionDescription'
import { SectionKeywords } from '@/components/SectionKeywords'
import { loggedContext } from '@/context/LoggedContext'
import { PrivateRoutes } from '@/enums/routes'
import { UserType } from '@/enums/user-type'
import { calculateAge } from '@/helpers/calculateAge'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { hardSkillsAvailable, softSkillsAvailable } from '@/mocks/skills'
import { Home, Info, Paid, Work } from '@mui/icons-material'
import { Box, Button, Divider } from '@mui/material'
import { useRouter } from 'next/router'

const People = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  const { candidates, user } = useContext(loggedContext)

  const candidateId = router.query.id

  const candidateSelected = candidates.data?.find(
    candidate => String(candidate.id) === candidateId
  )

  console.log('candidateSelected', candidateSelected)

  const age = calculateAge(candidateSelected?.dataNascimento ?? '01-01-2000')

  const isLoggedCandidate = Number(candidateId) === user?.id

  const openSelectedJob = ({ idJob }: { idJob?: number }) => {
    console.log('idJob', idJob)
    router.push({
      pathname: `${PrivateRoutes.PROCESS_DETAIL}`,
      query: {
        candidateId: user?.id,
        jobId: idJob,
      },
    })
  }

  return (
    <Container>
      <Box>
        <HeaderProfile
          title={candidateSelected?.nome ?? 'Nome'}
          description={age + ' anos'}
        />
        <Divider />
        <Box
          my={2}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <SectionKeywords
            keywords={[
              {
                icon: <Work fontSize='small' />,
                label: candidateSelected?.modeloTrabalho ?? 'Presencial',
              },
              {
                icon: <Home fontSize='small' />,
                label: candidateSelected?.modeloContratacao ?? 'CLT',
              },
              {
                icon: <Paid fontSize='small' />,
                label: String(
                  candidateSelected?.pretensaoSalarial ?? 'A combinar'
                ),
              },
              {
                icon: <Info fontSize='small' />,
                label: candidateSelected?.classeSocial ?? 'Classe Social D',
              },
            ]}
          />
        </Box>
        <Divider />
        <Box mt={3}>
          <SectionChips
            title='Soft skills'
            labels={candidateSelected?.softSkills ?? softSkillsAvailable}
          />
          <Box mt={2}>
            <SectionChips
              title='Hard skills'
              labels={candidateSelected?.hardSkills ?? hardSkillsAvailable}
            />
          </Box>
        </Box>
        {user?.tipo === UserType.RECRUITER && (
          <Box mt={3}>
            <Button
              fullWidth
              variant='contained'
              size='medium'
              onClick={handleClickOpen}
            >
              CONVIDAR
            </Button>
          </Box>
        )}
        {isLoggedCandidate && (
          <>
            <Divider style={{ marginTop: 24 }} />
            <Box mt={1}>
              <CandidatedVacancies
                onClick={openSelectedJob}
                vacancies={
                  candidateSelected?.vagasSelecionadas?.map(
                    item => item.vaga
                  ) as any
                }
              />
            </Box>
          </>
        )}
        <Divider style={{ marginTop: 24 }} />
        <Box mt={3}>
          <SectionDescription
            title='Sobre'
            description={candidateSelected?.sobre}
          />
          <Box mt={4}>
            <SectionDescription
              title='Experiência profissional'
              description={candidateSelected?.experienciaProfissional}
            />
          </Box>
          <Box mt={4}>
            <SectionDescription
              title='Experiência acadêmica'
              description={candidateSelected?.experienciaAcademica}
            />
          </Box>
          <Box mt={4}>
            <SectionDescription
              title='Sonhos e objetivos'
              description={candidateSelected?.sonhosObjetivos}
            />
          </Box>
        </Box>

        <ModalSelectJob {...{ open, handleClickClose }} />
      </Box>
    </Container>
  )
}

People.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default People
