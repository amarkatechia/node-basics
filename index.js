#!/usr/bin/env node

const fs = require('fs');
const util = require('util');

// Method 3
const lstat = util.promisify(fs.lstat);

fs.readdir('.', async (err, filenames) => {
  if (err) {
    console.log(err);
  }

  const statPromises = filenames.map(filename => {
    return lstat(filename);
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    console.log(filenames[index], stats.isFile());
  }
});
