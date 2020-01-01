
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
  mergeMap,
  tap,
  takeUntil,
  catchError,
  ignoreElements
} from 'rxjs/operators'
import { baseActionTypes, baseActionCreators } from './actions'
const {
  INITIALIZE,
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT,
  LOG_IN_FAILED
} = baseActionTypes
const {
  setInitialized,
  setLoggedIn,
  setLoggedOut,
  setLogInSuccess,
  setLogInFailed,
  setLocalUsers
} = baseActionCreators

const logInUserEpic = (action$, state$) => action$.pipe(
  ofType(LOG_IN),
  take(1),
  withLatestFrom(state$),
  mergeMap(([action, state]) => {
    return defer(async () => {
      const { username, password } = action.payload
      const l = await login()
      const account = await l.loginUser(username, password)
        // .then(async (acc) => acc.initialized.then(() => acc))
        .catch((e) => { console.log(e); return undefined })
      const localUser = await l.localUser(username)
      const localUsers = await l.localUsers()
        .then(users => users.map(({ _id, name }) => ({ _id, name })))
      return [{ username, password }, account, localUser, localUsers]
    }).pipe(
      mergeMap(([{ username, password }, account, localUser, localUsers]) => {
        if (account === undefined) {
          return of(setLogInFailed())
        } else {
          return of(
            setLogInSuccess(),
            setLocalUsers(localUsers),
            setLoggedIn(username, password)
          )
        }
      })
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
  mergeMap(([action, state]) => {
    return of(setLoggedOut())
  })
)

export const baseEpic = (action$, state$) => action$.pipe(
  ofType(INITIALIZE),
  take(1),
  mergeMap(() =>
    concat(
      defer(async () => { await login() }).pipe(ignoreElements()),
      of(setInitialized()),
      merge(
        logInUserEpic(action$, state$),
        action$.pipe(
          ofType(LOG_IN_FAILED),
          mergeMap(() => logInUserEpic(action$, state$))
        ),
        action$.pipe(
          ofType(LOGGED_IN),
          mergeMap(() => logOutUserEpic(action$, state$))
        ),
        action$.pipe(
          ofType(LOGGED_OUT),
          mergeMap(() => logInUserEpic(action$, state$))
        )
      )
    )
  )
)
