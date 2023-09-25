import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { LocalStorageKeys } from '@/enums/local-storage'
import { PublicRoutes } from '@/enums/routes'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Candidate } from '@/model/candidate'
import { useRouter } from 'next/router'

type RegisterCandidateProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type RegisterCandidateContext = {
  candidate: Candidate
  stepsLength: number
  activeStep: number
  setCandidateData: (candidate: Candidate) => void
  clearCandidateStorage: () => void
  handleClickNextStep: () => void
  handleClickBackStep: () => void
  handleClickGoToStep: (stepNumber: number) => void
}

export const registerCandidateContext = createContext(
  {} as RegisterCandidateContext
)

const registerCandidateRoutes = [
  PublicRoutes.CANDIDATE_PERSONAL_INFORMATION,
  PublicRoutes.CANDIDATE_SELF_DECLARATION,
  PublicRoutes.CANDIDATE_PROFESSIONAL_INFORMATION,
  PublicRoutes.CANDIDATE_SOFT_SKILLS,
  PublicRoutes.CANDIDATE_HARD_SKILLS,
  PublicRoutes.CANDIDATE_CREATE_PASSWORD,
]

export const RegisterCandidateProvider = ({
  children,
}: RegisterCandidateProviderProps) => {
  const router = useRouter()

  const stepsLength = 6
  const registerCandidateRouteIndex = registerCandidateRoutes.findIndex(
    (route: PublicRoutes) => route === router.pathname
  )

  const [localStorageValue, setLocalStorageValue] = useLocalStorage<Candidate>(
    LocalStorageKeys.REGISTER_CANDIDATE,
    {} as Candidate
  )
  const [candidate, setCandidate] = useState<Candidate>(localStorageValue)
  const [activeStep, setActiveStep] = useState(registerCandidateRouteIndex)

  console.log('candidato', candidate)

  useEffect(() => {
    if (
      !candidate.email &&
      router.pathname !== PublicRoutes.CANDIDATE_CHECK_MAIL
    )
      router.push(PublicRoutes.CANDIDATE_CHECK_MAIL)

    const registerCandidateRouteIndex = registerCandidateRoutes.findIndex(
      (route: PublicRoutes) => route === router.pathname
    )
    setActiveStep(registerCandidateRouteIndex)
  }, [candidate.email, router, router.pathname])

  const handleClickNextStep = useCallback(() => {
    setActiveStep(prevActiveStep => {
      const newActiveStep = prevActiveStep + 1
      const goToPage = registerCandidateRoutes[newActiveStep]
      router.push(goToPage)
      return newActiveStep
    })
  }, [router])

  const handleClickBackStep = useCallback(() => {
    setActiveStep(prevActiveStep => {
      const newActiveStep = prevActiveStep - 1
      const goToPage = registerCandidateRoutes[newActiveStep]
      router.push(goToPage)
      return newActiveStep
    })
  }, [router])

  const handleClickGoToStep = useCallback(
    stepNumber => {
      setActiveStep(() => {
        const goToPage = registerCandidateRoutes[stepNumber]
        router.push(goToPage)
        return stepNumber
      })
    },
    [router]
  )

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

  const clearCandidateStorage = useCallback(() => {
    setLocalStorageValue({})
  }, [setLocalStorageValue])

  const candidateContextMemo = useMemo(
    () => ({
      stepsLength,
      activeStep,
      candidate,
      handleClickNextStep,
      handleClickBackStep,
      handleClickGoToStep,
      setCandidateData,
      clearCandidateStorage,
    }),
    [
      activeStep,
      candidate,
      handleClickBackStep,
      handleClickNextStep,
      handleClickGoToStep,
      setCandidateData,
      clearCandidateStorage,
    ]
  )

  return (
    <registerCandidateContext.Provider value={candidateContextMemo}>
      {children}
    </registerCandidateContext.Provider>
  )
}
