// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
// const hre = require('hardhat')
const { FXRootContractAbi } = require('../contractABIs')

// this was mainly experimental script

// async function main() {
// 	const NftCollection = await ethers.getContractFactory('NftCollection')
// 	const nftCollection = await NftCollection.deploy()
// 	await nftCollection.deployed()

// 	console.log('HelloWorld deployed to:', nftCollection.address)
// 	nftCollection.mint(3)
// 	console.log('Mint completed')
// }

async function main() {
	// minted
	// const nftCollection = await ethers.getContractAt(
	// 	'NftCollection',
	// 	'0x78a03ad89a42d54221e2f6068f91988c7fa4339a'
	// )
	// await nftCollection.mint(3)
	// console.log('mint completed')
	//0x3Ca088700BF6e46D082aB6761a71FCf6bA96403e
	//.............
	//approve and deposit
	const signer = await ethers.getSigner()

	const nftCollection = await ethers.getContractAt(
		'KittyCat',
		'0x78a03ad89a42d54221e2f6068f91988c7fa4339a'
	)
	const fxRoot = await ethers.getContractAt(
		FXRootContractAbi,
		'0xF9bc4a80464E48369303196645e876c8C7D972de'
	)
	// await nftCollection.approve(fxRoot.address, 1)
	await fxRoot.deposit(
		nftCollection.address,
		'0x6BeF65D67c45505bA9BD5A747bA18Bb078E63549',
		1,
		'0x6566'
	)
	console.log('approved and deposited')
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
