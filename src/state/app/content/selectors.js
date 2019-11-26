
const contentState = (state) => state.content

export const contentSelectors = {
  content: (state) => contentState(state).content
}
