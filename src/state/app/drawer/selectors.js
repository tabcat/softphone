
const drawerState = (state) => state.drawer

export const drawerSelectors = {
  mobileOpen: (state) => drawerState(state).mobileOpen
}
