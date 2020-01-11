
import { contentActionTypes, baseActionTypes } from './actions'
const { SELECT_CONTENT } = contentActionTypes
const { LOGGED_OUT } = baseActionTypes

const INITIAL_STATE = {
  selected: 'profile'
}

export function contentReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case SELECT_CONTENT:
      return { ...state, selected: payload.selected }
    case LOGGED_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}
