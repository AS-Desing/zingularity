/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

HDWalletProvider = require('@truffle/hdwallet-provider');
const {mnemonic,projectId} = require('./secrets.json');

module.exports = {


  networks: {
  
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     //segunda red
     ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://eth-ropsten.alchemyapi.io/v2/${projectId}`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 5000,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

        rinkeby: {
            provider: () => new HDWalletProvider(
              mnemonic, `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
            ),
            network_id: 4,
            gasPrice: 10e9,
            skipDryRun: true,
          },
        


     //tercera red
     testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 1500,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 1500,
      skipDryRun: true
    },
     
     //
  },

  //crear los directorios

  contracts_directory:'./src/contracts',
  contracts_build_directory: './src/abis/abis',



  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
      //  evmVersion: "byzantium"
      // }
    }
  },


};
