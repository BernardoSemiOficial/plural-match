import type { StyleRule } from '@vanilla-extract/css'

export enum Screens {
  mobileXS = '360px',
  mobileSM = '480px',
  tabletMD = '768px',
  tabletLG = '976px',
  desktopXL = '1280px',
  desktopXLG = '1440px',
  desktopFHD = '1920px',
}

export type KeyMediaQueries =
  | 'screen and (min-width: 360px)'
  | 'screen and (min-width: 480px)'
  | 'screen and (min-width: 768px)'
  | 'screen and (min-width: 976px)'
  | 'screen and (min-width: 1280px)'
  | 'screen and (min-width: 1440px)'
  | 'screen and (min-width: 1920px)'

export type MediaQueries = {
  [key in KeyMediaQueries]: StyleRule | undefined
}

export type MediaQueriesNotUndefined = {
  [key in KeyMediaQueries]: StyleRule
}

export type keyScreens = keyof typeof Screens
