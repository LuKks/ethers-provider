const ethers = require('ethers')
const { StaticJsonRpcProvider } = ethers.providers
const { NETWORKS } = require('./constants.js')

class Provider extends StaticJsonRpcProvider {
  constructor (network) {
    if (!network.chainId) {
      const net = Provider.networks[network.name + '-' + (network.testnet ? 'testnet' : 'mainnet')]
      if (!net) throw new Error('Chain ID is required to create a static provider')
      network.chainId = net.chainId
    }

    delete network.testnet

    const retries = network.retries || 1
    delete network.retries

    super({ ...network, skipFetchSetup: true })

    this._maxRetries = retries

    this._cache.detectNetwork = {
      chainId: network.chainId,
      ensAddress: null,
      _defaultProvider: null,
      skipFetchSetup: true
    }
  }

  perform (method, params) {
    let retries = 0

    return ethers.utils.poll(() => {
      retries++

      return super.perform(method, params).catch((error) => {
        if (retries >= this._maxRetries) return Promise.reject(error)
        return Promise.resolve(undefined)
      })
    })
  }
}

Provider.networks = NETWORKS

module.exports = Provider
