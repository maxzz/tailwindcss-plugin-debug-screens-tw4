# TailwindCSS Debug Screens Plugin for v4.0

A TailwindCSS v4.0 plugin that displays the current screen size in development mode to help with responsive design debugging.

## Features

- 🎯 Shows current breakpoint and screen size
- 🎨 Customizable position and styling
- 🚀 TypeScript support with full type definitions
- 🔧 ES6 module format
- 🎭 Development-only (automatically disabled in production)
- 📱 Works with all TailwindCSS v4.0 breakpoints

## Installation

```bash
# Using pnpm (recommended)
pnpm add tailwindcss-plugin-debug-screens-tw4

# Using npm
npm install tailwindcss-plugin-debug-screens-tw4

# Using yarn
yarn add tailwindcss-plugin-debug-screens-tw4
```

## Usage

### Basic Usage

Add the plugin to your TailwindCSS v4.0 configuration:

```javascript
// tailwind.config.js
import debugScreens from 'tailwindcss-plugin-debug-screens-tw4';

export default {
  plugins: [
    debugScreens()
  ]
};
```

Then add the debug class to your HTML:

```html
<body class="debug-screens">
  <!-- Your content -->
</body>
```

### Advanced Configuration

```javascript
// tailwind.config.js
import debugScreens from 'tailwindcss-plugin-debug-screens-tw4';

export default {
  plugins: [
    debugScreens({
      position: 'bottom-right', // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
      style: {
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        fontSize: '14px',
        fontFamily: 'ui-monospace, monospace',
        padding: '6px 12px',
        borderRadius: '6px',
        opacity: '0.9'
      },
      prefix: 'tw-', // Add prefix to avoid conflicts
      ignore: ['prose', 'container'] // Ignore specific classes
    })
  ]
};
```

### TypeScript Usage

```typescript
import debugScreens, { type PluginOptions } from 'tailwindcss-plugin-debug-screens-tw4';

const debugOptions: PluginOptions = {
  position: 'top-right',
  style: {
    backgroundColor: '#dc2626',
    color: '#ffffff'
  }
};

export default {
  plugins: [
    debugScreens(debugOptions)
  ]
};
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'top-left'` | Position of the debug indicator |
| `style` | `object` | See below | Custom CSS styles for the indicator |
| `prefix` | `string` | `''` | Prefix for CSS classes |
| `ignore` | `string[]` | `['prose']` | Classes to ignore during processing |

### Default Styles

```javascript
{
  backgroundColor: '#000',
  color: '#fff',
  fontSize: '12px',
  fontFamily: 'monospace',
  padding: '4px 8px',
  borderRadius: '4px',
  zIndex: '9999',
  opacity: '0.8'
}
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd tailwindcss-plugin-debug-screens-tw4

# Install dependencies
pnpm install
```

### Available Scripts

```bash
# Build the package
pnpm build

# Build in watch mode
pnpm dev

# Debug the plugin
pnpm debug

# Run tests
pnpm test

# Clean build directory
pnpm clean

# Publish to npm
pnpm deploy
```

### Building

The package is built using [tsup](https://tsup.egoist.dev/) which provides:

- Fast TypeScript compilation
- ES6 module output
- Type declaration generation
- Source maps
- Tree shaking support

## License

MIT

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Changelog

### 1.0.0

- Initial release
- TailwindCSS v4.0 support
- TypeScript support
- ES6 module format
- Customizable positioning and styling