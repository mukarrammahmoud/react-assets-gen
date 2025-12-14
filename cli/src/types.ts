/**
 * Configuration options for the assets generator
 */
export interface AssetsGenConfig {
  /**
   * Directory containing assets (relative to project root)
   * @default "assets"
   */
  assetsDir: string;

  /**
   * Output file path (relative to project root)
   * @default "src/generated/assets.ts"
   */
  output: string;

  /**
   * SVG handling configuration
   */
  svg?: {
    /**
     * Generate React component exports for SVGs (requires SVGR/Vite plugin)
     * @default true
     */
    asComponent?: boolean;
  };

  /**
   * Enable verbose logging
   * @default false
   */
  verbose?: boolean;
}

/**
 * Supported asset file extensions
 */
export const SUPPORTED_EXTENSIONS = {
  images: ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'],
  svg: ['.svg'],
  fonts: ['.woff', '.woff2', '.ttf', '.otf', '.eot'],
  videos: ['.mp4', '.webm', '.ogg'],
  audio: ['.mp3', '.wav', '.ogg', '.m4a'],
} as const;

/**
 * Asset file information
 */
export interface AssetFile {
  /** Original file path relative to assets directory */
  relativePath: string;
  /** Absolute file path */
  absolutePath: string;
  /** File extension */
  extension: string;
  /** Asset category (images, svg, fonts, etc.) */
  category: string;
  /** Safe identifier name for TypeScript */
  identifier: string;
  /** Nested path segments for object structure */
  pathSegments: string[];
}

/**
 * Asset tree node for nested structure
 */
export interface AssetNode {
  [key: string]: AssetNode | string;
}

/**
 * Logger interface
 */
export interface Logger {
  info(message: string): void;
  success(message: string): void;
  warn(message: string): void;
  error(message: string): void;
  debug(message: string): void;
}
