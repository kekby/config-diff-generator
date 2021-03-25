#!/usr/bin/env node
import cli from '../src/cli.js';

cli.parse(process.argv);

if (!cli.args.length) cli.help();
