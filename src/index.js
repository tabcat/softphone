
import React from 'react'
import { render } from 'react-dom'
import './index.css'

import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { State } from './state'

import CssBaseline from '@material-ui/core/CssBaseline'
import Initialize from './components/initialize'
import ErrorBoundary from './components/errorBoundary'

const rootElement = document.getElementById('root')
if (rootElement) {
  render(
    <ErrorBoundary>
      <CssBaseline />
      <Provider store={State}>
        <Initialize />
      </Provider>
    </ErrorBoundary>,
    rootElement
  )
}

serviceWorker.register()
