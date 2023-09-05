import { createUUID } from '@/helpers/createUUID'

export const SELECTIVE_PROCESS_STEPS = [
  {
    id: createUUID(),
    title: 'Teste técnico',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    links: 'github.com/teste-tecnico',
    status: 'approved',
    updated_at: '10/10/2023',
  },
  {
    id: createUUID(),
    title: 'Entrevista técnica',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.',
    links: 'google.meet/AI8U43ASD',
    status: 'inProgress',
    updated_at: '20/10/2023',
  },
]
