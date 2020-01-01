
import { messagesActionTypes } from './actions'
const { SELECT_CONTENT } = messagesActionTypes

const INITIAL_STATE = {
  initialized: false,
  selected: null,
  feeds: {},
  scrolls: {},
  sendboxes: {}
}

export function messagesReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case SET_FEED:
      return { ...state, selected: payload.selected }
    default:
      return state
  }
}
