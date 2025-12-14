# React Assets Gen

Production-ready React Assets Code Generator - Type-safe asset imports for React projects, similar to Flutter Assets Gen.

## Features

✨ **Type-Safe** - Generate strongly-typed TypeScript definitions for all your assets  
🔄 **Watch Mode** - Automatically regenerate on file changes  
📁 **Nested Structure** - Maintains your folder hierarchy in the generated code  
🎨 **SVG Support** - Optional React component exports for SVGs (works with Vite/SVGR)  
⚙️ **Configurable** - JSON configuration file support  
🚀 **Production Ready** - Clean, well-typed, production-grade code  
📦 **Zero Runtime Dependencies** - Generated file has no runtime dependencies  

## Supported Asset Types

- **Images**: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, `.avif`
- **SVG**: `.svg` (with optional React component export)
- **Fonts**: `.woff`, `.woff2`, `.ttf`, `.otf`, `.eot`
- **Videos**: `.mp4`, `.webm`, `.ogg`
- **Audio**: `.mp3`, `.wav`, `.ogg`, `.m4a`

## Installation

### As a Dev Dependency (Recommended)

```bash
# Using npm
npm install --save-dev react-assets-gen

# Using pnpm
pnpm add -D react-assets-gen

# Using yarn
yarn add -D react-assets-gen
```

### Global Installation

```bash
npm install -g react-assets-gen
```

## Quick Start

### 1. Create Assets Directory

Create an `assets/` folder in your project root:

```
my-react-app/
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   └── hero-bg.webp
│   ├── icons/
│   │   ├── close.svg
│   │   └── menu.svg
│   └── fonts/
│       └── custom-font.woff2
├── src/
└── package.json
```

### 2. Run the Generator

```bash
# If installed locally
npx assets-gen

# If installed globally
assets-gen
```

### 3. Use Generated Assets

```tsx
import { Assets } from '@/generated/assets';

function App() {
  return (
    <div>
      <img src={Assets.images.logo} alt="Logo" />
      <img src={Assets.images.heroBg} alt="Hero" />
    </div>
  );
}
```

### 4. Use SVG Components (Optional)

If SVG components are enabled:

```tsx
import { SvgComponents } from '@/generated/assets';

function Header() {
  return (
    <header>
      <SvgComponents.icons.menu />
      <SvgComponents.icons.close />
    </header>
  );
}
```

## Configuration

Create an `assets-gen.config.json` file in your project root:

```json
{
  "assetsDir": "src/assets",
  "output": "src/generated/assets.ts",
  "svg": {
    "asComponent": true
  },
  "verbose": false
}
```

You can place your assets in any folder you like—just update the `assetsDir` path accordingly.

- **assetsDir**: Directory containing your assets (images, icons, SVGs).
- **output**: Path to the generated TypeScript file.
- **svg.asComponent**: Set to `true` to generate React components for SVGs.
- **verbose**: Set to `true` to log detailed information during generation.

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `assetsDir` | `string` | `"assets"` | Directory containing your assets (relative to project root) |
| `output` | `string` | `"src/generated/assets.ts"` | Output file path (relative to project root) |
| `svg.asComponent` | `boolean` | `true` | Generate React component exports for SVGs |
| `verbose` | `boolean` | `false` | Enable verbose logging |

## CLI Usage

```bash
assets-gen [options]
```

### Options

| Option | Description |
|--------|-------------|
| `-c, --config <path>` | Path to config file |
| `-w, --watch` | Watch assets directory for changes |
| `-v, --verbose` | Enable verbose logging |
| `--assets-dir <path>` | Assets directory (overrides config) |
| `--output <path>` | Output file path (overrides config) |
| `--version` | Show version number |
| `--help` | Show help |

### Examples

```bash
# Generate once
assets-gen

# Watch mode (auto-regenerate on changes)
assets-gen --watch

# Custom config file
assets-gen --config custom-config.json

# Override assets directory
assets-gen --assets-dir public/assets

# Verbose output
assets-gen --verbose
```

## Integration with Build Tools

### Vite

For SVG React components to work with Vite, install `vite-plugin-svgr`:

```bash
npm install --save-dev vite-plugin-svgr
```

Update `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr(), // Enable SVG as React components
  ],
});
```

### Package.json Scripts

Add scripts to your `package.json`:

```json
{
  "scripts": {
    "assets:gen": "assets-gen",
    "assets:watch": "assets-gen --watch",
    "predev": "assets-gen",
    "prebuild": "assets-gen"
  }
}
```

This ensures assets are generated before dev/build.

## Generated File Structure

Given this asset structure:

```
assets/
├── images/
│   ├── logo.png
│   └── products/
│       └── item-1.jpg
└── icons/
    └── close.svg
```

The generated `src/generated/assets.ts` will look like:

```ts
/**
 * AUTO-GENERATED FILE - DO NOT EDIT
 * Generated by react-assets-gen
 * Generated at: 2025-12-14T17:30:00.000Z
 */

import closeSvgComponent from '../../assets/icons/close.svg?react';

export interface AssetsType {
  readonly images: {
    readonly logo: string;
    readonly products: {
      readonly item1: string;
    };
  };
  readonly icons: {
    readonly close: string;
  };
}

export const Assets: AssetsType = {
  images: {
    logo: '../../assets/images/logo.png',
    products: {
      item1: '../../assets/images/products/item-1.jpg',
    },
  },
  icons: {
    close: '../../assets/icons/close.svg',
  },
} as const;

export const SvgComponents = {
  close: closeSvgComponent,
} as const;

export default Assets;
```

## Naming Conventions

File names are converted to camelCase identifiers:

| File Name | Generated Identifier |
|-----------|---------------------|
| `logo.png` | `logo` |
| `hero-image.jpg` | `heroImage` |
| `user_avatar.png` | `userAvatar` |
| `icon-2024.svg` | `icon2024` |
| `my-logo.png` | `myLogo` |

## TypeScript Path Aliases

For cleaner imports, configure path aliases in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Then import like:

```tsx
import { Assets } from '@/generated/assets';
```

## Best Practices

1. **Commit Generated Files** - Commit `src/generated/assets.ts` to version control for consistency
2. **Pre-build Generation** - Add `assets-gen` to your `prebuild` script
3. **Watch Mode in Dev** - Run `assets-gen --watch` during development
4. **Organize Assets** - Use folders to organize assets by type/feature
5. **Optimize Assets** - Compress images before adding to assets folder

## Troubleshooting

### SVG Components Not Working

Make sure you have `vite-plugin-svgr` installed and configured:

```bash
npm install --save-dev vite-plugin-svgr
```

### Module Not Found Errors

Check that:
- The generated file path is correct
- TypeScript path aliases are configured
- The assets directory exists

### Assets Not Updating

- Run `assets-gen` manually to regenerate
- Check file permissions
- Use `--verbose` flag for detailed logs

## Requirements

- **Node.js**: >= 18.0.0
- **TypeScript**: >= 5.0.0 (for consuming projects)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Comparison with Flutter Assets Gen

This tool brings the same developer experience from Flutter to React:

| Feature | Flutter Assets Gen | React Assets Gen |
|---------|-------------------|------------------|
| Type Safety | ✅ | ✅ |
| Auto-generation | ✅ | ✅ |
| Watch Mode | ✅ | ✅ |
| Nested Structure | ✅ | ✅ |
| Zero Runtime Deps | ✅ | ✅ |
| SVG Components | ❌ | ✅ |

## Support

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ by Mukarram for the React community**
