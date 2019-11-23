
const baseActionTypes = {
  INITIALIZE: 'INITIALIZE',
  INITIALIZED: 'INITIALIZED',
  LOG_IN: 'LOG_IN',
  LOGGED_IN: 'LOGGED_IN',
  LOG_OUT: 'LOG_OUT',
  LOGGED_OUT: 'LOGGED_OUT'
}
const {
  INITIALIZE,
  INITIALIZED,
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT
} = baseActionTypes

const baseActionCreators = {
  initialize: () => ({ type: INITIALIZE }),
  setInitialized: () => ({ type: INITIALIZED }),
  logIn: (credentials) => ({ type: LOG_IN, payload: { credentials } }),
  setLoggedIn: (localUser) => ({ type: LOGGED_IN, payload: { localUser } }),
  logOut: (localUser) => ({ type: LOG_OUT, payload: { localUser } }),
  setLoggedOut: (localUser) => ({ type: LOGGED_OUT, payload: { localUser } })
}

export { baseActionTypes, baseActionCreators }
