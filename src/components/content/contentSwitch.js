
import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../errorBoundary'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'
import { contentSelectors } from '../../state'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  }
}))

const contentComponents = {
  // Profile: lazy(() => import('../profile')),
  // Contacts: lazy(() => import('../contacts')),
  // Messages: lazy(() => import('../messages'))
}

function ContentSwitch (props) {
  const classes = useStyles()

  if (!props.selected) {
    console.error('no content selected')
  }

  const renderContent = (selected) => {
    if (!selected || !contentComponents[selected]) return null
    return contentComponents[selected]
  }

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <Suspense fallback={<p style={{ color: 'white' }}>Loading...</p>}>
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
