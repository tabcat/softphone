
import { combineReducers } from 'redux'

import { barReducer } from './bar/reducer'
import { contentReducer } from './content/reducer'
import { drawerReducer } from './drawer/reducer'

export const appReducer = combineReducers({
  bar: barReducer,
  content: contentReducer,
  drawer: drawerReducer
})
