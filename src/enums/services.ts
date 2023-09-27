export enum Services {
  LOGIN = 'login', // ok

  LISTA_CANDIDATOS = 'lista-candidato', // ok
  CADASTRA_CANDIDATO = 'cadastra-candidato', // falta testar
  ATRELA_CANDIDATO_VAGA = 'atrela-candidato-vaga',

  LISTA_EMPRESAS = 'lista-empresa', // não precisa
  CADASTRA_EMPRESA = 'cadastra-empresa', //ok

  LISTA_RECRUTADORES = 'lista-recrutador', // ok
  CADASTRA_RECRUTADOR = 'cadastra-recrutador', // ok

  LISTA_VAGA = 'lista-vagas', // ok
  CADASTRA_VAGA = 'cadastra-vaga', // ok
  ATUALIZA_VAGA = 'atualiza-vaga', // por último
  ATUALIZA_STATUS_VAGA = 'altera-status-processo', // por último
  DELETA_VAGA = 'deleta-vaga',

  GERAR_RELATORIO = 'relatorio-candidatos',
}
