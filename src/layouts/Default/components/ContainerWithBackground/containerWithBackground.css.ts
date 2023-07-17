import { greaterThan } from '@/styles/responsive.css'
import { style } from '@vanilla-extract/css'

const headerHeight = '32px'

export const container = style([
  {
    width: '100%',
    minHeight: `calc(100vh - ${headerHeight})`,
    paddingBlock: '45px',
    paddingInline: '35px',
    background: 'url(/assets/woman-working-desktop.png) no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
])

export const content = style([
  {
    position: 'relative',
    bottom: '30px',
  },
  greaterThan({
    tabletMD: { position: 'static' },
  }),
])

export const actions = style([
  {
    position: 'absolute',
    bottom: '0px',
    paddingBottom: '30px',
    paddingInline: '30px',
    width: '100%',
  },
  greaterThan({
    tabletMD: { position: 'static', marginTop: '50px' },
  }),
])
