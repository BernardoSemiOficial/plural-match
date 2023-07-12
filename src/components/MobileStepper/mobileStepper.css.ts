import { style } from '@vanilla-extract/css'

export const container = style({
  width: '100%',
  marginBlock: '5px',
})

export const stepper = style({
  position: 'relative',
  width: '100%',
  height: '8px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#D9D9D9',
})

export const progress = style({
  width: '0%',
  height: '8px',
  display: 'inline-block',
  borderRadius: '5px',
  position: 'absolute',
  left: '0px',
  backgroundColor: '#BA2649',
  transition: '0.3s ease',
  border: 'none',
})
