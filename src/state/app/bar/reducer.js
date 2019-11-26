
import { barActionTypes } from './actions'
const { SET_DISPLAY } = barActionTypes

const INITIAL_STATE = {
  title: '',
  display: true
}

export function barReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case SET_DISPLAY:
      return { ...state, display: Boolean(payload.display) }
    default:
      return state
  }
}
