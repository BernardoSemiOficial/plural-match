import {
  ReactElement,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from 'react'

import { LocalStorageKeys } from '@/enums/local-storage'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Candidate } from '@/model/candidate'

type candidateProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type CandidateContext = {
  candidate: Candidate
}

export const candidateContext = createContext({} as CandidateContext)

export const CandidateProvider = ({ children }: candidateProviderProps) => {
  const [localStorageValue] = useLocalStorage<Candidate>(
    LocalStorageKeys.CANDIDATE,
    {} as Candidate
  )
  const [candidate, setCandidate] = useState<Candidate>(localStorageValue)

  console.log('candidate', candidate)

  const candidateContextMemo = useMemo(
    () => ({
      candidate,
    }),
    [candidate]
  )

  return (
    <candidateContext.Provider value={candidateContextMemo}>
      {children}
    </candidateContext.Provider>
  )
}
