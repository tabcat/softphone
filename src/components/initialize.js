
import React, { Suspense, lazy } from 'react'

import { connect } from 'react-redux'
import { baseSelectors, baseActionCreators } from '../state'

const Login = lazy(() => import('./base/login'))
const App = lazy(() => import('./base/app'))

class Initialize extends React.Component {
  componentDidMount () { this.props.initialize() }

  render () {
    const { initialized, loggedIn } = this.props

    return (
      <Suspense fallback={<p style={{ color: 'white' }}>Loading...</p>}>
        {initialized && loggedIn ? <App /> : <Login />}
      </Suspense>
    )
  }
}

const mapStateToProps = s => {
  return {
    initialized: baseSelectors.initialized(s),
    // active: baseSelectors.active(s),
    loggedIn: baseSelectors.loggedIn(s)
  }
}

const mapDispatchToProps = {
  initialize: baseActionCreators.initialize
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Initialize)
