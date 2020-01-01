
export const contactsActionTypes = {
  ADD_CONTACT: 'ADD_CONTACT',
  ADDED_CONTACT: 'ADDED_CONTACT',
  ADD_CONTACT_FAIL: 'ADD_CONTACT_FAIL',
  ACCEPT_CONTACT: 'ACCEPT_CONTACT',
  ACCEPTED_CONTACT: 'ACCEPTED_CONTACT',
  ACCEPT_CONTACT_FAIL: 'ACCEPT_CONTACT_FAIL',
  UPDATE_CONTACTS: 'UPDATE_CONTACTS',
  SET_CONTACTS: 'SET_CONTACTS'
}
const {
  ADD_CONTACT,
  ADDED_CONTACT,
  ADD_CONTACT_FAIL,
  ACCEPT_CONTACT,
  ACCEPTED_CONTACT,
  ACCEPT_CONTACT_FAIL,
  UPDATE_CONTACTS,
  SET_CONTACTS
} = contactsActionTypes

export const contactsActionCreators = {
  addContact: (address) => ({ type: ADD_CONTACT, payload: { address } }),
  addedContact: (sessionId) =>
    ({ type: ADDED_CONTACT, payload: { sessionId } }),
  addContactFail: () => ({ type: ADD_CONTACT_FAIL }),
  acceptContact: (sessionId) =>
    ({ type: ACCEPT_CONTACT, payload: { sessionId } }),
  acceptedContact: (sessionId) =>
    ({ type: ACCEPTED_CONTACT, payload: { sessionId } }),
  acceptContactFail: () => ({ type: ACCEPT_CONTACT_FAIL }),
  updateContacts: () => ({ type: UPDATE_CONTACTS }),
  setContacts: (contacts) => ({ type: SET_CONTACTS, payload: { contacts } })
}
