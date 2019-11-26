
const barState = (state) => state.bar

export const barSelectors = {
  display: (state) => barState(state).display
}
