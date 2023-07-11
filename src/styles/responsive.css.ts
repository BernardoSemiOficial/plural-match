import type { StyleRule } from '@vanilla-extract/css'

interface GreaterThanProps {
  mobileXS?: StyleRule
  mobileSM?: StyleRule
  tabletMD?: StyleRule
  tabletLG?: StyleRule
  desktopXL?: StyleRule
  desktopXLG?: StyleRule
  desktopFHD?: StyleRule
}

/**
 * Gera um padrão de Media Query dos tamanhos de tela solicitadas e que são
 * aceitas pelo Vanilha Extract.
 * Além disso, o seu conceito se baseia em mobile first, por isso é utilizado
 * min-width em todas as Media Query.
 *
 * @param {GreaterThanProps} props - As propriedades do objeto
 * @param {StyleRule} [props.mobileXS] - mobile - tela mínima de 320px
 * @param {StyleRule} [props.mobileSM] - mobile - tela mínima de 480px
 * @param {StyleRule} [props.tabletMD] - tablet - tela mínima de 768px
 * @param {StyleRule} [props.tabletLG] - tablet - tela mínima de 976px
 * @param {StyleRule} [props.desktopXL] - desktop - tela mínima de 1280px
 * @param {StyleRule} [props.desktopXLG] - desktop - tela mínima de 1440px
 * @param {StyleRule} [props.desktopFHD] - desktop - tela mínima de 1920px
 * @returns {Object} Uma propriedade `@media` para os tamanhos de tela mínimo solicitados.
 */
export const greaterThan = ({
  mobileXS,
  mobileSM,
  tabletMD,
  tabletLG,
  desktopXL,
  desktopXLG,
  desktopFHD,
}: GreaterThanProps) => {
  const mediaQueries = {
    ...(mobileXS ? { 'screen and (min-width: 360px)': mobileXS } : {}),
    ...(mobileSM ? { 'screen and (min-width: 480px)': mobileSM } : {}),
    ...(tabletMD ? { 'screen and (min-width: 768px)': tabletMD } : {}),
    ...(tabletLG ? { 'screen and (min-width: 976px)': tabletLG } : {}),
    ...(desktopXL ? { 'screen and (min-width: 1280px)': desktopXL } : {}),
    ...(desktopXLG ? { 'screen and (min-width: 1440px)': desktopXLG } : {}),
    ...(desktopFHD ? { 'screen and (min-width: 1920px)': desktopFHD } : {}),
  }

  return {
    '@media': mediaQueries,
  }
}
