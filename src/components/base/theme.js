
import React from 'react'
// import useMediaQuery from '@material-ui/core/useMediaQuery'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

export default function Theme (props) {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: 'dark'
      }
    })
    // [prefersDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  )
}
