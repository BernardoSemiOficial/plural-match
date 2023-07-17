import { greaterThan } from '@/styles/responsive.css'
import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('html, body', {
  margin: 0,
  padding: 0,
  fontSize: '87.5%',
  ...greaterThan({
    desktopXL: {
      fontSize: '100%',
    },
  }),
})

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
})

globalStyle('button', {
  cursor: 'pointer',
  backgroundColor: '#ffffff',
})

globalStyle('li', {
  listStyle: 'none',
})
