import { ReactElement, useState } from 'react'

import { CandidatedVacancies } from '@/components/CandidatedVacancies'
import { HeaderProfile } from '@/components/HeaderProfile'
import { ModalSelectJob } from '@/components/ModalSelectJob'
import { SectionChips } from '@/components/SectionChips'
import { SectionDescription } from '@/components/SectionDescription'
import { SectionKeywords } from '@/components/SectionKeywords'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { hardSkillsAvailable, softSkillsAvailable } from '@/mocks/skills'
import { Home, Info, Paid, Work } from '@mui/icons-material'
import { Box, Button, Divider } from '@mui/material'

const People = () => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  return (
    <Container>
      <Box>
        <HeaderProfile
          title='Bernardo Pereira Oliveira'
          description='18 anos'
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
              { icon: <Work fontSize='small' />, label: 'Presencial' },
              { icon: <Home fontSize='small' />, label: 'CLT' },
              { icon: <Paid fontSize='small' />, label: 'A combinar' },
              { icon: <Info fontSize='small' />, label: 'Classe Social D' },
            ]}
          />
        </Box>
        <Divider />
        <Box mt={3}>
          <SectionChips title='Soft skills' labels={softSkillsAvailable} />
          <Box mt={2}>
            <SectionChips title='Hard skills' labels={hardSkillsAvailable} />
          </Box>
        </Box>
        <Box my={3}>
          <Button
            fullWidth
            variant='contained'
            size='medium'
            onClick={handleClickOpen}
          >
            CONVIDAR
          </Button>
        </Box>
        <Divider />
        <Box mt={1}>
          <CandidatedVacancies
            vacancies={[
              'Desenvolvedor Sênior #14',
              'Desenvolvedor Fullstack #15',
            ]}
          />
        </Box>
        <Divider />
        <Box mt={3}>
          <SectionDescription
            title='Sobre'
            description='Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.'
          />
          <Box mt={4}>
            <SectionDescription
              title='Experiência profissional'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.'
            />
          </Box>
          <Box mt={4}>
            <SectionDescription
              title='Experiência acadêmica'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.'
            />
          </Box>
          <Box mt={4}>
            <SectionDescription
              title='Sonhos e objetivos'
              description='Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.'
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
