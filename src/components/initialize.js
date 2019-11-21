
'use strict'
import { loginKey } from '../config.json'
import { Component, Suspense, lazy } from 'react'

import { connect } from 'react-redux'

class Initialize extends Component {
  onComponentDidMount () {
    const loggedIn = window.sessionStorage.getItem(loginKey) ||
      window.localStorage.getItem(loginKey) // fails to null
    this.props.setInitialized()
    this.props.setLoggedIn(loggedIn)
  }

  render () {
    const { isInitlialized, isLoggedIn } = this.props

    const Softphone = () => isInitlialized && isLoggedIn
      ? lazy(() => import('./app'))
      : lazy(() => import('./login'))

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <Softphone />
      </Suspense>
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

export default connect(mapStateToProps, mapDispatchToProps)(Initialize)
