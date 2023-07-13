import { style } from '@vanilla-extract/css'

export const container = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '24px',
  maxHeight: '768px',
  maxWidth: '481px',
  alignSelf: 'center',
})
