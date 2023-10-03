import { MOCK_DEFICIENCIES } from './deficiencies'
import { MOCK_ETHNICITY } from './ethnicity'
import { MOCK_GENDERS } from './gender'
import { MOCK_SEXUAL_ORIENTATION } from './sexualOrientation'
import { MOCK_SOCIAL_CLASS } from './socialClass'

export const candidateFilters = [
  // {
  //   category: 'Etapas',
  //   // items: [
  //   //   { id: 1, label: 'processo seletivo em andamento', filter: '' },
  //   //   { id: 2, label: 'convites', filter: '' },
  //   //   { id: 3, label: 'candidatos', filter: '' },
  //   // ],
  // },
  {
    category: 'Etnia',
    items: MOCK_ETHNICITY,
  },
  {
    category: 'Gênero',
    items: MOCK_GENDERS,
  },
  {
    category: 'Deficiência',
    items: MOCK_DEFICIENCIES,
  },
  {
    category: 'Orientação sexual',
    items: MOCK_SEXUAL_ORIENTATION,
  },
  {
    category: 'Classe social',
    items: MOCK_SOCIAL_CLASS,
  },
]
