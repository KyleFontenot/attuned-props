# Recursive Colors Guide

## What are Recursive Colors?

The recursive colors module (`colors-recursive`) is a **semantic, theme-aware color system** that automatically adapts to light and dark modes while maintaining consistent meaning.

## The Problem with Absolute Colors

OpenProps' default colors are **absolute** - they don't change with theme:

```css
/* Light mode */
--cyan-2: hsl(186 77% 77%); /* A light tint */

/* Dark mode */
--cyan-2: hsl(186 77% 77%); /* Still the same light tint! */
```

This breaks visual hierarchy in dark mode. A light background color in light mode should become a dark background color in dark mode.

## The Recursive Solution

Recursive colors **flip the scale** in dark mode:

```css
/* Light mode */
--cyan-0-hsl: 185 81% 94%; /* Lightest (background)  */
--cyan-6-hsl: 187 80% 42%; /* Medium (accent) */
--cyan-12-hsl: 189 84% 12%; /* Darkest (text) */

/* Dark mode (automatically flipped!) */
--cyan-0-hsl: 189 84% 12%; /* NOW darkest (background) */
--cyan-6-hsl: 187 80% 42%; /* Still medium (accent) */
--cyan-12-hsl: 185 81% 94%; /* NOW lightest (text) */
```

## How Numbers Work

The number represents **distance from foreground**:

- **Lower numbers (0-3)**: Background colors, subtle accents
- **Middle numbers (4-8)**: Interactive elements, borders
- **Higher numbers (9-12)**: Foreground text, strong accents

This meaning **stays consistent** across themes!

## Usage

### Import recursive colors

```css
/* If you want only recursive colors */
@import 'attuned-props/colors-recursive';

/* If you want recursive to override default colors */
@import 'attuned-props/colors-hsl';
@import 'attuned-props/colors-recursive'; /* Import AFTER to override */
```

### Use semantic color variables

```css
.card {
  /* In light mode: very light cyan bg, dark cyan text */
  /* In dark mode: very dark cyan bg, light cyan text */
  background: hsl(var(--cyan-1-hsl));
  color: hsl(var(--cyan-11-hsl));
  border: 1px solid hsl(var(--cyan-5-hsl));
}

.button {
  /* Medium cyan works well in both themes */
  background: hsl(var(--cyan-6-hsl));
  color: white;
}
```

## All Available Colors

All OpenProps color hues support recursive mode:

- Gray, Stone
- Red, Pink, Purple, Violet, Indigo
- Blue, Cyan, Teal, Green, Lime
- Yellow, Orange, Choco, Brown
- Sand, Camo, Jungle

Plus contextual black/white:
- `--color-black-0` through `--color-black-10`
- `--color-white-0` through `--color-white-10`

## Override Behavior

When both `colors-hsl` and `colors-recursive` are imported:

1. **Same CSS specificity**: Both use `:where(html)`
2. **Cascade wins**: Later import overrides earlier
3. **Import order matters**:

```css
/* ✅ Recursive colors will override */
@import 'attuned-props/colors-hsl';
@import 'attuned-props/colors-recursive';

/* ❌ Default colors will override */
@import 'attuned-props/colors-recursive';
@import 'attuned-props/colors-hsl';
```

## Benefits

✅ **Semantic**: Variable names represent purpose, not absolute color
✅ **Theme-aware**: Automatically adapts to light/dark mode
✅ **Consistent**: Visual hierarchy maintained across themes
✅ **Compatible**: Uses same variable names as default OpenProps colors
✅ **Override-friendly**: Can replace default colors by import order

## Migration from Absolute Colors

1. Import `colors-recursive` after `colors-hsl`
2. No code changes needed - variable names are the same!
3. Colors now automatically adapt to theme
4. Verify contrast ratios still work for your design
