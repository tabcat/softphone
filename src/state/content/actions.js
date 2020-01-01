
export const contentActionTypes = {
  SELECT_CONTENT: 'SELECT_CONTENT'
}
const { SELECT_CONTENT } = contentActionTypes

export const contentActionCreators = {
  selectContent: (selected) => ({ type: SELECT_CONTENT, payload: { selected } })
}
