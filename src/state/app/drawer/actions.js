
export const drawerActionTypes = {
  TOGGLE_MOBILE_OPEN: 'TOGGLE_MOBILE_OPEN'
}
const { TOGGLE_MOBILE_OPEN } = drawerActionTypes

export const drawerActionCreators = {
  toggleMobileOpen: () => ({ type: TOGGLE_MOBILE_OPEN })
}
