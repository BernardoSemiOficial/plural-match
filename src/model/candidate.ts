import { StatusStep } from './step'

type SelectionProcess = {
  id?: number
  name?: string
  descricao_etapa_processo_seletivo?: string
  link_util?: string
  status?: StatusStep
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

export type Candidate = {
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
  cidade?: string
  estado?: string
  sobre?: string
  experienciaProfissional?: string
  experienciaAcademica?: string
  sonhosObjetivos?: string
  pretensaoSalarial?: string
  softSkills?: string[]
  hardSkills?: string[]
  vagasSelecionadas?: {
    etapaId: number
    vaga: Job
  }[]
}
