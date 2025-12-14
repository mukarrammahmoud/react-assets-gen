#!/usr/bin/env node

/**
 * Pre-publish verification script
 * Run this before publishing to npm to ensure everything is ready
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errors = [];
const warnings = [];

console.log('🔍 Pre-publish verification...\n');

// Check 1: dist folder exists
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  errors.push(' dist/ folder not found. Run "npm run build" first.');
} else {
  console.log(' dist/ folder exists');
}

// Check 2: Required files in dist
const requiredFiles = ['index.js', 'config.js', 'generator.js', 'scanner.js', 'watcher.js', 'utils.js', 'logger.js', 'types.js'];
const missingFiles = requiredFiles.filter(file => !fs.existsSync(path.join(__dirname, 'dist', file)));
if (missingFiles.length > 0) {
  errors.push(` Missing compiled files: ${missingFiles.join(', ')}`);
} else {
  console.log(' All required files compiled');
}

// Check 3: package.json exists and is valid
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
  
  if (!pkg.name) {
    errors.push(' package.json missing "name" field');
  } else {
    console.log(` Package name: ${pkg.name}`);
  }
  
  if (!pkg.version) {
    errors.push(' package.json missing "version" field');
  } else {
    console.log(`Version: ${pkg.version}`);
  }
  
  if (!pkg.description) {
    warnings.push(' package.json missing "description" field');
  } else {
    console.log(` Description: ${pkg.description.substring(0, 50)}...`);
  }
  
  if (!pkg.author) {
    warnings.push(' package.json missing "author" field');
  }
  
  if (!pkg.repository) {
    warnings.push(' package.json missing "repository" field');
  }
  
  if (!pkg.keywords || pkg.keywords.length === 0) {
    warnings.push(' package.json missing "keywords" field');
  } else {
    console.log(`✓ Keywords: ${pkg.keywords.length} keywords`);
  }
  
  if (!pkg.bin || !pkg.bin['assets-gen']) {
    errors.push(' package.json missing "bin" field for assets-gen');
  } else {
    console.log('CLI binary configured');
  }
  
  if (!pkg.files || pkg.files.length === 0) {
    warnings.push('⚠ package.json missing "files" field (will publish everything)');
  } else {
    console.log(` Files whitelist: ${pkg.files.join(', ')}`);
  }
} catch (error) {
  errors.push(' Invalid package.json: ' + error.message);
}

// Check 4: README exists
if (!fs.existsSync(path.join(__dirname, 'README.md'))) {
  warnings.push(' README.md not found');
} else {
  console.log(' README.md exists');
}

// Check 5: LICENSE exists
if (!fs.existsSync(path.join(__dirname, 'LICENSE'))) {
  warnings.push(' LICENSE file not found');
} else {
  console.log('LICENSE exists');
}

// Check 6: .npmignore exists
if (!fs.existsSync(path.join(__dirname, '.npmignore'))) {
  warnings.push('⚠ .npmignore not found (will use .gitignore)');
} else {
  console.log('✓ .npmignore exists');
}

// Check 7: Main entry point has shebang
const mainFile = path.join(__dirname, 'dist', 'index.js');
if (fs.existsSync(mainFile)) {
  const content = fs.readFileSync(mainFile, 'utf-8');
  if (!content.startsWith('#!/usr/bin/env node')) {
    warnings.push(' dist/index.js missing shebang (#!/usr/bin/env node)');
  } else {
    console.log(' Main entry has shebang');
  }
}

// Print summary
console.log('\n' + '='.repeat(50));
if (errors.length > 0) {
  console.log('\nERRORS:');
  errors.forEach(err => console.log('  ' + err));
}

if (warnings.length > 0) {
  console.log('\nWARNINGS:');
  warnings.forEach(warn => console.log('  ' + warn));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log('\n All checks passed! Ready to publish.');
  console.log('\nNext steps:');
  console.log('  1. npm login');
  console.log('  2. npm publish');
} else if (errors.length === 0) {
  console.log('\     No critical errors. You can publish, but consider fixing warnings.');
  console.log('\nNext steps:');
  console.log('  1. npm login');
  console.log('  2. npm publish');
} else {
  console.log('\n Fix errors before publishing.');
  process.exit(1);
}
