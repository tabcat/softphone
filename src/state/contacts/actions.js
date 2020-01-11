
export const contactsActionTypes = {
  ADD_CONTACT: 'ADD_CONTACT',
  ADDED_CONTACT: 'ADDED_CONTACT',
  ADD_CONTACT_FAIL: 'ADD_CONTACT_FAIL',
  ACCEPT_CONTACT: 'ACCEPT_CONTACT',
  ACCEPTED_CONTACT: 'ACCEPTED_CONTACT',
  ACCEPT_CONTACT_FAIL: 'ACCEPT_CONTACT_FAIL',
  UPDATE_CONTACT_LIST: 'UPDATE_CONTACT_LIST',
  UPDATE_REQUEST_LIST: 'UPDATE_REQUEST_LIST',
  SET_CONTACT_LIST: 'SET_CONTACT_LIST',
  SET_REQUEST_LIST: 'SET_REQUEST_LIST',
  SHOW_CONTACT_LIST: 'SHOW_CONTACT_LIST',
  SELECT_CONTACT: 'SELECT_CONTACT',
  INITIALIZED_CONTACTS: 'INITIALIZED_CONTACTS',
  SET_CONTACTS_TAB_INDEX: 'SET_CONTACTS_TAB_INDEX',
  SET_ADD_CONTACT_DIALOG_OPEN: 'SET_ADD_CONTACT_DIALOG_OPEN'
}
const {
  ADD_CONTACT,
  ADDED_CONTACT,
  ADD_CONTACT_FAIL,
  ACCEPT_CONTACT,
  ACCEPTED_CONTACT,
  ACCEPT_CONTACT_FAIL,
  UPDATE_CONTACT_LIST,
  UPDATE_REQUEST_LIST,
  SET_CONTACT_LIST,
  SET_REQUEST_LIST,
  SHOW_CONTACT_LIST,
  SELECT_CONTACT,
  INITIALIZED_CONTACTS,
  SET_CONTACTS_TAB_INDEX,
  SET_ADD_CONTACT_DIALOG_OPEN
} = contactsActionTypes

export const contactsActionCreators = {
  addContact: (address) =>
    ({ type: ADD_CONTACT, payload: { address } }),
  addedContact: (sessionId) =>
    ({ type: ADDED_CONTACT, payload: { sessionId } }),
  addContactFail: () =>
    ({ type: ADD_CONTACT_FAIL }),
  acceptContact: (sessionId) =>
    ({ type: ACCEPT_CONTACT, payload: { sessionId } }),
  acceptedContact: (sessionId) =>
    ({ type: ACCEPTED_CONTACT, payload: { sessionId } }),
  acceptContactFail: () =>
    ({ type: ACCEPT_CONTACT_FAIL }),
  updateContactList: () =>
    ({ type: UPDATE_CONTACT_LIST }),
  updateRequestList: () =>
    ({ type: UPDATE_REQUEST_LIST }),
  setContactList: (contactList) =>
    ({ type: SET_CONTACT_LIST, payload: { contactList } }),
  setRequestList: (requestList) =>
    ({ type: SET_REQUEST_LIST, payload: { requestList } }),
  showContactList: () =>
    ({ type: SHOW_CONTACT_LIST }),
  selectContact: (sessionId) =>
    ({ type: SELECT_CONTACT, payload: { sessionId } }),
  initializedContacts: () =>
    ({ type: INITIALIZED_CONTACTS }),
  setTabIndex: (tabIndex) =>
    ({ type: SET_CONTACTS_TAB_INDEX, payload: { tabIndex } }),
  setAddContactDialogOpen: (open) =>
    ({ type: SET_ADD_CONTACT_DIALOG_OPEN, payload: { open } })
}
