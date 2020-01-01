
import login from '../../../account'
import { ofType } from 'redux-observable'
import {
  of,
  merge,
  concat,
  defer
} from 'rxjs'
import {
  map,
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
} from '../../'
const {
  ADD_CONTACT,
  ACCEPT_CONTACT,
  UPDATE_CONTACTS
} = contactsActionTypes
const {
  addedContact,
  addContactFail,
  acceptedContact,
  acceptContactFail,
  updateContacts,
  setContacts
} = contactsActionCreators
const {
  INITIALIZE,
  LOGGED_IN,
  LOGGED_OUT
} = baseActionTypes

const getComms = async (state) => {
  const l = await login()
  const { username, password } = baseSelectors.loggedIn(state)
  const account = await l.loginUser(username, password)
  await account.initialized
  return account.comms
}

const getContacts = async (state) => {
  try {
    const comms = await getComms(state)
    const contactRecords = await comms.queryContacts(() => true)
    return Object.keys(comms.contacts)
      .reduce(async (a, c, i, s) => {
        try {
          const contactRecord = contactRecords.filter(doc => doc.name === c)[0]
          if (!contactRecord) {
            console.error('cannot find record for that contact')
            return a
          }
          const sessionId = s[c].offer.name
          return { ...await a, [c]: { sessionId, meta: contactRecord.meta } }
        } catch (e) {
          console.error(`failed to reduce session ${c} with contacts`)
          return a
        }
      }, {})
  } catch (e) {
    console.error(e)
    console.error('failed to get contacts')
    return {}
  }
}

const addContact = async (state, address) => {
  try {
    const comms = await getComms(state)
    const contact = await comms.addContact(address)
    return contact.offer.name
  } catch (e) {
    console.error(e)
    throw e
  }
}

const acceptContact = async (state, sessionId) => {
  try {
    const comms = await getComms(state)
    const contact = await comms.acceptContact(sessionId)
    return contact.offer.name
  } catch (e) {
    console.error(e)
    throw e
  }
}

const addContactsEpic = (action$, state$) => action$.pipe(
  ofType(ADD_CONTACT),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    defer(() => {
      return addContact(state, action.payload.address)
    }).pipe(
      catchError(e =>
        of(addContactFail(action.payload.address))
      ),
      mergeMap((sessionId) => {
        return concat(
          of(addedContact(sessionId)),
          of(updateContacts())
        )
      })
    )
  )
)

const acceptContactsEpic = (action$, state$) => action$.pipe(
  ofType(ACCEPT_CONTACT),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    defer(() => {
      return acceptContact(state, action.payload.sessionId)
    }).pipe(
      catchError(e =>
        of(acceptContactFail(action.payload.sessionId))
      ),
      mergeMap((sessionId) => {
        return concat(
          of(acceptedContact(sessionId)),
          of(updateContacts())
        )
      })
    )
  )
)

const updateContactsEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CONTACTS),
  withLatestFrom(state$),
  switchMap(([action, state]) =>
    defer(() => getContacts(state)).pipe(map(setContacts))
  )
)

const onLoggedInEpic = (action$, state$) => action$.pipe(
  ofType(LOGGED_IN),
  take(1),
  mergeMap(() =>
    merge(
      addContactsEpic(action$, state$),
      acceptContactsEpic(action$, state$),
      updateContactsEpic(action$, state$)
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
