#!/usr/bin/env node

const fs = require('fs/promises');
const os = require('os');
const path = require('path');

async function uniqZshHistory(file) {
  try {
    const history = await fs.readFile(file, 'utf8');
    const array = history.split(os.EOL);
    const cache = new Set();
    let i = array.length - 1;

    while (i > 0) {
      const command = array[i].replace(/^:\s+\d+:\d+;/, '');

      if (cache.has(command)) {
        array.splice(i, 1);
      } else {
        cache.add(command);
      }

      i--;
    }

    await fs.writeFile(file, array.join(os.EOL), 'utf8');

    process.exitCode = 0;
  } catch (error) {
    console.error(error);

    process.exitCode = 1;
  }
}

uniqZshHistory(path.resolve(process.env.HOME, '.zsh_history'));
