
export const baseActionTypes = {
  INITIALIZE: 'INITIALIZE',
  INITIALIZED: 'INITIALIZED',
  SET_LOCAL_USERS: 'SET_LOCAL_USERS',
  LOG_IN: 'LOG_IN',
  LOGGED_IN: 'LOGGED_IN',
  LOG_OUT: 'LOG_OUT',
  LOGGED_OUT: 'LOGGED_OUT',
  LOG_IN_SUCCESS: 'LOG_IN_SUCCESS',
  LOG_IN_FAILED: 'LOG_IN_FAILED',
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
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  SWITCH_USER,
  SWITCHED_USER
} = baseActionTypes

export const baseActionCreators = {
  initialize: () => ({ type: INITIALIZE }),
  setInitialized: () => ({ type: INITIALIZED }),
  setLocalUsers: (localUsers) =>
    ({ type: SET_LOCAL_USERS, payload: { localUsers } }),
  logIn: (username, password) =>
    ({ type: LOG_IN, payload: { username, password } }),
  setLoggedIn: (username, password) =>
    ({ type: LOGGED_IN, payload: { username, password } }),
  logOut: () => ({ type: LOG_OUT }),
  setLoggedOut: () => ({ type: LOGGED_OUT }),
  setLogInSuccess: () => ({ type: LOG_IN_SUCCESS }),
  setLogInFailed: () => ({ type: LOG_IN_FAILED }),
  switchUser: (localUserId) =>
    ({ type: SWITCH_USER, payload: { localUserId } }),
  setSwitchedUser: (localUserId) =>
    ({ type: SWITCHED_USER, payload: { localUserId } })
}
