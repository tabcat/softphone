
import { baseActionTypes } from '../'
const {
  INITIALIZED,
  SET_LOCAL_USERS,
  LOG_IN,
  LOGGED_IN,
  LOGGED_OUT,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED
} = baseActionTypes

const INITIAL_STATE = {
  initialized: false,
  loggingIn: false,
  logInFailed: false,
  loggedIn: null,
  localUsers: []
}

export function baseReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case INITIALIZED:
      return { ...state, initialized: true }
    case SET_LOCAL_USERS:
      return { ...state, localUsers: payload.localUsers }
    case LOG_IN:
      return { ...state, loggingIn: true }
    case LOGGED_IN:
      return {
        ...state,
        loggingIn: false,
        loggedIn: { username: payload.username, password: payload.password }
        // activeUser: payload.localUserId,
        // loggedIn: {
        //   ...state.loggedIn,
        //   [payload.localUserId]: {
        //     credentials: payload.credentials,
        //     localUserId: payload.localUserId
        //   }
        // }
      }
    case LOGGED_OUT:
      return { ...state, loggedIn: null }
    // case SWITCHED_USER:
    //   return { ...state, activeUser: payload.localUserId }
    case LOG_IN_SUCCESS:
      return state.logInFailed
        ? { ...state, logInFailed: false } : state
    case LOG_IN_FAILED:
      return state.logInFailed
        ? state : { ...state, loggingIn: false, logInFailed: true }
    default:
      return state
  }
}
