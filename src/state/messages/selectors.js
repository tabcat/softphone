
const messagesState = (state) => state.messages

export const messagesSelectors = {
  initialized: (state) => messagesState(state).initialized,
  selected: (state) => messagesState(state).selected,
  feeds: (state) => messagesState(state).feeds,
  scrolls: (state) => messagesState(state).scrolls,
  sendboxes: (state) => messagesState(state).sendboxes,
  messageList: (state) => Object.keys(messagesState(state).feeds)
}
