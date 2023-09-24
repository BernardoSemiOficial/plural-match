import { style } from '@vanilla-extract/css'

export const container = style({
  width: '100%',
  height: '32px',
  paddingInline: '24px',
  backgroundColor: '#BA2649',
  display: 'flex',
  alignItems: 'center',
})

export const content = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 auto',
  maxWidth: '1200px',
})

export const title = style({
  fontSize: '16px',
  color: '#FDF7F8',
  fontFamily: 'Bebas Neue, sans-serif',
  letterSpacing: '1.25px',
  textAlign: 'center',
})
