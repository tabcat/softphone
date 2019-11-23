
'use strict'
import { Component, Suspense, lazy } from 'react'

import { connect } from 'react-redux'
import { baseSelectors, baseActionCreators } from '../state'

class Initialize extends Component {
  render () {
    const { initlialized, active } = this.props

    const Softphone = () => initlialized && active
      ? lazy(() => import('./app'))
      : lazy(() => import('./login'))

    return (
      <Suspense fallback={<p style='color: white;'>Loading...</p>}>
        <Softphone />
      </Suspense>
    )
  }
}

const mapStateToProps = s => {
  return {
    initialized: baseSelectors.initlialized(s),
    active: baseSelectors.active(s)
  }
}

const mapDispatchToProps = {
  initialize: baseActionCreators.initialize
}

export default connect(mapStateToProps, mapDispatchToProps)(Initialize)
