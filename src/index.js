
'use strict'
import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import { AppState } from './state'

import Initialize from './components/Initialize'
import ErrorBoundary from './components/errorBoundary'

import browserUpdate from 'browser-update'
browserUpdate()

const rootElement = document.querySelector('#root')
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