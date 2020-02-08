
import { combineReducers } from 'redux'
// import reducerRegistry from './reducerRegistry'

// import { barReducer } from './bar/reducer'
import { baseReducer } from './base/reducer'
import { contactsReducer } from './contacts/reducer'
import { contentReducer } from './content/reducer'
import { drawerReducer } from './drawer/reducer'
import { messagesReducer } from './messages/reducer'
import { profileReducer } from './profiles/reducer'

export const Reducer = combineReducers({
  // bar: barReducer,
  base: baseReducer,
  contacts: contactsReducer,
  content: contentReducer,
  drawer: drawerReducer,
  messages: messagesReducer,
  profile: profileReducer
})

// reducerRegistry.register('state', navigationReducer)
