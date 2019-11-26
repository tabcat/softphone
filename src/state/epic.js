
import { combineEpics } from 'redux-observable'

import { baseEpic } from './base/epic'
import { appEpic } from './app/epic'

export const Epic = combineEpics(
  baseEpic,
  appEpic
)
