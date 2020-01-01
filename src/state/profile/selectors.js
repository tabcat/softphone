
const contentState = (state) => state.app.content

export const contentSelectors = {
  selected: (state) => contentState(state).selected
}
