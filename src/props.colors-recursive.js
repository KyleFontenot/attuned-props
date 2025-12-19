// Recursive/Contextual Color System
// --color-0 (or --color) = Most saturated primary color
// Light mode: positive indices (1-10) = shades (background tones)
//             negative indices (--1 to --10) = tints (foreground tones)
// Dark mode: positive indices (1-10) = tints (background tones)
//            negative indices (--1 to --10) = shades (foreground tones)

import * as ColorsHSL from './props.colors-hsl.js'

// Helper to parse HSL string and return components
const parseHSL = (hslString) => {
  const parts = hslString.trim().split(/\s+/)
  return {
    h: parseFloat(parts[0]),
    s: parseFloat(parts[1]),
    l: parseFloat(parts[2])
  }
}

// Helper to create HSL string from components
const toHSL = ({h, s, l}) => {
  return `${Math.round(h)} ${Math.round(s)}% ${Math.round(l)}%`
}

// Helper to lighten a color (tint) - mix with --base-white
const lighten = (hslString, amount) => {
  // Convert amount to percentage for color-mix (amount * 5 gives good results)
  const percentage = Math.min(95, amount * 5)
  return `color-mix(in oklch, hsl(${hslString}), var(--base-white) ${percentage}%)`
}

// Helper to darken a color (shade) - mix with --base-black
const darken = (hslString, amount) => {
  // Convert amount to percentage for color-mix (amount * 5 gives good results)
  const percentage = Math.min(95, amount * 5)
  return `color-mix(in oklch, hsl(${hslString}), var(--base-black) ${percentage}%)`
}

// Helper to extract color entries and create new recursive scale
const createRecursiveColors = (colorObject) => {
  const entries = Object.entries(colorObject)
  const result = {}

  // Find the most saturated color with lightness closest to 50%
  // This gives us the most vivid, balanced version of the color
  let primaryIndex = 0
  let bestScore = -Infinity

  entries.forEach(([key, value], index) => {
    const {s, l} = parseHSL(value)
    // Score based on: high saturation + lightness close to 50%
    // Higher saturation is better, closer to 50% lightness is better
    const lightnessScore = 50 - Math.abs(l - 50) // Max 50 when l=50, decreases as we move away
    const score = s + lightnessScore

    if (score > bestScore) {
      bestScore = score
      primaryIndex = index
    }
  })

  // Extract color name from key like '--gray-0-hsl' -> 'gray'
  const colorName = entries[0][0].match(/--([a-z]+)-/)[1]
  const primaryColor = entries[primaryIndex][1]

  // Set primary color as base (--color-0 and --color)
  result[`--${colorName}-0-hsl`] = primaryColor
  result[`--${colorName}-hsl`] = primaryColor

  // Light mode: Positive indices (1-10) are shades (darker, for backgrounds)
  // We'll use the darker colors from the original scale (indices 9-12)
  // and interpolate for additional steps
  const darkColors = [
    entries[9][1],   // --color-1
    entries[10][1],  // --color-2
    entries[11][1],  // --color-3
    entries[12][1],  // --color-4
  ]

  for (let i = 1; i <= 10; i++) {
    if (i <= 4) {
      result[`--${colorName}-${i}-hsl`] = darkColors[i - 1]
    } else {
      // Darken further beyond the available scale
      result[`--${colorName}-${i}-hsl`] = darken(darkColors[3], (i - 4) * 5)
    }
  }

  // Light mode: Negative indices (--1 to --10) are tints (lighter, for foregrounds)
  // We'll use the lighter colors from the original scale (indices 7, 6, 5, 4, 3, 2, 1, 0)
  const lightColors = [
    entries[7][1],   // --color--1
    entries[6][1],   // --color--2
    entries[5][1],   // --color--3
    entries[4][1],   // --color--4
    entries[3][1],   // --color--5
    entries[2][1],   // --color--6
    entries[1][1],   // --color--7
    entries[0][1],   // --color--8
  ]

  for (let i = 1; i <= 10; i++) {
    if (i <= 8) {
      result[`--${colorName}--${i}-hsl`] = lightColors[i - 1]
    } else {
      // Lighten further beyond the available scale
      result[`--${colorName}--${i}-hsl`] = lighten(lightColors[7], (i - 8) * 5)
    }
  }

  // Dark mode: FLIP the meanings
  // Primary stays the same
  result[`--${colorName}-0-hsl-@media:dark`] = primaryColor
  result[`--${colorName}-hsl-@media:dark`] = primaryColor

  // Dark mode: Positive indices (1-10) are tints (lighter, for backgrounds on dark)
  for (let i = 1; i <= 10; i++) {
    if (i <= 8) {
      result[`--${colorName}-${i}-hsl-@media:dark`] = lightColors[i - 1]
    } else {
      result[`--${colorName}-${i}-hsl-@media:dark`] = lighten(lightColors[7], (i - 8) * 5)
    }
  }

  // Dark mode: Negative indices (--1 to --10) are shades (darker, for foregrounds on dark)
  for (let i = 1; i <= 10; i++) {
    if (i <= 4) {
      result[`--${colorName}--${i}-hsl-@media:dark`] = darkColors[i - 1]
    } else {
      result[`--${colorName}--${i}-hsl-@media:dark`] = darken(darkColors[3], (i - 4) * 5)
    }
  }

  return result
}

