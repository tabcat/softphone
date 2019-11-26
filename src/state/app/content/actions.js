
export const contentActionTypes = {
  SET_CONTENT: 'SET_CONTENT'
}
const { SET_CONTENT } = contentActionTypes

export const contentActionCreators = {
  setContent: (content) => ({ type: SET_CONTENT, payload: { content } })
}
