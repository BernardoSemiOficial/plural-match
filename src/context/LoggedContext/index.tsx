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
import { User } from '@/model/user'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

type candidateProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type LoggedContext = {
  user: User
  candidates: {
    isLoading: boolean
    error: any
    candidates?: Candidate[]
  }
  // setCandidateData: (candidate: Candidate) => void
  setLoginData: (user: User) => void
}

export const loggedContext = createContext({} as LoggedContext)

export const LoggedProvider = ({ children }: candidateProviderProps) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<User>(
    LocalStorageKeys.CANDIDATE,
    {} as User
  )
  const [user, setUser] = useState<User>(localStorageValue)

  const {
    data: candidates,
    isLoading: isLoadingCandidates,
    error: errorCandidantes,
  } = useQuery({
    queryKey: [Services.LISTA_CANDIDATOS],
    queryFn: async () =>
      (await api.get<Candidate[]>(Services.LISTA_CANDIDATOS)).data,
  })

  console.log('user', user)
  console.log('candidates', candidates)

  // const setCandidateData = useCallback(
  //   (candidate: Candidate) => {
  //     setUser(currentCandidateData => {
  //       const newState = {
  //         ...currentCandidateData,
  //         ...candidate,
  //       }

  //       setLocalStorageValue(newState)
  //       return newState
  //     })
  //   },
  //   [setLocalStorageValue]
  // )

  const setLoginData = useCallback(
    (user: User) => {
      setUser(_ => {
        setLocalStorageValue(user)
        return user
      })
    },
    [setLocalStorageValue]
  )

  const loggedContextMemo = useMemo(
    () => ({
      user,
      candidates: {
        isLoading: isLoadingCandidates,
        error: errorCandidantes,
        candidates,
      },

      setLoginData,
    }),
    [user, candidates, errorCandidantes, isLoadingCandidates, setLoginData]
  )

  return (
    <loggedContext.Provider value={loggedContextMemo}>
      {children}
    </loggedContext.Provider>
  )
}
