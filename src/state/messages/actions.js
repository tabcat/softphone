
export const messagesActionTypes = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  SENT_MESSAGE: 'SENT_MESSAGE',
  UPDATE_FEED: 'UPDATE_FEED',
  SET_FEED: 'SET_FEED'
}
const {
  SEND_MESSAGE,
  SENT_MESSAGE,
  UPDATE_FEED,
  SET_FEED
} = messagesActionTypes

export const messagesActionCreators = {
  sendMessage: (sessionId, msg) =>
    ({ type: SEND_MESSAGE, payload: { sessionId, msg } }),
  sentMessage: (sessionId, msg) =>
    ({ type: SENT_MESSAGE, payload: { sessionId, msg } }),
  updateFeed: (sessionId) =>
    ({ type: UPDATE_FEED, payload: { sessionId } }),
  setFeed: (sessionId, feed) =>
    ({ type: SET_FEED, payload: { sessionId, feed } })
}
