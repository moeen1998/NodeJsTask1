// // Async
var fs = require('fs');
fs.readFile('data.json', 'utf8', function(err, data){
	if(err) throw err;
	console.log(data)
})
console.log('done');

//////// Q5-B Read data from data.json as async  /////////////////
// var fs = require('fs');

// async function readData() {
//   try {
//     var data = await fs.promises.readFile('data.json', 'utf8');
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// readData();