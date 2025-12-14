import chokidar from 'chokidar';
import path from 'node:path';
import type { AssetsGenConfig, Logger } from './types.js';
import { scanAssets } from './scanner.js';
import { generateAssetsFile } from './generator.js';
import { isSupportedAsset } from './utils.js';

/**
 * Watches the assets directory for changes and regenerates on change
 */
export async function watchAssets(
  config: AssetsGenConfig,
  projectRoot: string,
  logger: Logger
): Promise<void> {
  const assetsPath = path.resolve(projectRoot, config.assetsDir);

  logger.info(`Watching for changes in: ${config.assetsDir}`);
  logger.info('Press Ctrl+C to stop');

  // Initial generation
  await regenerateAssets(config, projectRoot, logger);

  // Watch for changes
  const watcher = chokidar.watch(assetsPath, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 100,
      pollInterval: 100,
    },
  });

  watcher
    .on('add', (filePath) => {
      if (isSupportedAsset(path.extname(filePath))) {
        logger.info(`Asset added: ${path.relative(projectRoot, filePath)}`);
        regenerateAssets(config, projectRoot, logger);
      }
    })
    .on('unlink', (filePath) => {
      if (isSupportedAsset(path.extname(filePath))) {
        logger.info(`Asset removed: ${path.relative(projectRoot, filePath)}`);
        regenerateAssets(config, projectRoot, logger);
      }
    })
    .on('error', (error: unknown) => {
      const message = error instanceof Error ? error.message : String(error);
      logger.error(`Watcher error: ${message}`);
    });

  // Keep process alive
  process.on('SIGINT', () => {
    logger.info('Stopping watcher...');
    watcher.close();
    process.exit(0);
  });
}

/**
 * Regenerates the assets file
 */
async function regenerateAssets(
  config: AssetsGenConfig,
  projectRoot: string,
  logger: Logger
): Promise<void> {
  try {
    const assetsPath = path.resolve(projectRoot, config.assetsDir);
    const assets = await scanAssets(assetsPath, logger);
    await generateAssetsFile(assets, config, projectRoot, logger);
  } catch (error) {
    logger.error(`Failed to regenerate: ${(error as Error).message}`);
  }
}
