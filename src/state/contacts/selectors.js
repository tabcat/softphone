
const contactsState = (state) => state.account.contacts

export const contactsSelectors = {
  contacts: (state) => contactsState(state)
}
