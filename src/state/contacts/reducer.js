
import { contactsActionTypes } from './actions'
const { SET_CONTACTS } = contactsActionTypes

const INITIAL_STATE = {}

export function contactsReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case SET_CONTACTS:
      return { ...payload.contacts }
    default:
      return state
  }
}
