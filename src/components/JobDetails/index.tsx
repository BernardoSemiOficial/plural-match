import React, { useState } from 'react'

import { ModalSelectJob } from '@/components/ModalSelectJob'
import {
  SectionDescription,
  SectionDescriptionProps,
} from '@/components/SectionDescription'
import {
  SectionKeywords,
  SectionKeywordsProps,
} from '@/components/SectionKeywords'
import { Box, Button, Divider } from '@mui/material'

import { HeaderProfile, HeaderProfileProps } from '../HeaderProfile'

interface JobDetailsProps {
  header: HeaderProfileProps
  jobInfo: SectionKeywordsProps['keywords']
  description?: SectionDescriptionProps
}

export const JobDetails: React.FC<JobDetailsProps> = ({
  header,
  jobInfo,
  description,
}) => {
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
            <SectionKeywords keywords={jobInfo} />
          </Box>
        </>
      )}

      <Divider style={{ marginTop: 16 }} />
      {/* <Box mt={3}>
        <SectionChips title='Soft skills' labels={softSkillsAvailable} />
        <Box mt={2}>
          <SectionChips title='Hard skills' labels={hardSkillsAvailable} />
        </Box>
      </Box> */}
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
      <Box mt={3}>
        {!!description && <SectionDescription {...description} />}
      </Box>

      <ModalSelectJob {...{ open, handleClickClose }} />
    </Box>
  )
}
