
export const profileActionTypes = {
  INITIALIZED_PROFILE: 'INITIALIZED_PROFILE',
  SET_PROFILE_ADDRESS: 'SET_PROFILE_ADDRESS',
  SET_PROFILE_NAME: 'SET_PROFILE_NAME',
  ADD_PROFILE_NAME: 'ADD_PROFILE_NAME'
}
const {
  INITIALIZED_PROFILE,
  SET_PROFILE_ADDRESS,
  SET_PROFILE_NAME,
  ADD_PROFILE_NAME
} = profileActionTypes

export const profileActionCreators = {
  setInitialized: (payload) =>
    ({ type: INITIALIZED_PROFILE, payload }),
  setProfileAddress: (address) =>
    ({ type: SET_PROFILE_ADDRESS, payload: { address } }),
  setProfileName: (name) =>
    ({ type: SET_PROFILE_NAME, payload: { name } }),
  addProfileName: (address, name) =>
    ({ type: ADD_PROFILE_NAME, payload: { address, name } })
}
