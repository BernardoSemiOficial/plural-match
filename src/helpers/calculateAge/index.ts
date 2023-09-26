export function calculateAge(dataNascimento: string) {
  const partes =
    (dataNascimento?.includes('/') && dataNascimento.split('/')) ||
    (dataNascimento?.includes('-') && dataNascimento.split('-')) ||
    []
  const dia = parseInt(partes[2])
  const mes = parseInt(partes[1])
  const ano = parseInt(partes[0])

  const dataAtual = new Date()

  const diaAtual = dataAtual.getDate()
  const mesAtual = dataAtual.getMonth() + 1 // Mês começa em 0
  const anoAtual = dataAtual.getFullYear()

  let idade = anoAtual - ano

  // Verificar se o aniversário já ocorreu este ano
  if (mesAtual < mes || (mesAtual === mes && diaAtual < dia)) idade--

  return String(idade)
}
