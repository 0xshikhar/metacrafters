var fs = require('fs')
const path = require('path')
console.log(__dirname)

for (var i = 0; i < 5; i++) {
	var json = {}
	json.name = 'Bored Kitty #' + i
	json.description = 'This is description for Token #' + i
	json.image =
		'https://gateway.pinata.cloud/ipfs/Qmb4rH7RsJts1A3bQkzAbKsgsbEk3yaPRUso8uSHeVB8K8/' +
		i +
		'.png'
	fs.writeFileSync(
		path.join(__dirname, 'metadata', String(i)),
		JSON.stringify(json)
	)
}
