import {
  ReactElement,
  ReactNode,
  createContext,
  useMemo,
  useState,
} from 'react'

import { LocalStorageKeys } from '@/enums/local-storage'
import { Services } from '@/enums/services'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Candidate } from '@/model/candidate'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

type candidateProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type CandidateContext = {
  candidate: Candidate
  candidates: {
    isLoading: boolean
    error: any
    candidates?: Candidate[]
  }
}

export const candidateContext = createContext({} as CandidateContext)

export const CandidateProvider = ({ children }: candidateProviderProps) => {
  const [localStorageValue] = useLocalStorage<Candidate>(
    LocalStorageKeys.CANDIDATE,
    {} as Candidate
  )
  const [candidate, setCandidate] = useState<Candidate>(localStorageValue)

  const {
    data: candidates,
    isLoading: isLoadingCandidates,
    error: errorCandidantes,
  } = useQuery({
    queryKey: [Services.LISTA_CANDIDATOS],
    queryFn: async () =>
      (await api.get<Candidate[]>(Services.LISTA_CANDIDATOS)).data,
  })

  console.log('candidate', candidate)
  console.log('candidates', candidates)

  const candidateContextMemo = useMemo(
    () => ({
      candidate,
      candidates: {
        isLoading: isLoadingCandidates,
        error: errorCandidantes,
        candidates,
      },
    }),
    [candidate, candidates, errorCandidantes, isLoadingCandidates]
  )

  return (
    <candidateContext.Provider value={candidateContextMemo}>
      {children}
    </candidateContext.Provider>
  )
}
