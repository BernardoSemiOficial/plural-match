import { ReactElement, useState } from 'react'

import { createUUID } from '@/helpers/createUUID'
import { firstLetterOfFirstAndLastName } from '@/helpers/firstLetterOfFirstAndLastName'
import { Default } from '@/layouts/Default'
import { Container } from '@/layouts/Default/components/Container/Container'
import { hardSkills, softSkills } from '@/mocks/skills'
import { Home, Info, Paid, Work } from '@mui/icons-material'
import CreateIcon from '@mui/icons-material/Create'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  MenuItem,
  Modal,
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
      <Avatar sx={{ bgcolor: '#BA2649' }}>
        {firstLetterOfFirstAndLastName('Bernardo Pereira')}
      </Avatar>
      <Box mt={2}>
        <Typography variant='h5' fontWeight='bold'>
          Bernardo Pereira Oliveira
        </Typography>
      </Box>
      <Box mb={1}>
        <Typography variant='h5'>18 anos</Typography>
      </Box>
      <Divider />
      <Box
        my={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <Chip
          key={createUUID()}
          icon={<Work fontSize='small' />}
          variant='outlined'
          color='primary'
          label={'Presencial'}
          size='medium'
          sx={{ fontSize: '15px' }}
        />
        <Chip
          key={createUUID()}
          icon={<Home fontSize='small' />}
          variant='outlined'
          color='primary'
          label={'CLT'}
          size='medium'
          sx={{ fontSize: '15px' }}
        />
        <Chip
          key={createUUID()}
          icon={<Paid fontSize='small' />}
          variant='outlined'
          color='primary'
          label={'A combinar'}
          size='medium'
          sx={{ fontSize: '15px' }}
        />
        <Chip
          key={createUUID()}
          icon={<Info fontSize='small' />}
          variant='outlined'
          color='primary'
          label={'Classe Social D'}
          size='medium'
          sx={{ fontSize: '15px' }}
        />
      </Box>
      <Divider />
      <Box mt={3}>
        <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            Soft skills
          </Typography>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {softSkills.map(softSkill => (
              <Chip
                key={createUUID()}
                variant='filled'
                color='primary'
                label={softSkill}
                sx={{ fontSize: '15px' }}
              />
            ))}
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant='subtitle1' fontWeight='bold'>
            Hard skills
          </Typography>
          <Box
            mt={1}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
            }}
          >
            {hardSkills.map(hardSkill => (
              <Chip
                key={createUUID()}
                variant='filled'
                color='primary'
                label={hardSkill}
                sx={{ fontSize: '15px' }}
              />
            ))}
          </Box>
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
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              VAGAS CANDIDATADAS
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemText primary='Desenvolvedor Sênior #14' />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary='Desenvolvedor Fullstack #15' />
          </ListItemButton>
        </List>
      </Box>
      <Divider />
      <Box mt={3}>
        <Box>
          <Typography variant='subtitle1' fontWeight='bold'>
            Sobre
          </Typography>
          <Typography variant='body1'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant='subtitle1' fontWeight='bold'>
            Experiência profissional
          </Typography>
          <Typography variant='body1'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant='subtitle1' fontWeight='bold'>
            Experiência acadêmica
          </Typography>
          <Typography variant='body1'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.
          </Typography>
        </Box>
        <Box mt={4}>
          <Typography variant='subtitle1' fontWeight='bold'>
            Sonhos e objetivos
          </Typography>
          <Typography variant='body1'>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s.
          </Typography>
        </Box>
      </Box>
      <Modal open={open} onClose={handleClickClose}>
        <Box
          p={4}
          borderRadius={4}
          position='absolute'
          top='50%'
          left='50%'
          bgcolor='#ffffff'
          width={'100%'}
          maxWidth={'400px'}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
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
