import React from 'react'

import { Box, Divider } from '@mui/material'

import { Candidate } from '@/model/candidate'
import { CandidateList } from '@/pages/logged/peoples'
import { HeaderProfile, HeaderProfileProps } from '../HeaderProfile'

interface JobSelectionProcessProps {
  header: HeaderProfileProps
  candidates?: Candidate[]
}

export const JobSelectionProcess: React.FC<JobSelectionProcessProps> = ({
  header,
  candidates,
}) => {
  return (
    <Box>
      <HeaderProfile {...header} />

      <Box mt={2} mb={6}>
        <Divider />
      </Box>

      <CandidateList candidates={candidates} />
    </Box>
  )
}
