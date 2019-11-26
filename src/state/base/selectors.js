
const baseState = (state) => state.base

export const baseSelectors = {
  initialized: (state) => baseState(state).initialized,
  active: (state) => Boolean(baseState(state).activeUser),
  activeUser: (state) => baseState(state).activeUser,
  loggedIn: (state) => baseState(state).loggedIn,
  localUsers: (state) => baseState(state).localUsers
}
