# Polyfills and Fallbacks Guide

## Browser Support Strategy

The OpenProps fork uses modern CSS features with graceful fallbacks for older browsers.

## Color-Mix Polyfill Options

### Runtime: Native CSS @supports (Recommended)

The **colors-theme** module uses `@supports` to detect `color-mix()` support:

```css
@import 'attuned-props/colors-theme';

/* Browsers without color-mix() support */
/* Get: All theme colors set to base user color (no spectrum) */

/* Browsers WITH color-mix() support */
/* Get: Full 0-10 spectrum with automatic dark mode */
```

**Pros:**
- ✅ Zero build tools required
- ✅ Pure CSS, works everywhere
- ✅ Graceful degradation

**Cons:**
- ❌ Older browsers don't get color spectrums
- ❌ All levels (0-10) use the same base color

### Build-Time: PostCSS Plugin

For full backward compatibility with older browsers, use a PostCSS plugin:

#### Option 1: @csstools/postcss-color-mix-function

```bash
npm install --save-dev @csstools/postcss-color-mix-function
```

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('@csstools/postcss-color-mix-function')({
      // Compiles color-mix() to static colors at build time
    }),
    // other plugins...
  ]
}
```

**How it works:**
- Transforms `color-mix()` into static hex/rgb values at build time
- Works with user-defined colors if they're static
- Output CSS works in all browsers

**Limitations:**
- ⚠️ Can only compile static colors (not CSS custom properties)
- ⚠️ Loses runtime theming ability
- ⚠️ Requires rebuild for color changes

#### Option 2: Runtime JavaScript Polyfill

For dynamic user-defined colors in old browsers:

```bash
npm install colord
```

```js
// Generate theme colors dynamically
import { colord } from 'colord';

function generateThemeColors(baseColor, themeName) {
  const base = colord(baseColor);

  // Generate tints (lighter)
  document.documentElement.style.setProperty(`--${themeName}-0`, base.mix('white', 0.95).toHex());
  document.documentElement.style.setProperty(`--${themeName}-1`, base.mix('white', 0.90).toHex());
  document.documentElement.style.setProperty(`--${themeName}-2`, base.mix('white', 0.75).toHex());
  // ... etc

  // Generate shades (darker)
  document.documentElement.style.setProperty(`--${themeName}-6`, base.mix('black', 0.15).toHex());
  // ... etc
}

// Use it
generateThemeColors('#ff2222', 'primary');
generateThemeColors('#00aaff', 'secondary');
```

**Pros:**
- ✅ Works with dynamic user colors
- ✅ Full spectrum support in old browsers
- ✅ Can adjust mixing strategy per browser

**Cons:**
- ❌ Requires JavaScript
- ❌ Flash of unstyled content possible
- ❌ More complex setup

## OKLCH Support and Fallbacks

### Where OKLCH is Used

OKLCH is used in:
- **color-mix() operations** - For perceptually uniform mixing
- **colors-theme module** - When `color-mix()` is supported

### Fallback Strategy

The system automatically falls back to hex colors in older browsers:

```css
/* Modern browsers */
@supports (background: color-mix(in oklch, red, blue)) {
  --primary-2: color-mix(in oklch, var(--primary-5) 25%, white);
}

/* Older browsers */
/* Uses the base user-defined color (hex, rgb, or hsl) */
--primary-2: var(--user-primary);
```

### Defining Colors in OKLCH

User-defined colors can be in **any format**:

```css
:root {
  /* All formats supported! */
  --user-primary: #ff2222;              /* Hex */
  --user-secondary: oklch(0.7 0.2 250); /* OKLCH */
  --user-tertiary: rgb(0 204 102);      /* RGB */
  --user-quaternary: hsl(38 100% 50%);  /* HSL */
}
```

CSS custom properties accept any color format, and `color-mix()` understands all of them.

### Why OKLCH for Mixing?

**OKLCH advantages:**
- ✅ Perceptually uniform (equal visual steps)
- ✅ Wider color gamut (more vibrant colors)
- ✅ No hue shifting when mixing
- ✅ Predictable lightness adjustments

**Comparison:**

```css
/* HSL mixing - hue shifts toward gray */
color-mix(in hsl, red 50%, blue);  /* → purple-ish gray */

/* OKLCH mixing - preserves vibrancy */
color-mix(in oklch, red 50%, blue); /* → vibrant purple */
```

## Browser Compatibility Table

| Feature | Chrome | Edge | Safari | Firefox |
|---------|--------|------|--------|---------|
| **color-mix()** | 111+ | 111+ | 16.4+ | 113+ |
| **OKLCH colors** | 111+ | 111+ | 15.4+ | 113+ |
| **@supports** | ✅ All | ✅ All | ✅ All | ✅ All |
| **CSS custom properties** | ✅ All | ✅ All | ✅ All | ✅ All |

## Recommended Approach by Use Case

### Modern App (2024+)
```css
/* Use native color-mix() with @supports fallback */
@import 'attuned-props/colors-theme';

:root {
  --user-primary: #ff2222;
}
```

**Support:** Chrome/Edge 111+, Safari 16.4+, Firefox 113+
**Fallback:** Base colors only in older browsers

### Enterprise App (Need IE11/Old Chrome)

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('@csstools/postcss-color-mix-function')(),
    require('autoprefixer'),
  ]
}
```

**Support:** All browsers
**Limitation:** Static colors only, rebuild needed for theme changes

### Dynamic Theming App

```js
// Use JavaScript polyfill for old browsers
import { colord } from 'colord';

if (!CSS.supports('background: color-mix(in oklch, red, blue)')) {
  // Generate theme colors manually
  generateThemeColors(userPrimaryColor, 'primary');
}
```

**Support:** All browsers with JS
**Benefit:** Full dynamic theming everywhere

## Testing Fallbacks

### Check color-mix() support:

```js
const hasColorMix = CSS.supports('background: color-mix(in oklch, red, blue)');
console.log('color-mix() supported:', hasColorMix);
```

### Check OKLCH support:

```js
const hasOKLCH = CSS.supports('color: oklch(0.5 0.2 180)');
console.log('OKLCH supported:', hasOKLCH);
```

### Force fallback mode (testing):

```js
// Temporarily disable @supports for testing
document.documentElement.style.setProperty('--test-color-mix', 'false');
```

## Progressive Enhancement Philosophy

This fork follows **progressive enhancement**:

1. **Baseline (all browsers):** User-defined base colors work
2. **Enhanced (modern browsers):** Full color spectrums with dark mode
3. **Future-proof:** Uses native CSS features that will work forever

No user is left behind - older browsers get functional (if limited) theming, modern browsers get the full experience.
