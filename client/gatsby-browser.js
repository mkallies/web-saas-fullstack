import React from 'react'
import {
  ThemeProvider,
  ColorModeProvider,
  CSSReset,
  theme,
} from '@chakra-ui/core'

export const wrapRootElement = ({ element }) => (
  <ThemeProvider theme={theme}>
    <CSSReset />
    <ColorModeProvider>{element}</ColorModeProvider>
  </ThemeProvider>
)
