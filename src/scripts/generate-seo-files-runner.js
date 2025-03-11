// src/scripts/generate-seo-files-runner.js

// This script is used to run the TypeScript SEO generation script
// It's necessary because we want to run the TypeScript code directly without compiling it first

// Register ts-node to enable direct execution of TypeScript files
require('ts-node').register({
  transpileOnly: true,
  project: './ts-node-config.json', // Use the dedicated ts-node config
});

// Run the actual generator
require('./generate-seo-files.ts');

// Add proper error handling for process
process.on('unhandledRejection', reason => {
  console.error('Unhandled Rejection at:', reason);
  process.exit(1);
});

process.on('uncaughtException', error => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
