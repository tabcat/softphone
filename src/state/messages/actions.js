
export const messagesActionTypes = {
  INITIALIZED_MESSAGES: 'INITIALIZED_MESSAGES',
  SET_SELECTED: 'SET_SELECTED',
  SEND_MESSAGE: 'SEND_MESSAGE',
  SENT_MESSAGE: 'SENT_MESSAGE',
  SEND_MESSAGE_FAILED: 'SEND_MESSAGE_FAILED',
  UPDATE_FEED: 'UPDATE_FEED',
  UPDATE_SCROLL: 'UPDATE_SCROLL',
  UPDATE_SENDBOX: 'UPDATE_SENDBOX',
  UPDATE_MESSAGES_GROUP: 'UPDATE_MESSAGES_GROUP',
  UPDATE_FEEDS: 'UPDATE_FEEDS',
  SET_FEED: 'SET_FEED',
  SET_SCROLL: 'SET_SCROLL',
  SET_SENDBOX: 'SET_SENDBOX',
  SET_MESSAGE_GROUP: 'SET_MESSAGE_GROUP',
  SET_FEEDS: 'SET_FEEDS'
}
const {
  INITIALIZED_MESSAGES,
  SET_SELECTED,
  SEND_MESSAGE,
  SENT_MESSAGE,
  SEND_MESSAGE_FAILED,
  UPDATE_FEED,
  UPDATE_SCROLL,
  UPDATE_SENDBOX,
  UPDATE_MESSAGES_GROUP,
  UPDATE_FEEDS,
  SET_FEED,
  SET_SCROLL,
  SET_SENDBOX,
  SET_MESSAGE_GROUP,
  SET_FEEDS
} = messagesActionTypes

export const messagesActionCreators = {
  setInitialized: (payload) =>
    ({ type: INITIALIZED_MESSAGES, payload }),
  setSelected: (profile) =>
    ({ type: SET_SELECTED, payload: { profile } }),
  sendMessage: (profile, msg) =>
    ({ type: SEND_MESSAGE, payload: { profile, msg } }),
  sentMessage: (profile, msg) =>
    ({ type: SENT_MESSAGE, payload: { profile, msg } }),
  sendMessageFailed: (profile, msg) =>
    ({ type: SEND_MESSAGE_FAILED }),
  updateFeed: (profile) =>
    ({ type: UPDATE_FEED, payload: { profile } }),
  updateScroll: (profile) =>
    ({ type: UPDATE_SCROLL, payload: { profile } }),
  updateSendbox: (profile) =>
    ({ type: UPDATE_SENDBOX, payload: { profile } }),
  updateMessagesGroup: (profile) =>
    ({ type: UPDATE_MESSAGES_GROUP, payload: { profile } }),
  updateFeeds: () =>
    ({ type: UPDATE_FEEDS }),
  setFeed: (profile, feed) =>
    ({ type: SET_FEED, payload: { profile, feed } }),
  setAutoScroll: (profile) =>
    ({ type: SET_SCROLL, payload: { profile, scroll: null } }),
  setScrollTop: (profile, scrollTop) =>
    ({ type: SET_SCROLL, payload: { profile, scroll: scrollTop } }),
  setSendbox: (profile, sendbox) =>
    ({ type: SET_SENDBOX, payload: { profile, sendbox } }),
  setMessagesGroup: (profile, { feed, scroll, sendbox }) =>
    ({
      type: SET_MESSAGE_GROUP,
      payload: { profile, feed, scroll, sendbox }
    }),
  setFeeds: (feeds) =>
    ({ type: SET_FEEDS, payload: { feeds } })
}
