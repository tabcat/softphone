
'use strict'
import { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'

const styles = theme => ({
  root: {
    display: 'flex'
  }
})

class Template0 extends Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root} />
    )
  }
}

const mapStateToProps = s => {
  return {
  }
}

const mapDispatchToProps = s => {
  return {
  }
}

Template0.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(Template0))
