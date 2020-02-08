
import {
  getAccount
} from '../../account'
import { ofType } from 'redux-observable'
import {
  of,
  fromEvent,
  merge,
  concat,
  defer
} from 'rxjs'
import {
  map,
  ignoreElements,
  withLatestFrom,
  take,
  switchMap,
  mergeMap,
  takeUntil,
  retry,
  catchError
} from 'rxjs/operators'
import {
  messagesActionTypes,
  messagesActionCreators,
  baseSelectors,
  baseActionTypes
} from '../'
const {
  INITIALIZE,
  LOGGED_IN,
  LOGGED_OUT
} = baseActionTypes
const { UPDATE_FEED, SEND_MESSAGE } = messagesActionTypes
const { setInitialized, updateFeed, setFeed } = messagesActionCreators

const messageListenerEpic = (message, profile) => merge(
  of(1).pipe(map(() => updateFeed(profile))),
  fromEvent(message.events, 'replicated').pipe(
    map(() => updateFeed(profile))
  ),
  fromEvent(message.events, 'write').pipe(
    map(() => updateFeed(profile))
  )
)

// const myProfileListenerEpic = (myProfile) => merge(
//   fromEvent(myProfile.events.)
// )

const messagesListenerEpic = (action$, account) => of(1).pipe(
  mergeMap(() =>
    merge(
      ...[...account.messages._sessions.keys()]
        .map(profile => merge(
          messageListenerEpic(account.messages._sessions.get(profile), profile)
        )),
      fromEvent(account.messages.events, 'openedSession').pipe(
        mergeMap(profile =>
          defer(() => account.messages.messageBy(profile)).pipe(
            mergeMap((message) => merge(
              messageListenerEpic(message, profile)
            ))
          )
        )
      )
    )
  ),
  retry(1),
  catchError(e => { console.error(e); return of() })
)

const sendMessageEpic = (action$, account) => action$.pipe(
  ofType(SEND_MESSAGE),
  mergeMap(({ payload: { profile, msg } }) => defer(async () => {
    const messageSession = await account.messages.messageBy(profile)
    messageSession.sendMessage(msg)
  })),
  ignoreElements()
)

const updateFeedEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_FEED),
  withLatestFrom(state$),
  switchMap(([{ payload: { profile } }, state]) => {
    return defer(async () => {
      const { messages } = await getAccount(state)
      const messageSession = await messages.messageBy(profile)
      await messageSession.initialized
      return [profile, await messageSession.readMessages({ limit: -1 })]
    }).pipe(map(([profile, feed]) => setFeed(profile, feed)))
  })
)

const initializeMessagesEpic = (action$, state$) => of(1).pipe(
  withLatestFrom(state$),
  mergeMap(([o, state]) =>
    defer(async () => {
      const account = await getAccount(state)
      const records = await account.messages.recordsRead()
      return records.reduce((a, c) => ({ ...a, [c.recordId]: [] }), {})
    }).pipe(map((feeds) => setInitialized({ feeds })))
  )
)

const onLoggedInEpic = (action$, state$) => action$.pipe(
  ofType(LOGGED_IN),
  take(1),
  withLatestFrom(state$),
  mergeMap(([action, state]) => defer(() => getAccount(state)).pipe(
    mergeMap((account) =>
      merge(
        updateFeedEpic(action$, state$),
        messagesListenerEpic(action$, account),
        sendMessageEpic(action$, account),
        initializeMessagesEpic(action$, state$)
      ).pipe(
        takeUntil(action$.pipe(ofType(LOGGED_OUT)))
      )
    )
  ))
)

export const messagesEpic = (action$, state$) => action$.pipe(
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
