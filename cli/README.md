# React Assets Gen CLI

Production-ready CLI tool for generating type-safe asset imports in React projects.

## Features

- 🎯 **Type-Safe**: Generates strongly-typed TypeScript definitions
- 🔄 **Watch Mode**: Auto-regenerate on file changes
- 📁 **Nested Structure**: Maintains folder hierarchy
- 🎨 **SVG Support**: Optional React component exports
- ⚙️ **Configurable**: JSON configuration file
- 🚀 **Production Ready**: Clean, well-typed code

## Installation

```bash
npm install
npm run build
```

## Usage

```bash
# Generate once
node dist/index.js

# Watch mode
node dist/index.js --watch

# Verbose output
node dist/index.js --verbose

# Custom config
node dist/index.js --config path/to/config.json
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode (rebuild on changes)
npm run dev
```

## Project Structure

```
cli/
├── src/
│   ├── index.ts          # CLI entry point
│   ├── config.ts         # Configuration loader
│   ├── scanner.ts        # Asset scanner
│   ├── generator.ts      # Code generator
│   ├── watcher.ts        # File watcher
│   ├── utils.ts          # Utility functions
│   ├── logger.ts         # Logger
│   └── types.ts          # TypeScript types
├── dist/                 # Compiled output
├── package.json
└── tsconfig.json
```

## License

MIT
