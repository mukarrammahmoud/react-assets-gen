#!/usr/bin/env node

import { Command } from 'commander';
import path from 'node:path';
import { loadConfig, validateConfig } from './config.js';
import { generateAssetsFile } from './generator.js';
import { createLogger } from './logger.js';
import { scanAssets } from './scanner.js';
import { watchAssets } from './watcher.js';

/**
 * Main CLI entry point
 */
async function main() {
  const program = new Command();

  program
    .name('assets-gen')
    .description('Production-ready React Assets Code Generator')
    .version('1.0.0')
    .option('-c, --config <path>', 'Path to config file (assets-gen.config.json)')
    .option('-w, --watch', 'Watch assets directory for changes')
    .option('-v, --verbose', 'Enable verbose logging')
    .option('--assets-dir <path>', 'Assets directory (overrides config)')
    .option('--output <path>', 'Output file path (overrides config)')
    .parse(process.argv);

  const options = program.opts();

  // Determine project root (current working directory)
  const projectRoot = process.cwd();

  // Create logger
  const logger = createLogger(options.verbose);

  try {
    // Load configuration
    let config = await loadConfig(options.config, projectRoot, logger);

    // Override with CLI options
    if (options.assetsDir) {
      config.assetsDir = options.assetsDir;
    }
    if (options.output) {
      config.output = options.output;
    }
    if (options.verbose) {
      config.verbose = true;
    }

    // Validate configuration
    if (!validateConfig(config, logger)) {
      process.exit(1);
    }

    logger.debug(`Project root: ${projectRoot}`);
    logger.debug(`Assets directory: ${config.assetsDir}`);
    logger.debug(`Output file: ${config.output}`);

    // Watch mode
    if (options.watch) {
      await watchAssets(config, projectRoot, logger);
      return;
    }

    // Single generation
    const assetsPath = path.resolve(projectRoot, config.assetsDir);
    const assets = await scanAssets(assetsPath, logger);
    await generateAssetsFile(assets, config, projectRoot, logger);

    logger.success('✨ Done!');
  } catch (error) {
    logger.error(`Fatal error: ${(error as Error).message}`);
    if (options.verbose) {
      console.error(error);
    }
    process.exit(1);
  }
}

main();
