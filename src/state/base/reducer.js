import { baseActionTypes } from './actions'
const { } = baseActionTypes

const INITIAL_STATE = {}

function baseReducer (state = INITIAL_STATE, action) {
  const { payload } = action
  switch (action.type) {

    default:
      return state
  }
}

export { baseReducer }
