var fs = require('fs');

fs.rename('test.txt', 'info.txt', function (err) {
  if (err) throw err;
  console.log('File Renamed!');
});