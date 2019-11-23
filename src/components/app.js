
import React from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'

import AppDrawer from './drawer'
import AppBar from './bar'
import AppContent from './content'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    height: '100%'
  }
}))

function App (props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <AppDrawer />
      <main className={classes.content}>
        <AppContent />
      </main>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default App
