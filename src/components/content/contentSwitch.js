
import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../errorBoundary'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { contentSelectors } from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%'
  }
}))

const contentComponents = {
  Profile: lazy(() => import('../profile')),
  Contacts: lazy(() => import('../contacts')),
  Messages: lazy(() => import('../messages'))
}

function ContentSwitch (props) {
  const classes = useStyles()

  if (!props.selected) {
    console.error('no content selected')
  }

  const renderContent = (selected) => {
    if (!selected || !contentComponents[selected]) return null
    return React.createElement(contentComponents[selected])
  }

  const loading = (
    <p
      style={{
        display: 'inline',
        color: 'white',
        backgroundColor: 'black',
        margin: 0
      }}
    >
      loading...
    </p>
  )

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <Suspense fallback={loading}>
          {renderContent(props.selected)}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

const mapStateToProps = s => {
  return {
    selected: contentSelectors.selected(s)
  }
}

ContentSwitch.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps
)(ContentSwitch)
