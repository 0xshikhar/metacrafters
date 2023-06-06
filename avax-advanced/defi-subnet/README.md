# Avalanche Subnet - Defi Project

Here's a overview of the steps you need to take:

Set up your EVM subnet: You can use our guide and the Avalanche documentation to create a custom EVM subnet on the Avalanche network.

Define your native currency: You can set up your own native currency, which can be used as the in-game currency for your DeFi Kingdom clone.

Connect to Metamask: Connect you EVM Subnet to metamask, this can be done by following the steps laid out in our guide.

Deploy basic building blocks: You can use Solidity and Remix to deploy the basic building blocks of your game, such as smart contracts for battling, exploring, and trading. These contracts will define the game rules, such as liquidity pools, tokens, and more.

## Contract
### On Avalanche Fuji Testnet

Avalanche token contract - 0x43ccc7277E12d6dD3363B9897e0cf5BB22e93735

Avalanche Vault contract - 0x72c186Fbff451a87E2b538219BC6Ffefd19F7aEA  



## Hardhat setup

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.ts
```
