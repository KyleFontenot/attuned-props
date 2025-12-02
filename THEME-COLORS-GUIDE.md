# Theme Colors Guide

## Pure CSS Brand Color System with Automatic Dark Mode

Define your brand colors and automatically get complete tint/shade spectrums that adapt perfectly to dark mode. **Zero build tools, pure CSS** using native `color-mix()`.

## Quick Start

```css
/* 1. Import the theme colors module */
@import 'attuned-props/colors-theme';

/* 2. Define your brand colors */
:root {
  --user-primary: #ff2222;
  --user-secondary: #00aaff;
  --user-tertiary: #00cc66;
  --user-quaternary: #ffaa00;
}

/* 3. Use the generated color scales */
.card {
  background: var(--primary-2);    /* Light tint in light mode, dark shade in dark mode */
  color: var(--primary-9);         /* Dark shade in light mode, light tint in dark mode */
  border: 2px solid var(--primary-5); /* Your base color (adapts to dark mode) */
}

.button {
  background: var(--primary);      /* Alias for --primary-5 */
  color: white;
}
```

## How It Works

### The Color Scale

When you define a brand color, it becomes **level 5** (the center) of a 0-10 scale:

```
Light Mode:
0────1────2────3────4────5────6────7────8────9────10
↑ lighter tints        BASE      darker shades ↑
(backgrounds)                    (foregrounds)

Dark Mode (FLIPPED):
0────1────2────3────4────5────6────7────8────9────10
↑ darker shades     BASE (darker)  lighter tints ↑
(backgrounds)                      (foregrounds)
```

### Light Mode

Your defined color sits at level 5:

```css
--user-primary: #ff2222;

/* Generated automatically: */
--primary-5: #ff2222;              /* Your base color */
--primary: #ff2222;                /* Alias */

--primary-0: very light tint;      /* 5% of base, 95% white */
--primary-1: light tint;           /* 10% of base, 90% white */
--primary-2: lighter tint;         /* 25% of base, 75% white */
--primary-3: medium-light tint;    /* 40% of base, 60% white */
--primary-4: near-base tint;       /* 70% of base, 30% white */

--primary-6: near-base shade;      /* 85% of base, 15% black */
--primary-7: medium shade;         /* 70% of base, 30% black */
--primary-8: darker shade;         /* 55% of base, 45% black */
--primary-9: dark shade;           /* 40% of base, 60% black */
--primary-10: very dark shade;     /* 25% of base, 75% black */
```

### Dark Mode (Automatic)

**Two key changes happen:**

1. **Base color adjustment**: Slightly darkened (85% mixed with black) and desaturated (92% mixed with gray)
2. **Scale flip**: Lower numbers become darker, higher numbers become lighter

```css
/* Dark mode base (calculated automatically): */
--primary-5: darker, less saturated #ff2222;

/* Scale is FLIPPED: */
--primary-0: very dark shade;      /* 25% of base, 75% black */
--primary-1: dark shade;           /* 40% of base, 60% black */
--primary-2: darker shade;         /* 55% of base, 45% black */
--primary-3: medium shade;         /* 70% of base, 30% black */
--primary-4: near-base shade;      /* 85% of base, 15% black */

--primary-6: near-base tint;       /* 70% of base, 30% white */
--primary-7: medium-light tint;    /* 40% of base, 60% white */
--primary-8: lighter tint;         /* 25% of base, 75% white */
--primary-9: light tint;           /* 10% of base, 90% white */
--primary-10: very light tint;     /* 5% of base, 95% white */
```

## Available Theme Colors

- **Primary**: `--primary-0` through `--primary-10`, `--primary` (alias for `-5`)
- **Secondary**: `--secondary-0` through `--secondary-10`, `--secondary`
- **Tertiary**: `--tertiary-0` through `--tertiary-10`, `--tertiary`
- **Quaternary**: `--quaternary-0` through `--quaternary-10`, `--quaternary`

## Usage Examples

### Button Variants

```css
.button-primary {
  background: var(--primary);       /* Base color */
  color: white;
}

.button-primary:hover {
  background: var(--primary-6);     /* Slightly darker */
}

.button-secondary-subtle {
  background: var(--secondary-2);   /* Light background */
  color: var(--secondary-9);        /* Dark text */
}
```

### Cards with Semantic Hierarchy

```css
.card {
  /* Light bg in light mode, dark bg in dark mode */
  background: var(--primary-1);

  /* Dark text in light mode, light text in dark mode */
  color: var(--primary-10);

  /* Border uses medium tone, stable in both modes */
  border: 1px solid var(--primary-5);
}

.card-header {
  background: var(--primary-3);
  color: var(--primary-9);
}
```

### Status Colors

```css
:root {
  --user-primary: #3b82f6;    /* Info */
  --user-secondary: #10b981;  /* Success */
  --user-tertiary: #f59e0b;   /* Warning */
  --user-quaternary: #ef4444; /* Error */
}

.alert-success {
  background: var(--secondary-2);
  color: var(--secondary-9);
  border-left: 4px solid var(--secondary);
}

.alert-error {
  background: var(--quaternary-2);
  color: var(--quaternary-9);
  border-left: 4px solid var(--quaternary);
}
```

## Technical Details

### Color Mixing Strategy

Uses `color-mix()` in the OKLCH color space for perceptually uniform mixing:

```css
/* Tints (mix with white) */
--primary-1: color-mix(in oklch, var(--primary-5) 10%, white);

/* Shades (mix with black) */
--primary-7: color-mix(in oklch, var(--primary-5) 70%, black);

/* Dark mode adjustment (darken + desaturate) */
--primary-5-dark-base: color-mix(in oklch, var(--user-primary) 85%, black);
--primary-5: color-mix(in oklch, var(--primary-5-dark-base) 92%, gray);
```

### Why OKLCH?

- **Perceptually uniform**: Equal steps look equally different to human eyes
- **Predictable lightness**: Mixing preserves relative brightness
- **Better than HSL**: No hue shifting when mixing with gray
- **Native CSS**: No build tools required!

## Browser Support

Requires support for:
- CSS `color-mix()` function
- OKLCH color space
- CSS custom properties
- Media queries for dark mode

**Supported in:** Chrome/Edge 111+, Safari 16.4+, Firefox 113+

## Combining with Other OpenProps Modules

```css
/* Semantic recursive colors + theme colors = complete color system */
@import 'attuned-props/colors-recursive';  /* System colors (gray, red, blue, etc.) */
@import 'attuned-props/colors-theme';      /* Your brand colors */

:root {
  --user-primary: #ff2222;
}

.app {
  /* Use recursive colors for neutrals */
  background: hsl(var(--gray-1-hsl));
  color: hsl(var(--gray-11-hsl));
}

.brand-button {
  /* Use theme colors for branding */
  background: var(--primary);
  color: white;
}
```

## Tips

1. **Choose accessible base colors**: Your level 5 color should have enough contrast in both modes
2. **Test both themes**: The automatic adjustments work well but verify your specific colors
3. **Use lower numbers for backgrounds**: 0-3 work great for subtle backgrounds
4. **Use higher numbers for text**: 8-10 ensure good contrast for readability
5. **The middle (4-6) is flexible**: Works for borders, dividers, hover states

## Default Colors

If you don't define your brand colors, sensible defaults are provided:

```css
--user-primary: #3b82f6;      /* Blue */
--user-secondary: #8b5cf6;    /* Purple */
--user-tertiary: #10b981;     /* Green */
--user-quaternary: #f59e0b;   /* Orange */
```

Override these in your root CSS to match your brand!
