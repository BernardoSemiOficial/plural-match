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
import { UserType } from '@/enums/user-type'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Candidate } from '@/model/candidate'
import { Job } from '@/model/job'
import { User } from '@/model/user'
import { api } from '@/services/api'
import { useQuery } from '@tanstack/react-query'

type candidateProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type LoggedContext = {
  user?: User
  candidates: {
    isLoading: boolean
    error: any
    candidates?: Candidate[]
  }
  jobs?: {
    isLoading: boolean
    error: any
    data?: Job[]
  }
  setLoginData: (user?: User) => void
}

export const loggedContext = createContext({} as LoggedContext)

export const LoggedProvider = ({ children }: candidateProviderProps) => {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<User>(
    LocalStorageKeys.CANDIDATE,
    {} as User | Record<string, any>
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

  const {
    data: jobs,
    isLoading: isLoadingJobs,
    error: errorJobs,
  } = useQuery({
    queryKey: [Services.LISTA_VAGA],
    queryFn: async () => (await api.get(Services.LISTA_VAGA)).data,
  })

  const filteredJobs = useMemo(() => {
    if (user?.tipo === UserType.CANDIDATE || user?.tipo === UserType.COMPANY) {
      return jobs
    }

    return jobs?.filter((job: Job) => job?.id_recrutador === user?.id)
  }, [jobs, user?.id, user?.tipo])

  console.log('user', user)
  console.log('candidates', candidates)
  console.log('filteredJobs', filteredJobs)

  const setLoginData = useCallback(
    (user?: User) => {
      setUser(_ => {
        setLocalStorageValue(user || {})
        return user || {}
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
      jobs: {
        isLoading: isLoadingJobs,
        error: errorJobs,
        data: filteredJobs || [],
      },

      setLoginData,
    }),
    [
      user,
      isLoadingCandidates,
      errorCandidantes,
      candidates,
      isLoadingJobs,
      errorJobs,
      filteredJobs,
      setLoginData,
    ]
  )

  return (
    <loggedContext.Provider value={loggedContextMemo}>
      {children}
    </loggedContext.Provider>
  )
}