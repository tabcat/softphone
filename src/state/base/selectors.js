
const baseState = (state) => state.base

const baseSelectors = {
  initialized: (state) => baseState(state).initialized,
  active: (state) => baseState(state).active,
  loggedIn: (state) => baseState(state).loggedIn,
  localUsers: (state) => baseState(state).localUsers
}

export { baseSelectors }
