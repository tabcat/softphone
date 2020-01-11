
import { contactsActionTypes, baseActionTypes } from '../actions'
const {
  SET_CONTACT_LIST,
  SET_REQUEST_LIST,
  SHOW_CONTACT_LIST,
  SELECT_CONTACT,
  INITIALIZED_CONTACTS,
  SET_CONTACTS_TAB_INDEX,
  SET_ADD_CONTACT_DIALOG_OPEN
} = contactsActionTypes
const { LOGGED_OUT } = baseActionTypes

const INITIAL_STATE = {
  initialized: false,
  selected: null,
  contactList: [],
  requestList: [],
  tabIndex: 0,
  addContactDialogOpen: false
}

export function contactsReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case INITIALIZED_CONTACTS:
      return { ...state, initialized: true }
    case SET_CONTACT_LIST:
      return { ...state, contactList: [...payload.contactList] }
    case SET_REQUEST_LIST:
      return { ...state, requestList: [...payload.requestList] }
    case SELECT_CONTACT:
      return { ...state, selected: payload.sessionId }
    case SHOW_CONTACT_LIST:
      return { ...state, selected: null }
    case SET_CONTACTS_TAB_INDEX:
      return { ...state, tabIndex: payload.tabIndex }
    case SET_ADD_CONTACT_DIALOG_OPEN:
      return { ...state, addContactDialogOpen: payload.open }
    case LOGGED_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}
