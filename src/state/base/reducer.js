
import { baseActionTypes } from './actions'
const {
  INITIALIZED,
  SET_LOCAL_USERS,
  LOGGED_IN,
  LOGGED_OUT
} = baseActionTypes

const INITIAL_STATE = {
  initialized: false,
  loggedIn: null,
  localUsers: {}
}

export function baseReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case INITIALIZED:
      return { ...state, initialized: true }
    case SET_LOCAL_USERS:
      return { ...state, localUsers: payload.localUsers }
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: payload.localUserId
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
    default:
      return state
  }
}
