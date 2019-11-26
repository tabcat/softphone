
import React from 'react'
import { render } from 'react-dom'

import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { State } from './state'

import Initialize from './components/initialize'
import ErrorBoundary from './components/errorBoundary'

const rootElement = document.getElementById('root')
if (rootElement) {
  render(
    <ErrorBoundary>
      <Provider store={State}>
        <Initialize />
      </Provider>
    </ErrorBoundary>,
    rootElement
  )
}

serviceWorker.register()
