import fs from 'node:fs/promises';
import path from 'node:path';
import type { AssetFile, Logger } from './types.js';
import { getAssetCategory, isSupportedAsset, normalizePath, toSafeIdentifier } from './utils.js';

/**
 * Recursively scans a directory for asset files
 */
export async function scanAssets(
  assetsDir: string,
  logger: Logger
): Promise<AssetFile[]> {
  const assets: AssetFile[] = [];

  try {
    await scanDirectory(assetsDir, assetsDir, assets, logger);
    logger.success(`Found ${assets.length} asset(s)`);
    return assets;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      logger.warn(`Assets directory not found: ${assetsDir}`);
      return [];
    }
    throw error;
  }
}

/**
 * Recursively scans a directory
 */
async function scanDirectory(
  baseDir: string,
  currentDir: string,
  assets: AssetFile[],
  logger: Logger
): Promise<void> {
  const entries = await fs.readdir(currentDir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(currentDir, entry.name);

    if (entry.isDirectory()) {
      // Recursively scan subdirectories
      await scanDirectory(baseDir, fullPath, assets, logger);
    } else if (entry.isFile()) {
      const extension = path.extname(entry.name);

      if (isSupportedAsset(extension)) {
        const relativePath = path.relative(baseDir, fullPath);
        const category = getAssetCategory(extension)!;
        const pathSegments = getPathSegments(relativePath);
        const identifier = toSafeIdentifier(entry.name);

        assets.push({
          relativePath: normalizePath(relativePath),
          absolutePath: fullPath,
          extension,
          category,
          identifier,
          pathSegments,
        });

        logger.debug(`Found: ${relativePath} -> ${pathSegments.join('.')}`);
      }
    }
  }
}

/**
 * Converts a file path to path segments for nested object structure
 * Example: "icons/social/github.svg" -> ["icons", "social", "github"]
 */
function getPathSegments(relativePath: string): string[] {
  const parsed = path.parse(relativePath);
  const dirSegments = parsed.dir
    ? parsed.dir.split(path.sep).filter(Boolean)
    : [];
  const fileName = toSafeIdentifier(parsed.base);

  return [...dirSegments.map(toSafeIdentifier), fileName];
}
