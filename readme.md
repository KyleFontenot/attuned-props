<div align="center">

# Attuned Props

## Extended CSS Custom Properties Library
`colors` `recursive-colors` `theme-colors` `gradients` `shadows` `aspect ratios` `typography`
`easings` `animations` `sizes` `borders` `z-indexes` `media-queries`

[![npm version](http://img.shields.io/npm/v/attuned-props.svg)](https://npmjs.org/package/attuned-props)

### Forked from [Open Props](https://github.com/argyleink/open-props) with Extended Features
</div>

<br>

## What's New in Attune Props?

### 🎨 Theme Colors System
Define brand colors and get automatic tint/shade spectrums (0-10) with dark mode support using native CSS `color-mix()`:

```css
@import 'attuned-props/colors-theme';

:root {
  --user-primary: #ff2222;
  --user-secondary: #00aaff;
}

/* Use anywhere */
.card {
  background: var(--primary-2);  /* Light tint */
  color: var(--primary-9);        /* Dark shade */
  border: 1px solid var(--primary-5); /* Base color */
}
```

### 🔄 Recursive Color Palettes
Colors that flip semantically in dark mode - variable numbers represent hierarchy, not absolute lightness:

```css
@import 'attuned-props/colors-recursive';

.element {
  /* In light mode: --gray-0 is darkest, --gray-10 is lightest */
  /* In dark mode: --gray-0 is lightest, --gray-10 is darkest */
  background: var(--gray-2);  /* Always near background */
  color: var(--gray-9);        /* Always near foreground */
}
```

### 📊 Extended Variable Ranges
All variable spectrums now go to 10 (or 0-10):
- Shadows: 1-10 (previously 1-6)
- Inner shadows: 0-10 (previously 0-4)
- Noise patterns & filters: 1-10 (previously 1-5)
- Letter spacing: 0-10 (previously 0-7)
- Fluid font sizes: 0-10 (previously 0-3)
- Borders: 1-10 (previously 1-5)
- All easing functions: 1-10 (categories extended)

<br>

## Installation

```bash
npm install attuned-props
```

## Usage

### Import Everything
```css
@import 'attuned-props';
```

### Import Individual Modules
```css
@import 'attuned-props/colors-theme';
@import 'attuned-props/colors-recursive';
@import 'attuned-props/shadows';
@import 'attuned-props/fonts';
@import 'attuned-props/easings';
```

### JavaScript Imports
```js
import 'attuned-props';
import 'attuned-props/colors-theme';
import shadows from 'attuned-props/src/shadows';
```

## Documentation

- **[Theme Colors Guide](./THEME-COLORS-GUIDE.md)** - Complete guide to the theme color system
- **[Recursive Colors Guide](./RECURSIVE-COLORS-GUIDE.md)** - Understanding semantic color palettes
- **[Polyfills & Fallbacks](./POLYFILLS-AND-FALLBACKS.md)** - Browser support and fallback strategies

## Browser Support

**Theme Colors:**
- Modern browsers (Chrome/Edge 111+, Safari 16.4+, Firefox 113+) get full `color-mix()` features
- Older browsers get functional fallbacks using base colors

**Recursive Colors & Extended Ranges:**
- All browsers with CSS custom properties support (all modern browsers)

## CLI Commands

```bash
npm run build         # Build all modules
npm run bundle        # Create minified bundles
npm run gen:op        # Generate PostCSS files from JS sources
npm test              # Run tests
```

## Testing

```bash
npm run build && npm run bundle
npm test
```

## Demo Pages

- `test-theme-colors.html` - Interactive theme color system demo
- `test-recursive-colors.html` - Interactive recursive color palette demo

## License

MIT - Forked from [Open Props](https://github.com/argyleink/open-props) by Adam Argyle

## Credits

This project extends the excellent work of the Open Props project. All original features and architecture are courtesy of Adam Argyle and the Open Props contributors.
