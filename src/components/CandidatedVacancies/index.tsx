import { createUUID } from '@/helpers/createUUID'
import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'

interface CandidatedVacanciesProps {
  vacancies: string[]
}

export const CandidatedVacancies = ({
  vacancies,
}: CandidatedVacanciesProps) => {
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      subheader={
        <ListSubheader component='div' id='nested-list-subheader'>
          VAGAS CANDIDATADAS
        </ListSubheader>
      }
    >
      {vacancies.map(vacancie => (
        <ListItemButton key={createUUID()}>
          <ListItemText primary={vacancie} />
        </ListItemButton>
      ))}
    </List>
  )
}
