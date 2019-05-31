#!/usr/bin/env node

import path from "path"
import yargs from "yargs"

// tslint:disable-next-line:no-unused-expression
yargs
  .commandDir(path.resolve(__dirname, "commands"))
  .demandCommand()
  .help()
  .argv
