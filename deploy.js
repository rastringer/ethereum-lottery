const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  // enter your mnemonic from metamask account
  'XXXXXX',
  // enter link with code infura will email when you sign up
  'https://rinkeby.infura.io/XXXXXX'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  // lowercase web3 for instance
  // interface is the ABI
  const result = await new web3.eth.Contract(JSON.parse(interface))
  .deploy({ data: bytecode })
  .send({ gas: '1000000', from: accounts[0] });

console.log(interface);

console.log('Contract deployed to ', result.options.address);
};

deploy();
// Now go to https://rinkeby.etherscan.io, search for contracts under the 'contract deployed to ' address to see output
