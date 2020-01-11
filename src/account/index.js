
const IpfsBundle = require('@tabcat/ipfs-bundle-t')
const PeerAccountLogin = require('@tabcat/peer-account-login')

const pal = PeerAccountLogin.create(IpfsBundle)
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
