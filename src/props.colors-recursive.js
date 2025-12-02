// Recursive/Contextual Color System
// Lower numbers = lighter/background colors in light mode
// Lower numbers = darker/background colors in dark mode (FLIPPED)
// This maintains semantic consistency across themes

import * as ColorsHSL from './props.colors-hsl.js'

// Helper to extract color entries and create reversed dark mode versions
const createRecursiveColors = (colorObject) => {
  const entries = Object.entries(colorObject)
  const result = {}

  // Light mode - use as-is
  entries.forEach(([key, value]) => {
    result[key] = value
  })

  // Dark mode - reverse the scale
  // If a color goes 0-12, then in dark mode:
  // 0 gets the value of 12, 1 gets value of 11, etc.
  const maxIndex = entries.length - 1
  entries.forEach(([key, value], index) => {
    const reversedIndex = maxIndex - index
    const reversedValue = entries[reversedIndex][1]
    result[`${key}-@media:dark`] = reversedValue
  })

  return result
}

// Process all color hues
const recursiveColors = {
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
