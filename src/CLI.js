import commander from 'commander';

const { Command } = commander;

class CLI {
  constructor() {
    this.program = new Command();
    this.program
      .version('0.1.0')
      .description('Compares two configuration files and shows a difference');
  }
}

export default CLI;
