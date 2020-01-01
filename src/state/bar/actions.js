
export const barActionTypes = {
  SET_TITLE: '',
  SET_DISPLAY: 'SET_DISPLAY'
}
const {
  SET_TITLE,
  SET_DISPLAY
} = barActionTypes

export const barActionCreators = {
  setTitle: (title) => ({ type: SET_TITLE, payload: { title } }),
  setDisplay: (display) => ({ type: SET_DISPLAY, payload: { display } })
}
