
import { combineEpics } from 'redux-observable'

import { barEpic } from './bar/epic'
import { contentEpic } from './content/epic'
import { drawerEpic } from './drawer/epic'

export const appEpic = combineEpics(
  barEpic,
  contentEpic,
  drawerEpic
)
