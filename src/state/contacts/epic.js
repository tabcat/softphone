
import login from '../../account'
import { ofType } from 'redux-observable'
import {
  of,
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
  catchError
} from 'rxjs/operators'
import {
  contactsActionTypes,
  contactsActionCreators,
  baseActionTypes,
  baseSelectors
} from '../'
const {
  ADD_CONTACT,
  ACCEPT_CONTACT,
  UPDATE_CONTACT_LIST,
  UPDATE_REQUEST_LIST,
  SET_CONTACT_LIST,
  SET_REQUEST_LIST
} = contactsActionTypes
const {
  addedContact,
  addContactFail,
  acceptedContact,
  acceptContactFail,
  updateContactList,
  updateRequestList,
  setContactList,
  setRequestList,
  initializedContacts
} = contactsActionCreators
const {
  INITIALIZE,
  LOGGED_IN,
  LOGGED_OUT
} = baseActionTypes

const getComms = async (state) => {
  const l = await login
  const { username, password } = baseSelectors.loggedIn(state)
  const account = await l.loginUser(username, password)
  await account.initialized
  return account.comms
}

const getContactRecords = async (state) => {
  try {
    const comms = await getComms(state)
    return comms.queryContacts(() => true)
  } catch (e) {
    console.error(e)
    console.error('failed to get contacts')
    return {}
  }
}

const addContact = async (state, address) => {
  try {
    const comms = await getComms(state)
    return comms.addContact(address)
  } catch (e) {
    console.error(e)
    throw e
  }
}

const getContactRequests = async (state) => {
  try {
    const comms = await getComms(state)
    return comms.contactOffers()
  } catch (e) {
    console.error(e)
    throw e
  }
}

const acceptContact = async (state, sessionId) => {
  try {
    const comms = await getComms(state)
    return comms.acceptContact(sessionId)
  } catch (e) {
    console.error(e)
    throw e
  }
}

// const openContact = async (state, sessionId) => {
//   try {
//     const comms = await getComms(state)
//     return comms.openContact(sessionId)
//   } catch (e) {
//     console.error(e)
//     throw e
//   }
// }

const addContactsEpic = (action$, state$) => action$.pipe(
  ofType(ADD_CONTACT),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    defer(async () => {
      const contact = await addContact(state, action.payload.address)
      return contact.offer.name
    }).pipe(
      mergeMap((sessionId) => {
        return concat(
          of(addedContact(sessionId)),
          of(updateContactList())
        )
      }),
      catchError(e => of(addContactFail(action.payload.address)))
    )
  )
)

const acceptContactsEpic = (action$, state$) => action$.pipe(
  ofType(ACCEPT_CONTACT),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    defer(async () => {
      const contact = await acceptContact(state, action.payload.sessionId)
      return contact.offer.name
    }).pipe(
      catchError(e =>
        of(acceptContactFail(action.payload.sessionId))
      ),
      mergeMap((sessionId) => {
        return concat(
          of(acceptedContact(sessionId)),
          of(updateContactList())
        )
      })
    )
  )
)

const updateContactListEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CONTACT_LIST),
  withLatestFrom(state$),
  switchMap(([action, state]) =>
    defer(async () => {
      const records = await getContactRecords(state)
      return records.map(
        ({ _id, name: sessionId, ...record }) => ({ sessionId, ...record })
      )
    }).pipe(map(setContactList))
  )
)

const updateRequestListEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_REQUEST_LIST),
  withLatestFrom(state$),
  switchMap(([action, state]) =>
    defer(async () => {
      return getContactRequests(state)
    }).pipe(map(setRequestList))
  )
)

const onLoggedInEpic = (action$, state$) => action$.pipe(
  ofType(LOGGED_IN),
  take(1),
  mergeMap(() =>
    merge(
      addContactsEpic(action$, state$),
      acceptContactsEpic(action$, state$),
      updateContactListEpic(action$, state$),
      updateRequestListEpic(action$, state$),
      merge(
        of(updateContactList()),
        of(updateRequestList()),
        concat(
          merge(
            action$.pipe(ofType(SET_CONTACT_LIST), take(1)),
            action$.pipe(ofType(SET_REQUEST_LIST), take(1))
          ).pipe(ignoreElements()),
          of(initializedContacts())
        )
      )
    ).pipe(
      takeUntil(action$.pipe(ofType(LOGGED_OUT)))
    )
  )
)

export const contactsEpic = (action$, state$) => action$.pipe(
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
