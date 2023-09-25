import { UserType } from '@/enums/user-type'

import { Candidate } from './candidate'
import { Company } from './company'
import { Recruiter } from './recruiter'

export interface UserCandidate extends Candidate {
  tipo?: UserType.CANDIDATE
}

export interface UserCompany extends Company {
  tipo?: UserType.COMPANY
}

export interface UserRecruiter extends Recruiter {
  tipo?: UserType.RECRUITER
}

export type User = UserCandidate | UserCompany | UserRecruiter
