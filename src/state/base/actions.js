
export const baseActionTypes = {
  INITIALIZE: 'INITIALIZE',
  INITIALIZED: 'INITIALIZED',
  SET_LOCAL_USERS: 'SET_LOCAL_USERS',
  LOG_IN: 'LOG_IN',
  LOGGED_IN: 'LOGGED_IN',
  LOG_OUT: 'LOG_OUT',
  LOGGED_OUT: 'LOGGED_OUT',
  SWITCH_USER: 'SWITCH_USER',
  SWITCHED_USER: 'SWITCHED_USER'
}
const {
  INITIALIZE,
  INITIALIZED,
  SET_LOCAL_USERS,
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT,
  SWITCH_USER,
  SWITCHED_USER
} = baseActionTypes

export const baseActionCreators = {
  initialize: () => ({ type: INITIALIZE }),
  setInitialized: () => ({ type: INITIALIZED }),
  setLocalUsers: (localUsers) =>
    ({ type: SET_LOCAL_USERS, payload: { localUsers } }),
  logIn: (credentials) =>
    ({ type: LOG_IN, payload: { credentials } }),
  setLoggedIn: (localUserId) =>
    ({ type: LOGGED_IN, payload: { localUserId } }),
  logOut: (localUserId) =>
    ({ type: LOG_OUT, payload: { localUserId } }),
  setLoggedOut: (localUserId) =>
    ({ type: LOGGED_OUT, payload: { localUserId } }),
  switchUser: (localUserId) =>
    ({ type: SWITCH_USER, payload: { localUserId } }),
  setSwitchedUser: (localUserId) =>
    ({ type: SWITCHED_USER, payload: { localUserId } })
}
