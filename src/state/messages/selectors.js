
const messagesState = (state) => state.app.messages

export const messagesSelectors = {
  selected: (state) => messagesState(state).selected
}
