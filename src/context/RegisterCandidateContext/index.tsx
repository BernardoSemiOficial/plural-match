import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { PublicRoutes } from '@/enums/routes'
import { useRouter } from 'next/router'

type RegisterCandidateProviderProps = {
  children: ReactNode
}

type RegisterCandidateContext = {
  candidate: object
  stepsLength: number
  activeStep: number
  handleClickNextStep: () => void
  handleClickBackStep: () => void
}

export const RegisterCandidateContext = createContext(
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

  const [candidate, setCandidate] = useState({})
  const [activeStep, setActiveStep] = useState(registerCandidateRouteIndex)

  useEffect(() => {
    const registerCandidateRouteIndex = registerCandidateRoutes.findIndex(
      (route: PublicRoutes) => route === router.pathname
    )
    setActiveStep(registerCandidateRouteIndex)
  }, [router.pathname])

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

  const setCandidateData = useCallback(candidate => {
    setCandidate(currentCandidateData => ({
      ...currentCandidateData,
      candidate,
    }))
  }, [])

  const candidateContext = useMemo(
    () => ({
      stepsLength,
      activeStep,
      candidate,
      handleClickNextStep,
      handleClickBackStep,
      setCandidateData,
    }),
    [
      activeStep,
      candidate,
      handleClickBackStep,
      handleClickNextStep,
      setCandidateData,
    ]
  )

  return (
    <RegisterCandidateContext.Provider value={candidateContext}>
      {children}
    </RegisterCandidateContext.Provider>
  )
}
