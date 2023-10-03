import { Candidate } from '@/model/candidate'

export const joinDeclartion = ({ candidate }: { candidate: Candidate }) => {
  const infos = [
    candidate.sexo,
    candidate.orientacaoSexual,
    candidate.etnia,
    candidate.classeSocial,
    candidate.deficiencia,
  ]
  const concatInfo = infos
    .filter(info => info !== 'nenhuma')
    .reduce((concatInfo, info, idx, array) => {
      if (info) concatInfo += info
      if (idx < array.length - 2) concatInfo += ', '
      if (idx === array.length - 2) concatInfo += ' e '
      return concatInfo
    }, '')

  return concatInfo
}
