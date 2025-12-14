import path from 'node:path';
import { SUPPORTED_EXTENSIONS } from './types.js';

/**
 * Converts a file path to a safe camelCase identifier
 * Examples:
 *   "my-icon.svg" -> "myIcon"
 *   "user_avatar.png" -> "userAvatar"
 *   "logo-2024.png" -> "logo2024"
 */
export function toSafeIdentifier(filePath: string): string {
  // Get filename without extension
  const parsed = path.parse(filePath);
  let name = parsed.name;

  // Replace non-alphanumeric characters with spaces
  name = name.replace(/[^a-zA-Z0-9]+/g, ' ');

  // Convert to camelCase
  name = name
    .trim()
    .split(' ')
    .map((word, index) => {
      if (index === 0) {
        // First word: lowercase
        return word.toLowerCase();
      }
      // Subsequent words: capitalize first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');

  // Ensure it starts with a letter (prepend 'asset' if it starts with a number)
  if (/^[0-9]/.test(name)) {
    name = 'asset' + name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Fallback for empty names
  return name || 'asset';
}

/**
 * Determines the asset category based on file extension
 */
export function getAssetCategory(extension: string): string | null {
  const ext = extension.toLowerCase();

  for (const [category, extensions] of Object.entries(SUPPORTED_EXTENSIONS)) {
    if ((extensions as readonly string[]).includes(ext)) {
      return category;
    }
  }

  return null;
}

/**
 * Checks if a file extension is supported
 */
export function isSupportedAsset(extension: string): boolean {
  return getAssetCategory(extension) !== null;
}

/**
 * Normalizes path separators to forward slashes
 */
export function normalizePath(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

/**
 * Creates a nested object structure from path segments
 * Example: ['icons', 'social', 'github'] -> { icons: { social: { github: value } } }
 */
export function createNestedObject(segments: string[], value: string): any {
  if (segments.length === 0) {
    return value;
  }

  const [first, ...rest] = segments;
  return {
    [first]: createNestedObject(rest, value),
  };
}

/**
 * Deep merges two objects, combining nested structures
 */
export function deepMerge(target: any, source: any): any {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (
        typeof source[key] === 'object' &&
        source[key] !== null &&
        !Array.isArray(source[key]) &&
        typeof result[key] === 'object' &&
        result[key] !== null &&
        !Array.isArray(result[key])
      ) {
        result[key] = deepMerge(result[key], source[key]);
      } else {
        result[key] = source[key];
      }
    }
  }

  return result;
}

/**
 * Generates a TypeScript type definition from a nested object structure
 */
export function generateTypeDefinition(obj: any, indentLevel: number = 0): string {
  const indent = '  '.repeat(indentLevel);
  const entries: string[] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      entries.push(`${indent}  readonly ${key}: string;`);
    } else if (typeof value === 'object' && value !== null) {
      entries.push(`${indent}  readonly ${key}: {`);
      entries.push(generateTypeDefinition(value, indentLevel + 1));
      entries.push(`${indent}  };`);
    }
  }

  return entries.join('\n');
}
