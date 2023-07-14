import { style } from '@vanilla-extract/css'

export const container = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '24px',
  maxHeight: '900px',
  maxWidth: '400px',
  alignSelf: 'center',
})

export const containerButton = style({
  display: 'flex',
  flexDirection: 'column',
})

export const buttonPrimary = style({
  marginBottom: 8,
})

export const title = style({
  fontSize: '20px',
  color: '#141200',
  fontFamily: 'Roboto',
})

export const description = style({
  fontSize: '16px',
  color: '#141200',
  fontFamily: 'Roboto',
  marginTop: 16,
})
