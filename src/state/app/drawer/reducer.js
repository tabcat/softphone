
import { drawerActionTypes } from './actions'
const { TOGGLE_MOBILE_OPEN } = drawerActionTypes

const INITIAL_STATE = {
  mobileOpen: false,
  width: 240
}

export function drawerReducer (state = INITIAL_STATE, action) {
  // const { payload } = action
  switch (action.type) {
    case TOGGLE_MOBILE_OPEN:
      return { ...state, mobileOpen: !state.mobileOpen }
    default:
      return state
  }
}
