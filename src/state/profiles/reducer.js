
import { profileActionTypes, baseActionTypes } from '../'
import { update } from '../utils'
const {
  INITIALIZED_PROFILE,
  // SET_PROFILE_ADDRESS,
  ADD_PROFILE_NAME
  // SET_PROFILE_NAME
} = profileActionTypes
const { LOGGED_OUT } = baseActionTypes

const INITIAL_STATE = {
  initialized: false,
  address: null,
  ipfsAddr: null,
  names: {}
}

const initializedProfile = (state, payload) => {
  return {
    ...state,
    ...payload,
    names: { ...state.names, ...payload.names },
    initialized: true
  }
}

const updateNames = (state, { address, name }) => {
  return { ...state, names: update(state.names, address, name) }
}

export function profileReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case INITIALIZED_PROFILE:
      return initializedProfile(state, payload)
    // case SET_PROFILE_ADDRESS:
    //   return { ...state, address: payload.address }
    case ADD_PROFILE_NAME:
      return updateNames(state, payload)
    // case SET_PROFILE_NAME:
    //   return { ...state, name: payload.name }
    case LOGGED_OUT:
      return INITIAL_STATE
    default:
      return state
  }
}
