
export const contentActionTypes = {
  SELECT_CONTENT: 'SELECT_CONTENT'
}
const { SELECT_CONTENT } = contentActionTypes

export const contentActionCreators = {
  setContent: (selected) => ({ type: SELECT_CONTENT, payload: { selected } })
}
