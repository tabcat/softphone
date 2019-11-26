
import { contentActionTypes } from './actions'
const { SET_CONTENT } = contentActionTypes

const INITIAL_STATE = {
  content: 'profile'
}

export function contentReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case SET_CONTENT:
      return { ...state, content: payload.content }
    default:
      return state
  }
}
