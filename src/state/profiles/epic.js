
import {
  getAccount
} from '../../account'
import { ofType } from 'redux-observable'
import {
  of,
  merge,
  concat,
  defer,
  fromEvent
} from 'rxjs'
import {
  map,
  tap,
  filter,
  ignoreElements,
  withLatestFrom,
  take,
  switchMap,
  mergeMap,
  takeUntil,
  catchError,
  retry
} from 'rxjs/operators'
import {
  baseSelectors,
  baseActionTypes,
  profileSelectors,
  profileActionCreators
} from '../'
const {
  INITIALIZE,
  LOGGED_IN,
  LOGGED_OUT
} = baseActionTypes
const {
  setInitialized,
  // setProfileAddress
  addProfileName
} = profileActionCreators

// const getProfileAddress = async (state) => {
//   const profile = await getMyProfile(state)
//   return (await profile.address()).toString()
// }

const initializeProfile = async (state) => {
  const account = await getAccount(state)
  const address = (await account.profiles.myProfile.address()).toString()
  const { addresses } = await account._orbitdbC._orbitdb._ipfs.id()
  const username = baseSelectors.loggedIn(state).username
  const ipfsAddr =
    addresses.filter(addr => addr.startsWith('/p2p-circuit/ipfs/'))[0] ||
    addresses[0] ||
    null
  const names = { [address]: baseSelectors.loggedIn(state).username }

  account.profiles.myProfile.getField('name')
    .then(name => name !== username
      ? account.profiles.myProfile.setField('name', username)
      : undefined
    )

  return { address, ipfsAddr, names }
}

const checkProfileNameEpic = (profile, state$) =>
  defer(async () =>
    [await profile.getField('name'), await profile.address()]
  ).pipe(
    withLatestFrom(state$),
    filter(([[name, address], state]) =>
      name !== profileSelectors.names(state)[address.toString()]
    ),
    map(([[name, address]]) => addProfileName(address.toString(), name))
  )

const profileListenerEpic = (profile, state$) => merge(
  checkProfileNameEpic(profile, state$),
  fromEvent(profile.events, 'replicated').pipe(
    switchMap(() => checkProfileNameEpic(profile, state$))
  )
)

// const myProfileListenerEpic = (myProfile) => merge(
//   fromEvent(myProfile.events.)
// )

const profilesListenerEpic = (state, state$) =>
  defer(() => getAccount(state)).pipe(
    mergeMap(account =>
      merge(
        ...[...account.profiles._sessions.values()]
          .map(profile => profileListenerEpic(profile, state$)),
        fromEvent(account.profiles.events, 'openedSession').pipe(
          mergeMap(recordId =>
            defer(() => account.profiles.profileOpen(recordId)).pipe(
              mergeMap((profile) => profileListenerEpic(profile, state$))
            )
          )
        )
      )
    ),
    retry(1),
    catchError(e => { console.error(e); return of() })
  )

const inboxListenerEpic = (state) =>
  defer(() => getAccount(state)).pipe(
    mergeMap(account =>
      fromEvent(account.inbox.events, 'replicated').pipe(
        tap(async () => {
          const opened = new Set(account.profiles._sessions.keys())
          const profiles = await account.inbox.inboxQuery(record =>
            record.sender &&
            record.sender.profile &&
            !opened.has(record.sender)
          ).then(records =>
            records.map(({ sender: { profile } }) => profile)
          )
          profiles.map(profile => account.profiles.profileOpen(profile))
        }),
        ignoreElements()
      )
    ),
    retry(1),
    catchError(e => { console.error(e); return of() })
  )

const onLoggedInEpic = (action$, state$) => action$.pipe(
  ofType(LOGGED_IN),
  take(1),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    merge(
      profilesListenerEpic(state, state$),
      inboxListenerEpic(state),
      concat(
        defer(() => initializeProfile(state)).pipe(
          map(setInitialized),
          retry(1),
          catchError(e => { console.error(e); return of() })
        )
      )
    ).pipe(
      takeUntil(action$.pipe(ofType(LOGGED_OUT)))
    )
  )
)

export const profilesEpic = (action$, state$) => action$.pipe(
  ofType(INITIALIZE),
  take(1),
  mergeMap(() => {
    return merge(
      onLoggedInEpic(action$, state$),
      action$.pipe(
        ofType(LOGGED_OUT),
        mergeMap(() => onLoggedInEpic(action$, state$))
      )
    )
  })
)
