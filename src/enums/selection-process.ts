export enum StagesSelectionProcess {
  ENTREVISTA_CULTURAL = 0,
  ENTREVISTA_TECNICA = 1,
  TESTE_TECNICO = 2,
  APROVADO = 3,
  ENVIO_DOCUMENTACAO = 4,
}

export enum LabelsSelectionProcess {
  ENTREVISTA_CULTURAL = 'Entrevista Cultural',
  ENTREVISTA_TECNICA = 'Entrevista Técnica',
  TESTE_TECNICO = 'Teste técnico',
  APROVADO = 'Aprovado',
  ENVIO_DOCUMENTACAO = 'Envio de documentação',
}

export const stagesSelectionProcess = [
  {
    id: StagesSelectionProcess.ENTREVISTA_CULTURAL,
    label: LabelsSelectionProcess.ENTREVISTA_CULTURAL,
  },
  {
    id: StagesSelectionProcess.ENTREVISTA_TECNICA,
    label: LabelsSelectionProcess.ENTREVISTA_TECNICA,
  },
  {
    id: StagesSelectionProcess.TESTE_TECNICO,
    label: LabelsSelectionProcess.TESTE_TECNICO,
  },
  {
    id: StagesSelectionProcess.APROVADO,
    label: LabelsSelectionProcess.APROVADO,
  },
  {
    id: StagesSelectionProcess.ENVIO_DOCUMENTACAO,
    label: LabelsSelectionProcess.ENVIO_DOCUMENTACAO,
  },
]
