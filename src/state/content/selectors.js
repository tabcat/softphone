
const contentState = (state) => state.content

export const contentSelectors = {
  selected: (state) => contentState(state).selected
}
