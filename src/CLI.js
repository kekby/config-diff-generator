import commander from 'commander';
import genDiff from './index.js';

const { Command } = commander;

const program = new Command();

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => console.log(
    genDiff(firstConfig, secondConfig, program.format),
  ));

export default program;
