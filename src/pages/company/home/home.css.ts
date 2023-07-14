import { style } from '@vanilla-extract/css'

export const container = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  maxHeight: '768px',
  maxWidth: '481px',
  alignSelf: 'center',
})

export const buttonAdd = style({
  position: 'absolute',
  bottom: 24,
  right: 24,
})

export const modal = style({
  display: 'flex',
})

export const containerModal = style({
  padding: 24,
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  backgroundColor: 'white',
  borderRadius: 8,
})
