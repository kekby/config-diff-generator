#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/index.js';

const { Command } = commander;

const program = new Command();

program
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    if (!firstConfig || !secondConfig) {
      program.help();
    }

    try {
      const diff = genDiff(firstConfig, secondConfig, program.opts().format);
      console.log(diff);
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format', 'stylish');

program.parse(process.argv);

if (!program.args.length) program.help();
