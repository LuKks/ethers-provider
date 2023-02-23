# ethers-provider

Static JSON RPC Provider that retries on errors

```
npm i ethers-provider
```

## Usage
```javascript
const Provider = require('ethers-provider')

const mainnet = new Provider({ name: 'bnb', testnet: false, url: 'https://bsc-dataseed.binance.org', retries: 3 })
const testnet = new Provider({ name: 'bnb', testnet: true, url: 'https://data-seed-prebsc-1-s1.binance.org:8545', retries: 3 })
```

## API

#### `const provider = new Provider(options)`

Available `options`:
```js
{
  name: null,
  testnet: undefined,
  url: 'https://json-rpc-example.tld',
  chainId: 1, // ETH 1, BNB 56, etc
  retries: 1 // Total attempts
}
```

For example, for Mainnet BNB Chain:
```js
const provider = new Provider({ url: 'https://bsc-dataseed.binance.org', chainId: 56, retries: 3 })
```

If you set one of those names, it will autocomplete the chain ID for you:\
`eth`: mainnet `1` | testnet `3`\
`bnb`: mainnet `56` | testnet `97`\
`polygon`: mainnet `137` | testnet `80001`

This example uses the chain ID `56`:
```js
const provider = new Provider({ name: 'bnb', url: 'https://bsc-dataseed.binance.org' })
```

This other example uses the chain ID `97`
```js
const provider = new Provider({ name: 'bnb', testnet: true, url: 'https://data-seed-prebsc-1-s1.binance.org:8545' })
```

## License
MIT
