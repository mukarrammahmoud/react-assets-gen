import fs from 'node:fs/promises';
import path from 'node:path';
import type { AssetsGenConfig, Logger } from './types.js';

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: AssetsGenConfig = {
  assetsDir: 'assets',
  output: 'src/generated/assets.ts',
  svg: {
    asComponent: true,
  },
  verbose: false,
};

/**
 * Loads configuration from file or returns default
 */
export async function loadConfig(
  configPath: string | undefined,
  projectRoot: string,
  logger: Logger
): Promise<AssetsGenConfig> {
  if (!configPath) {
    // Try to find default config file
    const defaultConfigPath = path.join(projectRoot, 'assets-gen.config.json');
    try {
      await fs.access(defaultConfigPath);
      configPath = defaultConfigPath;
    } catch {
      // No config file found, use defaults
      logger.debug('No config file found, using defaults');
      return DEFAULT_CONFIG;
    }
  }

  try {
    const configContent = await fs.readFile(configPath, 'utf-8');
    const userConfig = JSON.parse(configContent) as Partial<AssetsGenConfig>;

    logger.debug(`Loaded config from: ${configPath}`);

    // Merge with defaults
    return {
      ...DEFAULT_CONFIG,
      ...userConfig,
      svg: {
        ...DEFAULT_CONFIG.svg,
        ...userConfig.svg,
      },
    };
  } catch (error) {
    logger.warn(`Failed to load config from ${configPath}, using defaults`);
    logger.debug((error as Error).message);
    return DEFAULT_CONFIG;
  }
}

/**
 * Validates configuration
 */
export function validateConfig(config: AssetsGenConfig, logger: Logger): boolean {
  if (!config.assetsDir) {
    logger.error('assetsDir is required in configuration');
    return false;
  }

  if (!config.output) {
    logger.error('output is required in configuration');
    return false;
  }

  if (!config.output.endsWith('.ts')) {
    logger.error('output must be a .ts file');
    return false;
  }

  return true;
}
