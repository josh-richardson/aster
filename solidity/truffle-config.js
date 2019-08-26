const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");
const mnemonic = fs.readFileSync(".secret", "utf8").toString();

module.exports = {
  plugins: ["truffle-security"],
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*"
    },

    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://ropsten.infura.io/v3/de602e3af84545cbb8ad167974146f61`
        ),
      network_id: 3,
      gas: 5500000,
      confirmations: 0,
      timeoutBlocks: 50,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.5.8"
    }
  },
  mocha: {
    enableTimeouts: false
  }
};
