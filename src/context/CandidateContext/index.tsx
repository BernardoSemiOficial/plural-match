import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
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
  setCandidateData: (candidate: Candidate) => void
  setLoginData: (candidate: Candidate) => void
}

export const candidateContext = createContext({} as CandidateContext)

export const CandidateProvider = ({ children }: candidateProviderProps) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<Candidate>(
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

  const setCandidateData = useCallback(
    (candidate: Candidate) => {
      setCandidate(currentCandidateData => {
        const newState = {
          ...currentCandidateData,
          ...candidate,
        }

        setLocalStorageValue(newState)
        return newState
      })
    },
    [setLocalStorageValue]
  )

  const setLoginData = useCallback(
    (candidate: Candidate) => {
      setCandidate(_ => {
        setLocalStorageValue(candidate)
        return candidate
      })
    },
    [setLocalStorageValue]
  )

  const candidateContextMemo = useMemo(
    () => ({
      candidate,
      candidates: {
        isLoading: isLoadingCandidates,
        error: errorCandidantes,
        candidates,
      },
      setCandidateData,
      setLoginData,
    }),
    [
      candidate,
      candidates,
      errorCandidantes,
      isLoadingCandidates,
      setCandidateData,
      setLoginData,
    ]
  )

  return (
    <candidateContext.Provider value={candidateContextMemo}>
      {children}
    </candidateContext.Provider>
  )
}
