import { greaterThan } from '@/styles/responsive.css'
import { globalStyle } from '@vanilla-extract/css'

import { vars } from './theme.css'

globalStyle('*', {
  boxSizing: 'border-box',
})

globalStyle('html, body', {
  fontFamily: 'Ubuntu, sans-serif',
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

globalStyle('h1, h2, h3, h4, h5, h6, p', {
  margin: vars.spacing.none,
})
