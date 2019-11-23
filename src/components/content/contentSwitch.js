
import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from './errorBoundary'
import { makeStyles } from '@material-ui/core/styles'

import { connect } from 'react-redux'

import contentComponents from './contentComponents'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%'
  }
}))

function App (props) {
  const classes = useStyles()

  if (!props.content || !props.content.selected) {
    console.error('no content selected')
  }

  const renderContent = (content) => {
    if (!content || !content.selected) return null
    if (!contentComponents[content.selected]) return null
    return lazy(() => import(contentComponents[content.selected]))
  }

  return (
    <div className={classes.root}>
      <ErrorBoundary>
        <Suspense fallback={<p style='color: white;'>Loading...</p>}>
          {renderContent(props.content)}
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}

const mapStateToProps = s => {
  return {

  }
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object)
}

export default connect(
  mapStateToProps
)(App)
