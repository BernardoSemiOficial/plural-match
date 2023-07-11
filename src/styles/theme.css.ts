import { Screens } from '@/enums/screens'
import {
  createGlobalTheme,
  createTheme,
  createThemeContract,
} from '@vanilla-extract/css'

const hexColors = {
  white: {
    900: '#ffffff',
  },
  black: {
    500: '#695F44',
    800: '#171308',
    900: '#000000',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  yellow: {
    500: '#ECD699',
    700: '#E8C051',
  },
  amber: {
    700: '#B5963F',
  },
}
const fontFamily = 'Ubuntu, sans-serif'
const fontWeight = {
  regular: '400',
  bold: '700',
}
const fontStyle = {
  italic: 'italic',
  normal: 'normal',
}
const fontLetterSpacing = {
  large: '0.08em',
  medium: '0.025em',
  small: '0.008em',
}

const globalTheme = createGlobalTheme(':root', {
  color: {
    white: {
      900: '#ffffff',
    },
    black: {
      500: '#695F44',
      800: '#171308',
      900: '#000000',
    },
    brown: {
      600: '#61583F',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    yellow: {
      500: '#ECD699',
      700: '#E8C051',
    },
    amber: {
      700: '#B5963F',
    },
  },
  content: {
    max: '700px',
  },
  container: {
    max: '1140px',
  },
  transition: {
    ease: '0.3s ease',
    linear: '1s linear',
  },
  borderRadius: {
    small: '4px',
    xsmall: '8px',
    xxsmall: '12px',
    xxxsmall: '16px',
    medium: '20px',
    xmedium: '24px',
  },
  boxShadow: {
    small: '0px 10px 5px -2px rgba(0, 0, 0, 0.1)',
  },
  border: {
    small: '1px solid',
    medium: '2px solid',
  },
  font: {
    family: fontFamily,
    style: fontStyle,
    letterSpacing: fontLetterSpacing,
    weightRegular: fontWeight.regular,
    weightBold: fontWeight.bold,
    headlineLarge: `${fontWeight.bold} 2.625rem/3.5rem ${fontFamily}`,
    headlineLargeX: `${fontWeight.bold} 2.25rem/3rem ${fontFamily}`,
    headlineLargeXX: `${fontWeight.bold} 2rem/2.5rem ${fontFamily}`,
    headlineMedium: `${fontWeight.bold} 1.75rem/2.25rem ${fontFamily}`,
    headlineSmall: `${fontWeight.bold} 1.625rem/2.25rem ${fontFamily}`,
    headlineSmallX: `${fontWeight.bold} 1.375rem/1.75rem ${fontFamily}`,
    subtitleLarge: `${fontWeight.bold} 1.25rem/1.75rem ${fontFamily}`,
    subtitleMedium: `${fontWeight.bold} 1.125rem/1.5rem ${fontFamily}`,
    bodyLarge: `${fontWeight.regular} 1.125rem/1.75rem ${fontFamily}`,
    bodyMedium: `${fontWeight.regular} 1rem/1.5rem ${fontFamily}`,
    bodySmall: `${fontWeight.regular} 0.875rem/1.5rem ${fontFamily}`,
    linkLarge: `${fontWeight.bold} 1.125rem/1.75rem ${fontFamily}`,
    linkMedium: `${fontWeight.bold} 1rem/1.5rem ${fontFamily}`,
    linkSmall: `${fontWeight.bold} 0.875rem/1.5rem ${fontFamily}`,
    textCaption: `${fontWeight.regular} 0.75rem/1.25rem ${fontFamily}`,
  },
  screens: {
    xs: Screens.mobileXS,
    sm: Screens.mobileSM,
    md: Screens.tabletMD,
    lg: Screens.tabletLG,
    xl: Screens.desktopXL,
    xlg: Screens.desktopXLG,
    fhd: Screens.desktopFHD,
  },
  spacing: {
    none: '0',
    small: '4px',
    xsmall: '8px',
    xxsmall: '12px',
    xxxsmall: '16px',
    medium: '20px',
    xmedium: '24px',
    xxmedium: '28px',
    xxxmedium: '32px',
    large: '36px',
    xlarge: '40px',
    xxlarge: '44px',
    xxxlarge: '48px',
  },
  zIndex: {
    toggleThemeBall: '5',
  },
})

const colors = createThemeContract({
  primary: null,
  secondary: null,
  background: null,
  tertiary: null,
  gray: hexColors.gray,
  text: {
    normal: null,
    dimmed: null,
  },
})

export const vars = { ...globalTheme, colors }
// export const vars = { ...globalTheme, color: colors }

export const lightTheme = createTheme(colors, {
  primary: hexColors.yellow[700],
  secondary: hexColors.black[900],
  background: hexColors.white[900],
  tertiary: hexColors.amber[700],
  gray: hexColors.gray,
  text: {
    normal: hexColors.gray[800],
    dimmed: hexColors.gray[500],
  },
})

export const darkTheme = createTheme(colors, {
  primary: hexColors.yellow[700],
  secondary: hexColors.white[900],
  background: hexColors.black[900],
  tertiary: hexColors.amber[700],
  gray: hexColors.gray,
  text: {
    normal: hexColors.gray[50],
    dimmed: hexColors.gray[300],
  },
})
