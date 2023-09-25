import React, { useState } from 'react'

import { CandidatedVacancies } from '@/components/CandidatedVacancies'
import { ModalSelectJob } from '@/components/ModalSelectJob'
import { SectionChips } from '@/components/SectionChips'
import { SectionDescription } from '@/components/SectionDescription'
import {
  SectionKeywords,
  SectionKeywordsProps,
} from '@/components/SectionKeywords'
import { hardSkillsAvailable, softSkillsAvailable } from '@/mocks/skills'
import { Box, Button, Divider } from '@mui/material'

import { HeaderProfile, HeaderProfileProps } from '../HeaderProfile'

interface JobDetailsProps {
  header: HeaderProfileProps
  jobInfo: SectionKeywordsProps['keywords']
}

export const JobDetails: React.FC<JobDetailsProps> = ({ header, jobInfo }) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)
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
            <SectionKeywords
              keywords={jobInfo}
              // keywords={[
              //   { icon: <Work fontSize='small' />, label: 'Presencial' },
              //   { icon: <Home fontSize='small' />, label: 'CLT' },
              //   { icon: <Paid fontSize='small' />, label: 'A combinar' },
              //   { icon: <Info fontSize='small' />, label: 'Classe Social D' },
              // ]}
            />
          </Box>
        </>
      )}

      <Divider style={{ marginTop: 16 }} />
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
  )
}
