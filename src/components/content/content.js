
import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { connect } from 'react-redux'

import ContentSwitch from './contentSwitch'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  toolbar: theme.mixins.toolbar,
  appContent: {
    flexGrow: 1
  }
}))

function AppContent (props) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <div className={classes.root}>
      {props.visibleAppBar ? <div className={classes.toolbar} /> : null}
      <div className={classes.appContent}>
        <ContentSwitch />
      </div>
    </div>
  )
}

const mapStateToProps = s => {
  return {
    visibleAppBar: appBarSelectors(s).visible
  }
}

AppContent.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps
)(AppContent)
