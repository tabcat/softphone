
'use strict'
import React from 'react'
import { render } from 'react-dom'

import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import { AppState } from './state'

import Initialize from './components/Initialize'
import ErrorBoundary from './components/errorBoundary'

const rootElement = document.getElementById('root')
if (rootElement) {
  render(
    <ErrorBoundary>
      <Provider store={AppState}>
        <Initialize />
      </Provider>
    </ErrorBoundary>,
    rootElement
  )
}

serviceWorker.register()
