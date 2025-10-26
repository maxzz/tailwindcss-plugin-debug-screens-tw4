# TailwindCSS Debug Plugins for v4.x

A collection of TailwindCSS v4.x plugins for debugging layouts and responsive designs.

Custom TypeScript version of [tailwindcss-debug-screens](https://github.com/jorenvanhee/tailwindcss-debug-screens) adapted for TailwindCSS v4.x with ES6 module format.

## Plugins Included

1. **Debug Screens** - Displays the current screen breakpoint in a fixed position overlay
2. **Debug Styles** - Visual debugging utilities with outlines, dots, and grid patterns

## Features

- 🎯 Shows current breakpoint name and size with pixel conversion
- 🎨 Fully customizable position and styling via theme configuration
- 🚀 TypeScript support with full type definitions
- 🔧 ES6 module format
- 📱 Works with all TailwindCSS v4.x breakpoints
- 💅 Beautiful default styling with modern colors and shadows
- 🔍 Visual debugging utilities for layout inspection

## Installation

```bash
# Using npm
npm install tailwindcss-plugin-debug-screens-tw4

# Using pnpm
pnpm add tailwindcss-plugin-debug-screens-tw4

# Using yarn
yarn add tailwindcss-plugin-debug-screens-tw4
```

## Usage

### Debug Screens Plugin

#### Basic Usage

Add the plugin to your TailwindCSS v4.x configuration:

```javascript
// tailwind.config.js
import debugScreens from 'tailwindcss-plugin-debug-screens-tw4';

export default {
  plugins: [
    debugScreens
  ]
};
```

```javascript
// tailwind.config.js from CommonJS
const { debugScreensPlugin } = require('tailwindcss-plugin-debug-screens-tw4');

module.exports = {
  plugins: [
    debugScreensPlugin
  ]
};
```

Then add the debug class to any top element in your HTML:

```html
<body class="debug-screens">
  <!-- Your content -->
</body>
```

You'll see an overlay in the bottom-left corner showing the current breakpoint, like:
- `Screen: less than <sm> (640px)` when below sm breakpoint
- `Screen: <md> (768px:768px)` when at md breakpoint
- And so on...

#### Advanced Configuration

Configure the plugin through your Tailwind theme:

```javascript
// tailwind.config.js
import debugScreens from 'tailwindcss-plugin-debug-screens-tw4';

export default {
  theme: {
    debugScreens: {
      // Position: [vertical, horizontal]
      position: ['top', 'right'], // Default: ['bottom', 'left']
      
      // Custom prefix for the display text
      prefix: 'BP: ', // Default: 'Screen: '
      
      // Custom selector (if you want a different class name)
      selector: '.debug-bp', // Default: '.debug-screens'
      
      // Screens to ignore
      ignore: ['dark', 'light'], // Default: ['dark']
      
      // Custom styles (merged with defaults)
      style: {
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        fontSize: '14px',
        padding: '1rem 0.5rem',
      }
    }
  },
  plugins: [
    debugScreens
  ]
};
```

### Debug Styles Plugin

The debug styles plugin provides visual debugging utilities to help you understand your layout structure.

#### Setup

```javascript
// tailwind.config.js - ES Modules
import debugScreens, { debugStylesPlugin } from 'tailwindcss-plugin-debug-screens-tw4';

export default {
  plugins: [
    debugScreens,
    debugStylesPlugin
  ]
};
```

```javascript
// tailwind.config.js - CommonJS
const { debugScreensPlugin, debugStylesPlugin } = require('tailwindcss-plugin-debug-screens-tw4');

module.exports = {
  plugins: [
    debugScreensPlugin,
    debugStylesPlugin
  ]
};
```

#### Available Classes

**Outline Debuggers** - Add colored outlines to all child elements:

```html
<!-- Gold outline on all child elements -->
<div class="debug">
  <div>Element 1</div>
  <div>Element 2</div>
  <p>Paragraph</p>
</div>

<!-- White outline on all child elements -->
<div class="debug-white">
  <header>Header</header>
  <main>Main content</main>
  <footer>Footer</footer>
</div>

<!-- Black outline on all child elements -->
<section class="debug-black">
  <article>Article 1</article>
  <article>Article 2</article>
</section>
```

**Grid Backgrounds** - Add grid patterns to visualize spacing:

```html
<!-- 8px grid pattern -->
<div class="debug-grid">
  <p>Content with 8px grid background</p>
</div>

<!-- 16px grid pattern -->
<div class="debug-grid-16">
  <p>Content with 16px grid background</p>
</div>
```

**Dot Pattern** - Add a dot pattern background:

```html
<!-- Dot pattern for visual reference -->
<div class="debug-dots">
  <p>Content with dot pattern background</p>
</div>
```

#### Practical Examples

**Debug a complex layout:**

```html
<div class="debug">
  <header class="flex justify-between p-4">
    <div>Logo</div>
    <nav>
      <a href="#">Home</a>
      <a href="#">About</a>
    </nav>
  </header>
  <main class="grid grid-cols-3 gap-4">
    <aside>Sidebar</aside>
    <article>Content</article>
    <aside>Widgets</aside>
  </main>
</div>
```

**Debug with grid alignment:**

```html
<div class="debug-grid-16 p-8">
  <div class="grid grid-cols-4 gap-4">
    <div class="bg-blue-500 p-4">Box 1</div>
    <div class="bg-green-500 p-4">Box 2</div>
    <div class="bg-red-500 p-4">Box 3</div>
    <div class="bg-yellow-500 p-4">Box 4</div>
  </div>
</div>
```

**Combine multiple debug utilities:**

```html
<body class="debug-screens">
  <div class="debug-grid">
    <div class="debug-white">
      <header>Header with outline debugger</header>
      <main>Main content</main>
    </div>
  </div>
</body>
```

#### CSS Details

| Class | Effect | Use Case |
|-------|--------|----------|
| `.debug` | Gold outline on all children | General layout debugging |
| `.debug-white` | White outline on all children | Dark backgrounds |
| `.debug-black` | Black outline on all children | Light backgrounds |
| `.debug-dots` | Black dots on transparent bg (10px spacing) | Alignment and spacing reference |
| `.debug-grid` | 8px grid pattern | Fine-grained spacing checks |
| `.debug-grid-16` | 16px grid pattern | Larger spacing and alignment |

**Note:** These classes are meant for development only. Remove them before deploying to production!

### TypeScript Usage

```typescript
import debugScreens, { type DebugScreensConfig } from 'tailwindcss-plugin-debug-screens-tw4';
import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    debugScreens: {
      position: ['top', 'right'],
      prefix: 'Breakpoint: ',
      style: {
        backgroundColor: '#dc2626',
        color: '#ffffff'
      }
    } as DebugScreensConfig
  },
  plugins: [
    debugScreens
  ]
};

export default config;
```

## Configuration Options

All configuration is done through the `theme.debugScreens` object:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `position` | `[string, string]` | `['bottom', 'left']` | Position of indicator: `[vertical, horizontal]`. Vertical: `'top'` or `'bottom'`. Horizontal: `'left'` or `'right'` |
| `prefix` | `string` | `'Screen: '` | Text prefix before breakpoint name |
| `selector` | `string` | `'.debug-screens'` | CSS selector for the debug class |
| `ignore` | `string[]` | `['dark']` | Array of screen names to ignore |
| `style` | `object` | See below | Custom CSS styles (merged with defaults) |

### Default Styles

```javascript
{
  content: "...", // Generated automatically
  position: 'fixed',
  zIndex: '2147483647',
  bottom: '6px',      // or top: '6px'
  left: '4px',        // or right: '4px'
  padding: '0.75rem 0.25rem',
  lineHeight: '1',
  fontSize: '12px',
  fontFamily: 'sans-serif',
  borderRadius: '5px',
  border: '2px solid #6f84f9ff',
  backgroundColor: '#162ba35f',
  color: '#2e3982ff',
  boxShadow: '0 0 2px 2px #7c75fd3d',
}
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.19.0

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