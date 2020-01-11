
import { combineEpics } from 'redux-observable'

// import { barEpic } from './bar/epic'
import { baseEpic } from './base/epic'
import { contactsEpic } from './contacts/epic'
// import { contentEpic } from './content/epic'
// import { drawerEpic } from './drawer/epic'
// import { messagesEpic } from './messages/epic'
// import { profileEpic } from './profile/epic'

export const Epic = combineEpics(
  baseEpic,
  contactsEpic
  // appEpic
)
