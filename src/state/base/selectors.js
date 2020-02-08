
const baseState = (state) => state.base

export const baseSelectors = {
  initialized: (state) => baseState(state).initialized,
  // active: (state) => Boolean(baseState(state).activeUser),
  // activeUser: (state) => baseState(state).activeUser,
  loggingIn: (state) => baseState(state).loggingIn,
  loggedIn: (state) => baseState(state).loggedIn,
  logInFailed: (state) => baseState(state).logInFailed,
  localUsers: (state) => baseState(state).localUsers
}
