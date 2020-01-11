
import { drawerActionTypes, baseActionTypes } from '../actions'
const {
  TOGGLE_MOBILE_OPEN,
  TOGGLE_USER_EXPANDED
} = drawerActionTypes
const { LOGGED_OUT } = baseActionTypes

const INITIAL_STATE = {
  mobileOpen: false,
  width: 240,
  userExpanded: true
}

export function drawerReducer (state = INITIAL_STATE, action) {
  // const { payload } = action
  switch (action.type) {
    case TOGGLE_MOBILE_OPEN:
      return { ...state, mobileOpen: !state.mobileOpen }
    case TOGGLE_USER_EXPANDED:
      return { ...state, userExpanded: !state.userExpanded }
    case LOGGED_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}
