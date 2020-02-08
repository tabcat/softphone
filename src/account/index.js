
import { baseSelectors } from '../state'
const IpfsBundle = require('@tabcat/ipfs-bundle-t')
const OrbitDB = require('orbit-db')
const PeerAccount = require('@tabcat/peer-account')
const PeerAccountLogin = require('@tabcat/peer-account-login')

const pal = PeerAccountLogin.create(IpfsBundle, OrbitDB, PeerAccount)
  .then(p => p.initialized
    .then(() => p)
    .catch(e => {
      console.error(e)
      throw new Error('login failed to initialize')
    })
  )
  .catch(e => {
    console.error(e)
    throw new Error('failed to create peer-account-login')
  })

console.log(pal)

export default pal

export const getAccount = async (state) => {
  const p = await pal
  const { username, password } = baseSelectors.loggedIn(state)
  const account = await p.loginUser(username, password)
  await account.initialized
  return account
}

export const getMyProfile = async (state) => {
  const { profiles } = await getAccount(state)
  return profiles.myProfile
}

export const getContactOffer = async (state, sessionId) => {
  const { inbox } = await getAccount(state)
  const [contactOffer] =
    await inbox.inboxQuery(offer => offer.sessionId === sessionId)
  if (!contactOffer) throw new Error('sessionId not found')
  return contactOffer
}

export const getContactOffers = async (state) => {
  const { profiles, contacts, inbox } = await getAccount(state)
  const accepted = await contacts.existingIds()
  const filter = (offer) => !accepted.has(offer.name)
  const newOffers = await inbox.inboxQuery(filter)

  newOffers.map(request =>
    profiles.profileOpen(request.sender.profile)
      .catch(() => {})
  )
  return newOffers
}

export const getContactRecords = async (state) => {
  const { contacts } = await getAccount(state)
  return contacts.recordsRead()
}

export const contactAdd = async (state, profile) => {
  const { contacts } = await getAccount(state)
  return contacts.contactAdd(profile)
}

export const contactByProfile = async (state, profile) => {
  const { contacts } = await getAccount(state)
  return contacts.contactBy(profile)
}

export const contactAccept = async (state, contactOffer) => {
  const { contacts } = await getAccount(state)
  return contacts.contactAccept(contactOffer)
}
