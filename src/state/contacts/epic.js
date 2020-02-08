
import {
  // contactAdd,
  // contactAccept,
  // getContactOffer,
  getContactOffers,
  getContactRecords,
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
  ignoreElements,
  withLatestFrom,
  take,
  filter,
  switchMap,
  mergeMap,
  takeUntil,
  catchError,
  retry,
  tap,
  bufferTime
} from 'rxjs/operators'
import {
  contactsActionTypes,
  contactsActionCreators,
  baseActionTypes
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

const inboxListenerEpic = (action$, state$) => of(1).pipe(
  withLatestFrom(state$),
  mergeMap(([o, state]) =>
    defer(() => getAccount(state)).pipe(
      retry(2),
      catchError(e => of(1).pipe(
        tap(() => {
          console.error(e)
          console.error('failed to connect contact listeners to account')
        })
      )),
      mergeMap(account => merge(
        swarmConnectOfferEpic(account),
        fromEvent(account.inbox.events, 'replicated').pipe(
          mergeMap(() => merge(
            of(1).pipe(map(updateRequestList)),
            swarmConnectOfferEpic(account)
            // const swarmConnectEpic = (account, profile) => defer(async () => {
            //   const { metadata } = await account.contacts.recordsQuery(
            //     record => record.recordId === profile
            //   )
            //   if (metadata.ipfsAddr) {
            //     account._orbitdbC._orbitdb._ipfs.swarm.connect(metadata.ipfsAddr)
            //       .catch(console.error)
            //   }
            // })
          ))
        )
      ))
    )
  )
)

// const contactsListenerEpic = (action$, state$) => of(1).pipe(
//   withLatestFrom(state$),
//   mergeMap(([o, state]) =>
//     defer(() => getAccount(state)).pipe(
//       retry(2),
//       catchError(e => of(1).pipe(
//         tap(() => {
//           console.error(e)
//           console.error('failed to connect contact listeners to account')
//         })
//       )),
//       mergeMap(account =>
//         merge(
//           fromEvent(account.contacts.events, )
//         )
//       )
//     )
//   )
// )

const swarmConnectEpic = (account, ipfsAddr) => defer(async () => {
  account._orbitdbC._orbitdb._ipfs.swarm.connect(ipfsAddr)
    .catch(console.error)
}).pipe(ignoreElements())

const swarmConnectContactEpic = (account, profile) => defer(async () => {
  const [record] = await account.contacts.recordsQuery(
    record => record.recordId === profile
  )
  console.log('here3')
  return record
}).pipe(
  filter(record => record && record.metadata && record.metadata.ipfsAddr),
  mergeMap(({ metadata: { ipfsAddr } }) => swarmConnectEpic(account, ipfsAddr))
)

const swarmConnectOfferEpic = (account) => defer(async () => {
  const offers = await account.inbox.inboxQuery(
    offer => offer.sender && offer.sender.ipfsAddr
  )
  return of(...offers.map(offer => offer.sender.ipfsAddr))
}).pipe(
  mergeMap(ipfsAddr$ =>
    ipfsAddr$.pipe(
      mergeMap(ipfsAddr => swarmConnectEpic(account, ipfsAddr))
    )
  )
)

const contactListenerEpic = (contact, state$) => merge(
  defer(() => contact.initialized).pipe(
    map(updateContactList)
  )
)

// const myProfileListenerEpic = (myProfile) => merge(
//   fromEvent(myProfile.events.)
// )

const contactsListenerEpic = (action$, state$) => of(1).pipe(
  withLatestFrom(state$),
  mergeMap(([o, state]) => defer(() => getAccount(state)).pipe(
    mergeMap(account =>
      merge(
        ...[...account.contacts._sessions.keys()]
          .map(profile => merge(
            contactListenerEpic(account.contacts._sessions.get(profile), state$),
            swarmConnectContactEpic(account, profile)
          )),
        fromEvent(account.contacts.events, 'openedSession').pipe(
          mergeMap(profile =>
            defer(() => account.contacts.contactBy(profile)).pipe(
              mergeMap((contact) => merge(
                contactListenerEpic(contact, state$),
                swarmConnectContactEpic(account, profile)
              ))
            )
          )
        )
      )
    ),
    retry(1),
    catchError(e => { console.error(e); return of() })
  ))
)

const addContact = async (state, code) => {
  const account = await getAccount(state)

  const mid = code.indexOf('/orbitdb/')
  const profile = code.slice(mid)

  const myProfile = await account.profiles.myProfile.address()

  if (myProfile.toString() === profile) {
    throw new Error('cannot add yourself')
  }

  const { addresses } = await account._orbitdbC._orbitdb._ipfs.id()
  const ipfsAddr =
    addresses.filter(addr => addr.startsWith('/p2p-circuit/ipfs/'))[0] ||
    addresses[0] ||
    null

  await account.contacts.contactAdd(
    profile,
    { ipfsAddr, metadata: { ipfsAddr: mid > 0 ? code.slice(0, mid) : null } }
  )
  if (mid > 0) {
    account._orbitdbC._orbitdb._ipfs.swarm.connect(code.slice(0, mid))
      .catch(console.error)
  }

  return profile
}

const acceptContact = async (state, profile) => {
  const account = await getAccount(state)

  const [offer] = await account.inbox.inboxQuery(record =>
    record.sender &&
    record.sender.profile &&
    record.sender.profile === profile
  )
  if (!offer) { throw new Error('offer not found') }

  if (await account.contacts.existId(profile)) {
    throw new Error('contact already added')
  }
  await account.contacts.contactAccept(
    offer,
    { recordId: profile, metadata: { ipfsAddr: offer.sender.ipfsAddr || null } }
  )
  if (offer.sender.ipfsAddr) {
    account._orbitdbC._orbitdb._ipfs.swarm.connect(offer.sender.ipfsAddr)
      .catch(console.error)
  }

  return profile
}

const addContactsEpic = (action$, state$) => action$.pipe(
  ofType(ADD_CONTACT),
  withLatestFrom(state$),
  mergeMap(([action, state]) =>
    defer(() => addContact(state, action.payload.code)).pipe(
      mergeMap((profile) => {
        return concat(
          of(addedContact(profile)),
          of(updateContactList())
        )
      }),
      catchError(e => {
        console.error(e)
        return of(addContactFail(action.payload.address))
      })
    )
  )
)

const acceptContactsEpic = (action$, state$) => action$.pipe(
  ofType(ACCEPT_CONTACT),
  withLatestFrom(state$),
  mergeMap(([{ payload: { profile } }, state]) =>
    defer(() => acceptContact(state, profile).catch(console.error)).pipe(
      mergeMap((profile) => {
        return concat(
          of(acceptedContact(profile)),
          of(updateContactList())
        )
      }),
      catchError(e => {
        console.error(e)
        return of(acceptContactFail(profile))
      })
    )
  )
)

const updateContactListEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_CONTACT_LIST),
  bufferTime(1000),
  filter(arr => arr.length > 0),
  withLatestFrom(state$),
  switchMap(([action, state]) =>
    defer(async () => {
      const records = await getContactRecords(state)
      const account = await getAccount(state)
      const completed = await account.messages.existingIds()
      return records.map(
        ({ recordId }) =>
          ({ profile: recordId, pending: !completed.has(recordId) })
      )
    }).pipe(map(setContactList))
  )
)

const updateRequestListEpic = (action$, state$) => action$.pipe(
  ofType(UPDATE_REQUEST_LIST),
  bufferTime(1000),
  filter(arr => arr.length > 0),
  withLatestFrom(state$),
  switchMap(([action, state]) =>
    defer(async () => {
      const records = await getContactOffers(state)
      return records.map(
        ({ sender: { profile } }) => ({ profile })
      )
    }).pipe(map(setRequestList))
  )
)

const initializeContactsEpic = (action$, state$) => merge(
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

const onLoggedInEpic = (action$, state$) => action$.pipe(
  ofType(LOGGED_IN),
  take(1),
  mergeMap(() =>
    merge(
      addContactsEpic(action$, state$),
      acceptContactsEpic(action$, state$),
      updateContactListEpic(action$, state$),
      updateRequestListEpic(action$, state$),
      contactsListenerEpic(action$, state$),
      inboxListenerEpic(action$, state$),
      initializeContactsEpic(action$, state$)
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
