const { createReadStream } = require('fs');

let counter = 0;

const stream = createReadStream('../content/big.txt', {
  encoding: 'utf8',
  highWaterMark: 200
});

stream.on('data', (chunk) => {
  counter++;
  console.log(`Chunk ${counter}:`);
  console.log(chunk);
});

stream.on('end', () => {
  console.log(`\n Total chunks received: ${counter}`);
});

stream.on('error', (err) => {
  console.log('Error:', err);
});
