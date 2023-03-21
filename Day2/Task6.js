// Sync
var fs = require('fs');
// // // // // //blocking code
var content = fs.readFileSync('data.json', 'utf8')
console.log(content)
// // // // //



////////// Q5-A Read data from data.json as sync  /////////////////
// var fs = require('fs');

// try {
//   var data = fs.readFileSync('data.json');
//   console.log(data);
// } catch (err) {
//   console.error(err);
// }
