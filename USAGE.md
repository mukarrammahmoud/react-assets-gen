# React Assets Gen - Usage Examples

## Installation

### Build the CLI

```bash
cd cli
npm install
npm run build
cd ..
```

## Basic Usage

### Generate Assets Once

```bash
# Using npm script
npm run assets:gen

# Or directly
node cli/dist/index.js
```

### Watch Mode (Auto-regenerate)

```bash
# Using npm script
npm run assets:watch

# Or directly
node cli/dist/index.js --watch
```

### Verbose Output

```bash
npm run assets:verbose
```

## Configuration

Create `assets-gen.config.json` in your project root:

```json
{
  "assetsDir": "assets",
  "output": "src/generated/assets.ts",
  "svg": {
    "asComponent": true
  },
  "verbose": false
}
```

## CLI Options

```bash
node cli/dist/index.js [options]

Options:
  -c, --config <path>      Path to config file
  -w, --watch              Watch mode
  -v, --verbose            Verbose logging
  --assets-dir <path>      Override assets directory
  --output <path>          Override output path
  --version                Show version
  --help                   Show help
```

## Usage in React

### Import Assets

```tsx
import { Assets } from '@/generated/assets';

function App() {
  return (
    <div>
      <img src={Assets.images.logo} alt="Logo" />
      <img src={Assets.icons.close} alt="Close" />
    </div>
  );
}
```

### SVG Components (if enabled)

```tsx
import { SvgComponents } from '@/generated/assets';

function Header() {
  return (
    <header>
      <SvgComponents.iconsMenu />
      <SvgComponents.iconsClose />
    </header>
  );
}
```

## Asset Organization

```
assets/
├── images/
│   ├── logo.png
│   ├── hero-bg.webp
│   └── products/
│       ├── item-1.jpg
│       └── item-2.jpg
├── icons/
│   ├── close.svg
│   ├── menu.svg
│   └── social/
│       ├── github.svg
│       └── twitter.svg
└── fonts/
    └── custom-font.woff2
```

Generated structure:

```ts
Assets.images.logo
Assets.images.heroBg
Assets.images.products.item1
Assets.images.products.item2
Assets.icons.close
Assets.icons.menu
Assets.icons.social.github
Assets.icons.social.twitter
Assets.fonts.customFont
```

## Integration with Build Process

### package.json

```json
{
  "scripts": {
    "predev": "npm run assets:gen",
    "prebuild": "npm run assets:gen",
    "dev": "vite",
    "build": "tsc -b && vite build"
  }
}
```

This ensures assets are generated before dev/build.

## TypeScript Configuration

### tsconfig.app.json

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

### vite.config.ts

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## Examples

### Example 1: Basic Image

```tsx
import { Assets } from '@/generated/assets';

export function Logo() {
  return <img src={Assets.images.logo} alt="Logo" className="logo" />;
}
```

### Example 2: Dynamic Asset Selection

```tsx
import { Assets } from '@/generated/assets';

interface ProductProps {
  productId: number;
}

export function Product({ productId }: ProductProps) {
  const imagePath = Assets.images.products[`item${productId}`];
  return <img src={imagePath} alt={`Product ${productId}`} />;
}
```

### Example 3: Background Images

```tsx
import { Assets } from '@/generated/assets';

export function Hero() {
  return (
    <div
      style={{
        backgroundImage: `url(${Assets.images.heroBg})`,
        backgroundSize: 'cover',
      }}
    >
      <h1>Welcome</h1>
    </div>
  );
}
```

## Troubleshooting

### Assets not found

1. Make sure the CLI is built: `cd cli && npm run build`
2. Run the generator: `npm run assets:gen`
3. Check that assets directory exists

### TypeScript errors

1. Ensure `tsconfig.app.json` has baseUrl and paths configured
2. Ensure `vite.config.ts` has alias configured
3. Restart TypeScript server in your IDE

### Watch mode not working

1. Check file permissions
2. Try running with `--verbose` flag
3. Make sure chokidar is installed in cli/node_modules

## Advanced Usage

### Custom Config File

```bash
node cli/dist/index.js --config custom-config.json
```

### Override Settings

```bash
node cli/dist/index.js --assets-dir public/assets --output src/assets.ts
```

### CI/CD Integration

```yaml
# .github/workflows/build.yml
- name: Generate Assets
  run: |
    cd cli && npm install && npm run build && cd ..
    npm run assets:gen
```
