import { Company } from './company'

export type Job = {
  vaga: {
    id_vaga?: number
    id_recrutador?: number
    titulo_vaga?: string
    descricao?: string
    modelo_trabalho?: string
    modelo_contratacao?: string
    faixa_salarial?: string
    situacao_vulnerabilidade?: string
    etapas_processo_seletivo?: JobStep[]
  }
  empresa: Company
}

export type JobStep = {
  id?: number
  name?: string
  descricao_etapa_processo_seletivo?: string
  link_util?: string
}
