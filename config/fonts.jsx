// Importing two fonts from Google Fonts using the Next.js font optimization feature.
// Fira_Code is used as a monospaced font (FontMono), and Inter is used as a sans-serif font (FontSans).
// This approach enables efficient font loading and automatic optimization in a Next.js project.
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

// This variable holds the configuration for the 'Inter' font, which is used for sans-serif text.
// The 'subsets' option ensures that the font supports the "latin" character set.
// The 'variable' option defines a custom CSS variable ('--font-sans') to enable the font to be applied globally or specifically through CSS.
export const fontSans = FontSans({
  subsets: ["latin"], // Ensures that only the latin characters are loaded, optimizing font loading.
  variable: "--font-sans", // Creates a custom CSS variable for the font, enabling global styling.
});

// This variable holds the configuration for the 'Fira_Code' font, which is a monospaced font typically used for code or fixed-width text.
// Like the sans-serif font, it supports the "latin" character set and creates a CSS variable for easy integration into styles.
export const fontMono = FontMono({
  subsets: ["latin"], // Supports latin characters only to optimize font loading.
  variable: "--font-mono", // Defines a custom CSS variable ('--font-mono') for applying the font globally.
});
