
export const drawerActionTypes = {
  TOGGLE_MOBILE_OPEN: 'TOGGLE_MOBILE_OPEN',
  TOGGLE_USER_EXPANDED: 'TOGGLE_USER_EXPANDED'
}
const { TOGGLE_MOBILE_OPEN, TOGGLE_USER_EXPANDED } = drawerActionTypes

export const drawerActionCreators = {
  toggleMobileOpen: () => ({ type: TOGGLE_MOBILE_OPEN }),
  toggleUserExpanded: () => ({ type: TOGGLE_USER_EXPANDED })
}
