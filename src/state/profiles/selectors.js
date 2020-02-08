
const profileState = (state) => state.profile

export const profileSelectors = {
  initialized: (state) => profileState(state).initialized,
  address: (state) => profileState(state).address,
  ipfsAddr: (state) => profileState(state).ipfsAddr,
  names: (state) => profileState(state).names
}
