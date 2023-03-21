var fs = require('fs');

fs.appendFile('test.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});