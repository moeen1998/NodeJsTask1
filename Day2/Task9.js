var fs = require('fs');

fs.mkdir('TestDirectory', (err) => {
  if (err) throw err;
  console.log('Directory created Successfully!');
});