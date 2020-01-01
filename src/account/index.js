
const IpfsBundle = require('@tabcat/ipfs-bundle-t')
const PeerAccountLogin = require('@tabcat/peer-account-login')

const pal = PeerAccountLogin.create(IpfsBundle)
const login = async () => {
  const login = await pal
  await login.initialized
  if (login.status === 'FAILED') throw new Error('login failed to initialize')
  return login
}

export default login
