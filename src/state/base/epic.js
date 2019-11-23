
// import { combineEpics, ofType } from 'redux-observable'
// import { map } from 'rxjs/operators'
// import { baseTypes, baseCreators } from './actions'

const baseEpic = action$ => action$.pipe(
  //ofType(),
)

export { baseEpic }
