import { generateAssetsFile } from './dist/generator.js';
import path from 'path';

const mockAssets = [
  {
    absolutePath: path.resolve('src/assets/icons/react.svg'),
    relativePath: 'src/assets/icons/react.svg',
    extension: '.svg',
    category: 'icons',
    identifier: 'react',
    pathSegments: ['icons', 'react'],
  },
  {
    absolutePath: path.resolve('src/assets/Images/react.svg'),
    relativePath: 'src/assets/Images/react.svg',
    extension: '.svg',
    category: 'images',
    identifier: 'react',
    pathSegments: ['images', 'react'],
  }
];

const mockConfig = {
  root: '.',
  output: 'generated/assets.ts',
  assetsDir: 'src/assets',
  svg: { asComponent: true }
};

// Mock logger
const logger = {
  info: console.log,
  success: console.log,
  error: console.error,
  warn: console.warn,
  debug: console.debug
};

// Run generation
generateAssetsFile(mockAssets, mockConfig, process.cwd(), logger).catch(console.error);
