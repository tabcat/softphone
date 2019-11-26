
export const barActionTypes = {
  SET_DISPLAY: 'SET_DISPLAY'
}
const {
  SET_DISPLAY
} = barActionTypes

export const barActionCreators = {
  setDisplay: (display) => ({ type: SET_DISPLAY, payload: { display } })
}
