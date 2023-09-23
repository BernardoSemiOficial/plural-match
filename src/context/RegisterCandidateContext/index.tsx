import {
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { PublicRoutes } from '@/enums/routes'
import { useRouter } from 'next/router'

type SelectionProcess = {
  id?: number
  name?: string
  descricao_etapa_processo_seletivo?: string
  link_util?: string
}

type Job = {
  id_vaga?: number
  id_recrutador?: number
  titulo_vaga?: string
  descricao?: string
  modelo_trabalho?: string
  modelo_contratacao?: string
  faixa_salarial?: string
  situacao_vulnerabilidade?: string
  candidatos?: number[]
  etapas_processo_seletivo?: SelectionProcess[]
}

type Candidate = {
  id?: number
  email?: string
  senha?: string
  nome?: string
  nomeSocial?: string
  dataNascimento?: string
  sexo?: string
  orientacaoSexual?: string
  etnia?: string
  classeSocial?: string
  deficiencia?: string
  profissao?: string
  modeloTrabalho?: string
  modeloContratacao?: string
  pretensaoSalarial?: number
  softSkills?: string[]
  hardSkills?: string[]
  vagasSelecionadas?: {
    etapaId: number
    vaga: Job
  }[]
}

type RegisterCandidateProviderProps = {
  children: ReactElement | ReactNode
  // ReactElement<any, string | JSXElementConstructor<any>>'
}

type RegisterCandidateContext = {
  candidate: Candidate
  stepsLength: number
  activeStep: number
  setCandidateData: (candidate: Candidate) => void
  handleClickNextStep: () => void
  handleClickBackStep: () => void
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
      ...candidate,
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
    <registerCandidateContext.Provider value={candidateContext}>
      {children}
    </registerCandidateContext.Provider>
  )
}
