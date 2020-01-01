
import React from 'react'
import PropTypes from 'prop-types'
import { useTheme, makeStyles } from '@material-ui/core/styles'

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
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
}))

function Content (props) {
  const theme = useTheme()
  const classes = useStyles(theme)

  return (
    <div className={classes.root}>
      {!props.visibleAppBar ? <div className={classes.toolbar} /> : null}
      <div className={classes.appContent}>
        <ContentSwitch />
      </div>
    </div>
  )
}

const mapStateToProps = s => {
  return {
    // visibleAppBar: appBarSelectors(s).visible
  }
}

Content.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps
)(Content)
