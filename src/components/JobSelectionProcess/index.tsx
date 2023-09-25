import React from 'react'

import { Candidate } from '@/model/candidate'
import { CandidateList } from '@/pages/logged/peoples'
import { Box, Divider } from '@mui/material'

import { HeaderProfile, HeaderProfileProps } from '../HeaderProfile'

interface JobSelectionProcessProps {
  header: HeaderProfileProps
  candidates?: Candidate[]
  onClick({ id }: { id: number }): void
}

export const JobSelectionProcess: React.FC<JobSelectionProcessProps> = ({
  header,
  candidates,
  onClick,
}) => {
  return (
    <Box>
      <HeaderProfile {...header} />

      <Box mt={2} mb={6}>
        <Divider />
      </Box>

      <CandidateList {...{ candidates, onClick }} />
    </Box>
  )
}
