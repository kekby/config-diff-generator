#!/usr/bin/env node
import CLI from '../src/CLI.js';

const cli = new CLI();

cli.program.parse();
