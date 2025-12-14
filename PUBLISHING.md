# Publishing to NPM

This guide explains how to publish the `react-assets-gen` CLI tool to npm.

## Prerequisites

1. **NPM Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **NPM CLI**: Make sure you have npm installed (comes with Node.js)
3. **Login**: Login to npm via CLI

```bash
npm login
```

## Pre-Publishing Checklist

### 1. Update Package Information

Edit `cli/package.json`:

```json
{
  "name": "react-assets-gen",  // Or your preferred package name
  "version": "1.0.0",           // Semantic versioning
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-assets-gen.git"
  }
}
```

### 2. Check Package Name Availability

```bash
npm search react-assets-gen
```

If the name is taken, choose a different one (e.g., `@yourscope/react-assets-gen`).

### 3. Build the Package

```bash
cd cli
npm install
npm run build
```

Verify the `dist/` folder contains compiled JavaScript files.

### 4. Test Locally

Test the package locally before publishing:

```bash
# In the cli directory
npm pack
```

This creates a `.tgz` file. Install it in another project:

```bash
# In another project
npm install /path/to/react-assets-gen-1.0.0.tgz
```

Test the CLI:

```bash
npx assets-gen --help
```

### 5. Update Version (for subsequent releases)

```bash
# Patch release (1.0.0 -> 1.0.1)
npm version patch

# Minor release (1.0.0 -> 1.1.0)
npm version minor

# Major release (1.0.0 -> 2.0.0)
npm version major
```

## Publishing Steps

### First Time Publishing

```bash
cd cli

# Make sure you're logged in
npm whoami

# Build the package
npm run build

# Publish to npm
npm publish
```

### Publishing Scoped Package (Optional)

If you want to publish under your username/organization:

```bash
# Update package.json name to @yourscope/react-assets-gen
npm publish --access public
```

### Publishing Updates

```bash
cd cli

# Update version
npm version patch  # or minor, or major

# Build
npm run build

# Publish
npm publish
```

## Post-Publishing

### 1. Verify Publication

```bash
npm view react-assets-gen
```

Visit: `https://www.npmjs.com/package/react-assets-gen`

### 2. Test Installation

```bash
# In a test project
npm install -g react-assets-gen

# Test the CLI
assets-gen --version
assets-gen --help
```

### 3. Update Documentation

Update the main README.md with installation instructions:

```markdown
## Installation

```bash
npm install --save-dev react-assets-gen
```
```

## Package Structure

What gets published to npm:

```
react-assets-gen/
├── dist/              # Compiled JavaScript
│   ├── index.js
│   ├── config.js
│   ├── generator.js
│   ├── scanner.js
│   ├── watcher.js
│   ├── utils.js
│   ├── logger.js
│   └── types.js
├── README.md          # Documentation
├── LICENSE            # MIT License
└── package.json       # Package metadata
```

**Not included** (via `.npmignore`):
- `src/` - TypeScript source files
- `node_modules/`
- `tsconfig.json`
- Development files

## Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 -> 2.0.0): Breaking changes
- **MINOR** (1.0.0 -> 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 -> 1.0.1): Bug fixes

## Unpublishing (Emergency Only)

⚠️ **Warning**: Unpublishing is discouraged and has restrictions.

```bash
# Unpublish a specific version (within 72 hours)
npm unpublish react-assets-gen@1.0.0

# Deprecate instead (recommended)
npm deprecate react-assets-gen@1.0.0 "This version has a critical bug"
```

## CI/CD Publishing (GitHub Actions)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to NPM

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - name: Install dependencies
        run: |
          cd cli
          npm install
      
      - name: Build
        run: |
          cd cli
          npm run build
      
      - name: Publish to NPM
        run: |
          cd cli
          npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Add `NPM_TOKEN` to your GitHub repository secrets.

## Troubleshooting

### "Package name already exists"

Choose a different name or use a scoped package (`@yourscope/package-name`).

### "You must be logged in to publish"

```bash
npm login
npm whoami  # Verify login
```

### "Permission denied"

Make sure you have publishing rights to the package name.

### "Missing required files"

Ensure `dist/` folder exists and contains compiled code:

```bash
npm run build
ls -la dist/
```

## Best Practices

1. **Test before publishing**: Always test with `npm pack` first
2. **Semantic versioning**: Follow semver strictly
3. **Changelog**: Maintain a CHANGELOG.md
4. **Documentation**: Keep README.md up to date
5. **License**: Include a LICENSE file
6. **Git tags**: Tag releases in git
7. **CI/CD**: Automate publishing with GitHub Actions

## Quick Reference

```bash
# Login
npm login

# Build
cd cli && npm run build

# Test locally
npm pack

# Publish
npm publish

# Update version
npm version patch|minor|major

# View published package
npm view react-assets-gen
```

## Support

For issues with publishing, see:
- [NPM Publishing Docs](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [NPM CLI Docs](https://docs.npmjs.com/cli/)
