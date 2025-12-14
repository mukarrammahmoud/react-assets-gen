import pc from 'picocolors';
import type { Logger } from './types.js';

/**
 * Creates a logger instance with colored output
 */
export function createLogger(verbose: boolean = false): Logger {
  return {
    info(message: string): void {
      console.log(pc.blue('ℹ'), message);
    },

    success(message: string): void {
      console.log(pc.green('✓'), message);
    },

    warn(message: string): void {
      console.warn(pc.yellow('⚠'), message);
    },

    error(message: string): void {
      console.error(pc.red('✖'), message);
    },

    debug(message: string): void {
      if (verbose) {
        console.log(pc.gray('→'), message);
      }
    },
  };
}
