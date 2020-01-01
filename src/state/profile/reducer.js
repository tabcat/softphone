
import { contentActionTypes } from './actions'
const { SELECT_CONTENT } = contentActionTypes

const INITIAL_STATE = {
  selected: 'profile'
}

export function contentReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case SELECT_CONTENT:
      return { ...state, selected: payload.selected }
    default:
      return state
  }
}
