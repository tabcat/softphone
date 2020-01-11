
const contactsState = (state) => state.contacts

export const contactsSelectors = {
  initialized: (state) => contactsState(state).initialized,
  selected: (state) => contactsState(state).selected,
  contactList: (state) => contactsState(state).contactList,
  requestList: (state) => contactsState(state).requestList,
  tabIndex: (state) => contactsState(state).tabIndex,
  addContactDialogOpen: (state) => contactsState(state).addContactDialogOpen
}
