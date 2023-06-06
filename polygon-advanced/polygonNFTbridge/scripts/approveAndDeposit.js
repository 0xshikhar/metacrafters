// const hre = require('hardhat')
const { FXRootContractAbi } = require('../contractABIs')

async function main() {
	const nftAddress = '0x2C31abE4dC9594670237ceA38796A1c9A935d632'
	const nftCollection = await ethers.getContractAt('KittyCat', nftAddress)
	const fxRoot = await ethers.getContractAt(
		FXRootContractAbi,
		'0xF9bc4a80464E48369303196645e876c8C7D972de'
	)

	const signer = await ethers.getSigner()
	console.log(nftCollection.address)

	const tokenIds = [0, 1, 2, 3, 4]

	//batch approve and deposit
	for (const tokenId of tokenIds) {
		let txn = await nftCollection.approve(fxRoot.address, tokenId)
		await txn.wait()
		console.log('Token #' + tokenId + ' approved')
		let txn2 = await fxRoot.deposit(
			nftCollection.address,
			signer.address,
			tokenId,
			'0x6566'
		)
		await txn2.wait()
		console.log('Token #' + tokenId + ' deposited')
	}
}

main().catch((error) => {
	console.error(error)
	process.exitCode = 1
})
