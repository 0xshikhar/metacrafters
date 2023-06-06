// const hre = require('hardhat')
const { FXRootContractAbi } = require('../contractABIs')

async function main() {
	const NftCollection = await ethers.getContractFactory('KittyCat')
	const nftCollection = await NftCollection.deploy()
	await nftCollection.deployed()

	console.log('BoredKitty deployed to:', nftCollection.address)

	const txn = await nftCollection.mint(5)
	await txn.wait()
	console.log('Mint completed')
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
