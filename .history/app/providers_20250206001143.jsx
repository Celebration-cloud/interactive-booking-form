"use client"; // Ensures this component runs on the client side

import React from "react";
import { HeroUIProvider } from "@heroui/system"; // Provides UI components and theme management
import { useRouter } from "next/navigation"; // Next.js router for client-side navigation
import { ThemeProvider as NextThemesProvider } from "next-themes"; // Theme provider for dark/light mode


/**
 * Providers Component
 * - Wraps the application with necessary providers for state management, theming, and UI system.
 */
export function Providers({ children, themeProps }) {
  const router = useRouter(); // Next.js router for handling navigation

  return (
    <HeroUIProvider navigate={router.push}>
      {/* Theme provider for handling light/dark mode preferences */}
      <NextThemesProvider {...themeProps}>
          {children}
      </NextThemesProvider>
    </HeroUIProvider>
  );
}
