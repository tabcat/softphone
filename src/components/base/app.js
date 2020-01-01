
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Theme from './theme'

import Drawer from '../drawer'
import Bar from '../bar'
import Content from '../content'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
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
      <Theme>
        <Bar />
        <Drawer />
        <main className={classes.content}>
          <Content />
        </main>
      </Theme>
    </div>
  )
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default App
