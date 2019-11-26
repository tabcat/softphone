
import React, { Suspense, lazy } from 'react'

import { connect } from 'react-redux'
import { baseSelectors } from '../state'

const Login = lazy(() => import('./login'))
const App = lazy(() => import('./app'))

class Initialize extends React.Component {
  render () {
    const { initlialized, active } = this.props
    // const Softphone = () => initlialized && active
    //   ? lazy(() => import('./app'))
    //   : lazy(() => import('./login'))

    return (
      <Suspense fallback={<p style={{ color: 'white' }}>Loading...</p>}>
        {initlialized && active ? <App /> : <Login />}
      </Suspense>
    )
  }
}

const mapStateToProps = s => {
  return {
    initialized: baseSelectors.initialized(s),
    active: baseSelectors.active(s)
  }
}

export default connect(mapStateToProps)(Initialize)
