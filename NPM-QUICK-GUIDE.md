# NPM Package Publishing - Quick Guide

## What Gets Published

When you publish the `cli` folder to npm, users will be able to install and use your CLI tool globally or as a dev dependency.

### Package Structure (What Users Get)

```
react-assets-gen/
├── dist/              # Compiled JavaScript (from TypeScript)
│   ├── index.js       # CLI entry point
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

### What's NOT Published (Excluded via .npmignore)

- `src/` - TypeScript source files
- `node_modules/`
- `tsconfig.json`
- Development files
- Test files

## Publishing Steps

### 1. Prepare the Package

```bash
cd cli

# Install dependencies
npm install

# Build the package
npm run build

# Verify everything is ready
npm run verify
```

### 2. Update Package Info (First Time Only)

Edit `cli/package.json`:

```json
{
  "name": "react-assets-gen",  // Change if name is taken
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "url": "https://github.com/yourusername/react-assets-gen.git"
  }
}
```

### 3. Login to NPM

```bash
npm login
# Enter your npm username, password, and email
```

### 4. Publish

```bash
# First time
npm publish

# Or if using a scoped package
npm publish --access public
```

## After Publishing

### Users Can Install It

```bash
# Global installation
npm install -g react-assets-gen

# Or as dev dependency
npm install --save-dev react-assets-gen
```

### Users Can Use It

```bash
# If installed globally
assets-gen --help
assets-gen --watch

# If installed as dev dependency
npx assets-gen --help
npx assets-gen --watch
```

## Updating the Package

When you make changes and want to publish a new version:

```bash
cd cli

# Update version (choose one)
npm version patch   # 1.0.0 -> 1.0.1 (bug fixes)
npm version minor   # 1.0.0 -> 1.1.0 (new features)
npm version major   # 1.0.0 -> 2.0.0 (breaking changes)

# Build
npm run build

# Verify
npm run verify

# Publish
npm publish
```

## Package Name

The package name in `cli/package.json` is `react-assets-gen`. 

**Important**: 
- Check if this name is available: `npm search react-assets-gen`
- If taken, choose a different name or use a scoped package: `@yourscope/react-assets-gen`

## What Users Will See

When users visit `https://www.npmjs.com/package/react-assets-gen`, they'll see:

- Your README.md as the main documentation
- Installation instructions
- Version history
- Download statistics
- Dependencies
- Keywords for discoverability

## Testing Before Publishing

### Test Locally

```bash
cd cli

# Create a tarball (simulates npm publish)
npm pack

# This creates: react-assets-gen-1.0.0.tgz
```

Install it in a test project:

```bash
cd /path/to/test-project
npm install /path/to/cli/react-assets-gen-1.0.0.tgz

# Test it
npx assets-gen --help
```

## Common Issues

### "Package name already exists"
- Choose a different name
- Or use scoped package: `@yourscope/react-assets-gen`

### "You must be logged in"
```bash
npm login
npm whoami  # Verify you're logged in
```

### "Missing dist folder"
```bash
npm run build
```

## Quick Command Reference

```bash
# Build
npm run build

# Verify package
npm run verify

# Test locally
npm pack

# Login
npm login

# Publish
npm publish

# Update version
npm version patch|minor|major

# View published package
npm view react-assets-gen
```

## Support

For detailed instructions, see `PUBLISHING.md`
