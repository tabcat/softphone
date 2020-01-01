
const barState = (state) => state.bar

export const barSelectors = {
  title: (state) => barState(state).title,
  display: (state) => barState(state).display
}
