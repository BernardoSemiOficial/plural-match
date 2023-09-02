import { ReactElement, useState } from 'react'

import { AvatarDescription } from '@/components/AvatarDescription'
import { CandidatedVacancies } from '@/components/CandidatedVacancies'
import { Modal } from '@/components/Modal'
import { SectionChips } from '@/components/SectionChips'
import { SectionDescription } from '@/components/SectionDescription'
import { SectionKeywords } from '@/components/SectionKeywords'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { hardSkills, softSkills } from '@/mocks/skills'
import { Home, Info, Paid, Work } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import {
  Box,
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'

const People = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  console.log('query: id', router.query.id)

  return (
    <Container>
      <Box textAlign='right'>
        <CreateIcon color='primary' fontSize='large' />
      </Box>
      <AvatarDescription
        people={{ name: 'Bernardo Pereira Oliveira', age: '18 anos' }}
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
        <SectionChips title='Soft skills' labels={softSkills} />
        <Box mt={2}>
          <SectionChips title='Hard skills' labels={hardSkills} />
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
      <Modal maxWidth='xs' fullWidth open={open} onClose={handleClickClose}>
        <Box p={4} borderRadius={4}>
          <Typography variant='subtitle1' fontWeight='400'>
            Selecione a vaga
          </Typography>
          <Box mt={1}>
            <TextField select size='small' label='Vagas' fullWidth>
              <MenuItem>Desenvolvedor Sênior</MenuItem>
            </TextField>
          </Box>
          <Box mt={8}>
            <Button fullWidth variant='contained' size='medium'>
              CONVIDAR
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}

People.getLayout = function getLayout(page: ReactElement) {
  return <Default>{page}</Default>
}

export default People
