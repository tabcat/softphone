
import { messagesActionTypes } from '../'
const {
  INITIALIZED_MESSAGES,
  SET_SELECTED,
  SET_FEED,
  SET_SCROLL,
  SET_SENDBOX,
  SET_MESSAGE_GROUP,
  SET_FEEDS
} = messagesActionTypes

const INITIAL_STATE = {
  initialized: false,
  selected: null,
  feeds: {},
  scrolls: {},
  sendboxes: {}
}

const update = (obj, key, value) => {
  return { ...obj, [key]: value }
}

const updateFeeds = (feeds, { profile, feed }) => {
  return update(feeds, profile, feed)
}

const updateScrolls = (scrolls, { profile, scroll }) => {
  return update(scrolls, profile, scroll)
}

const updateSendboxes = (sendboxes, { profile, sendbox }) => {
  return update(sendboxes, profile, sendbox)
}

export function messagesReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {
    case INITIALIZED_MESSAGES:
      return { ...state, ...payload, initialized: true }
    case SET_SELECTED:
      return { ...state, selected: payload.profile }
    case SET_FEED:
      return { ...state, feeds: updateFeeds(state.feeds, payload) }
    case SET_SCROLL:
      return { ...state, scrolls: updateScrolls(state.scrolls, payload) }
    case SET_SENDBOX:
      return { ...state, sendboxes: updateSendboxes(state.sendboxes, payload) }
    case SET_MESSAGE_GROUP:
      return {
        ...state,
        ...updateFeeds(state.feeds, payload),
        ...updateScrolls(state.scrolls, payload),
        ...updateSendboxes(state.sendboxes, payload)
      }
    case SET_FEEDS:
      return { ...state, feeds: payload.feeds }
    default:
      return state
  }
}
