
import { combineReducers } from 'redux'
// import reducerRegistry from './reducerRegistry'

import { baseReducer } from './base/reducer'
import { appReducer } from './app/reducer'

export const Reducer = combineReducers({
  base: baseReducer,
  app: appReducer
})

// reducerRegistry.register('state', navigationReducer)