// Process all color hues
const recursiveColors = {
  // Base colors for mixing - users can override these to add warmth/coolness
  '--base-white': 'hsl(0 0% 100%)',
  '--base-black': 'hsl(0 0% 0%)',

  ...createRecursiveColors(ColorsHSL.Gray),
  ...createRecursiveColors(ColorsHSL.Stone),
  ...createRecursiveColors(ColorsHSL.Red),
  ...createRecursiveColors(ColorsHSL.Pink),
  ...createRecursiveColors(ColorsHSL.Purple),
  ...createRecursiveColors(ColorsHSL.Violet),
  ...createRecursiveColors(ColorsHSL.Indigo),
  ...createRecursiveColors(ColorsHSL.Blue),
  ...createRecursiveColors(ColorsHSL.Cyan),
  ...createRecursiveColors(ColorsHSL.Teal),
  ...createRecursiveColors(ColorsHSL.Green),
  ...createRecursiveColors(ColorsHSL.Lime),
  ...createRecursiveColors(ColorsHSL.Yellow),
  ...createRecursiveColors(ColorsHSL.Orange),
  ...createRecursiveColors(ColorsHSL.Choco),
  ...createRecursiveColors(ColorsHSL.Brown),
  ...createRecursiveColors(ColorsHSL.Sand),
  ...createRecursiveColors(ColorsHSL.Camo),
  ...createRecursiveColors(ColorsHSL.Jungle),

  // Also add the black/white contextual colors
  '--color-black-0': 'hsl(0 0% 0%)',      // Pure black foreground
  '--color-black-1': 'hsl(0 0% 10%)',
  '--color-black-2': 'hsl(0 0% 20%)',
  '--color-black-3': 'hsl(0 0% 30%)',
  '--color-black-4': 'hsl(0 0% 40%)',
  '--color-black-5': 'hsl(0 0% 50%)',
  '--color-black-6': 'hsl(0 0% 60%)',
  '--color-black-7': 'hsl(0 0% 70%)',
  '--color-black-8': 'hsl(0 0% 80%)',
  '--color-black-9': 'hsl(0 0% 90%)',
  '--color-black-10': 'hsl(0 0% 95%)',    // Near-white background

  '--color-white-0': 'hsl(0 0% 100%)',    // Pure white foreground
  '--color-white-1': 'hsl(0 0% 95%)',
  '--color-white-2': 'hsl(0 0% 90%)',
  '--color-white-3': 'hsl(0 0% 85%)',
  '--color-white-4': 'hsl(0 0% 80%)',
  '--color-white-5': 'hsl(0 0% 75%)',
  '--color-white-6': 'hsl(0 0% 70%)',
  '--color-white-7': 'hsl(0 0% 65%)',
  '--color-white-8': 'hsl(0 0% 60%)',
  '--color-white-9': 'hsl(0 0% 55%)',
  '--color-white-10': 'hsl(0 0% 50%)',    // Mid-gray background

  // Dark mode flips for black/white
  '--color-black-0-@media:dark': 'hsl(0 0% 100%)',  // White foreground on dark
  '--color-black-1-@media:dark': 'hsl(0 0% 90%)',
  '--color-black-2-@media:dark': 'hsl(0 0% 80%)',
  '--color-black-3-@media:dark': 'hsl(0 0% 70%)',
  '--color-black-4-@media:dark': 'hsl(0 0% 60%)',
  '--color-black-5-@media:dark': 'hsl(0 0% 50%)',
  '--color-black-6-@media:dark': 'hsl(0 0% 40%)',
  '--color-black-7-@media:dark': 'hsl(0 0% 30%)',
  '--color-black-8-@media:dark': 'hsl(0 0% 20%)',
  '--color-black-9-@media:dark': 'hsl(0 0% 10%)',
  '--color-black-10-@media:dark': 'hsl(0 0% 5%)',   // Near-black background

  '--color-white-0-@media:dark': 'hsl(0 0% 0%)',    // Black foreground on dark
  '--color-white-1-@media:dark': 'hsl(0 0% 5%)',
  '--color-white-2-@media:dark': 'hsl(0 0% 10%)',
  '--color-white-3-@media:dark': 'hsl(0 0% 15%)',
  '--color-white-4-@media:dark': 'hsl(0 0% 20%)',
  '--color-white-5-@media:dark': 'hsl(0 0% 25%)',
  '--color-white-6-@media:dark': 'hsl(0 0% 30%)',
  '--color-white-7-@media:dark': 'hsl(0 0% 35%)',
  '--color-white-8-@media:dark': 'hsl(0 0% 40%)',
  '--color-white-9-@media:dark': 'hsl(0 0% 45%)',
  '--color-white-10-@media:dark': 'hsl(0 0% 50%)',  // Mid-gray background
}

export default recursiveColors
