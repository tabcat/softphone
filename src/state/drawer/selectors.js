
const drawerState = (state) => state.drawer

export const drawerSelectors = {
  mobileOpen: (state) => drawerState(state).mobileOpen,
  width: (state) => drawerState(state).width,
  userExpanded: (state) => drawerState(state).userExpanded
}
