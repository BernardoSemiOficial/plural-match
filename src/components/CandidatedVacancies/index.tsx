import { Job } from '@/model/job'
import {
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'

interface CandidatedVacanciesProps {
  vacancies?: Job['vaga'][]
  onClick({ idJob }: { idJob?: number }): void
}

export const CandidatedVacancies = ({
  vacancies,
  onClick,
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
      {vacancies?.map(vacancie => (
        <ListItemButton
          onClick={() => onClick?.({ idJob: vacancie?.id_vaga })}
          key={vacancie?.id_vaga}
        >
          <ListItemText primary={vacancie?.titulo_vaga} />
        </ListItemButton>
      ))}
    </List>
  )
}
