
import login from '../../account'
import { ofType } from 'redux-observable'
import {
  of,
  concat,
  merge,
  defer
} from 'rxjs'
import {
  map,
  withLatestFrom,
  take,
  switchMap,
  mergeMap
} from 'rxjs/operators'
import { baseActionTypes, baseActionCreators } from './actions'
const {
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT
} = baseActionTypes
const {
  setInitialized,
  setLoggedIn,
  setLoggedOut,
  setLocalUsers,
  useAccount
} = baseActionCreators

const getLocalUsers = async () => login().then(l => l.localUsers())

const logInUserEpic = (action$, state$) => action$.pipe(
  ofType(LOG_IN),
  take(1),
  withLatestFrom(state$),
  switchMap(async ([action, state]) => {
    const { username, password } = action.payload
    const l = await login()
    const account = await l.loginUser(username, password)
    const localUser = await l.localUser(username)
    const localUsers = await l.localUsers()
    return concat(
      of(1).pipe(map(() => setLocalUsers(localUsers))),
      of(1).pipe(map(() => useAccount(account))),
      of(1).pipe(map(() => setLoggedIn(localUser._id)))
    )
  })
)

// const switchUserEpic = action$ => action$.pipe(
//   ofType(SWITCH_USER),
//   concatMap()
// )

const logOutUserEpic = (action$, state$) => action$.pipe(
  ofType(LOG_OUT),
  take(1),
  withLatestFrom(state$),
  switchMap(async ([action, state]) => {
    return of(1).pipe(map(setLoggedOut))
  })
)

export const baseEpic = (action$, state$) => action$.pipe(
  ofType('@@INIT'),
  take(1),
  mergeMap(() =>
    concat(
      defer(() => getLocalUsers()).pipe(map(setLocalUsers)),
      of(1).pipe(map(setInitialized)),
      merge(
        logInUserEpic,
        action$.pipe(
          ofType(LOGGED_IN),
          switchMap(() => logOutUserEpic(action$))
        ),
        action$.pipe(
          ofType(LOGGED_OUT),
          switchMap(() => logInUserEpic(action$))
        )
      )
    )
  )
)
