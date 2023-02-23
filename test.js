const test = require('brittle')
const Provider = require('./index.js')

test('custom', function (t) {
  const provider = new Provider({ url: 'https://json-rpc-example.tld', chainId: 1337 })
  t.alike(provider.connection, { url: 'https://json-rpc-example.tld', chainId: 1337, skipFetchSetup: true })
})

test('eth', function (t) {
  t.is(Provider.networks['eth-mainnet'].chainId, 1)
  t.is(Provider.networks['eth-testnet'].chainId, 3)

  t.alike(new Provider({ name: 'eth' }).connection, { name: 'eth', chainId: 1, skipFetchSetup: true })
  t.alike(new Provider({ name: 'eth', testnet: false }).connection, { name: 'eth', chainId: 1, skipFetchSetup: true })
  t.alike(new Provider({ name: 'eth', testnet: true }).connection, { name: 'eth', chainId: 3, skipFetchSetup: true })
})

test('bnb', function (t) {
  t.is(Provider.networks['bnb-mainnet'].chainId, 56)
  t.is(Provider.networks['bnb-testnet'].chainId, 97)

  t.alike(new Provider({ name: 'bnb' }).connection, { name: 'bnb', chainId: 56, skipFetchSetup: true })
  t.alike(new Provider({ name: 'bnb', testnet: false }).connection, { name: 'bnb', chainId: 56, skipFetchSetup: true })
  t.alike(new Provider({ name: 'bnb', testnet: true }).connection, { name: 'bnb', chainId: 97, skipFetchSetup: true })
})

test('polygon', function (t) {
  t.is(Provider.networks['polygon-mainnet'].chainId, 137)
  t.is(Provider.networks['polygon-testnet'].chainId, 80001)

  t.alike(new Provider({ name: 'polygon' }).connection, { name: 'polygon', chainId: 137, skipFetchSetup: true })
  t.alike(new Provider({ name: 'polygon', testnet: false }).connection, { name: 'polygon', chainId: 137, skipFetchSetup: true })
  t.alike(new Provider({ name: 'polygon', testnet: true }).connection, { name: 'polygon', chainId: 80001, skipFetchSetup: true })
})
