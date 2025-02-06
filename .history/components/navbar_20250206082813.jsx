/**
 * Navbar Component
 *
 * The primary navigation bar for the application. Features:
 * - Sticky positioning for persistent visibility
 * - Branding with logo and application name
 * - Theme switching capability
 * - Responsive navigation button
 *
 * @component
 * @example
 * // Basic usage in a layout file
 * import { Navbar } from '@/components/navbar';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <>
 *       <Navbar />
 *       <main>{children}</main>
 *     </>
 *   );
 * }
 *
 * @dependencies
 * - Next.js: Used for client-side navigation via NextLink
 * - @heroui/navbar: Provides base Navbar components
 * - Local components: ThemeSwitch, NavButton, Logo
 *
 * @accessibility
 * - Uses semantic nav element through HeroUINavbar
 * - Navigation links should have proper aria-labels
 * - Theme switch includes screen reader-friendly toggles
 */

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import NextLink from "next/link";

import NavButton from "./NavButton";

import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <HeroUINavbar aria-label="Main navigation" maxWidth="xl" position="sticky">
      {/* Left Section: Brand Identity */}
      <NavbarContent
        aria-label="Brand section"
        className="l"
        justify="start"
        role="navigation"
      >
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            aria-label="Return to homepage"
            className="flex justify-start items-center gap-1"
            href="/"
          >
            <Logo aria-hidden="true" />
            <p className="font-bold text-inherit select-none">CargoShip</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Right Section: User Controls */}
      <NavbarContent
        aria-label="User controls"
        className="basis-1 pl-4"
        justify="end"
        role="toolbar"
      >
        <ThemeSwitch aria-label="Toggle dark mode" />
        <NavButton aria-label="Navigation menu" />
      </NavbarContent>
    </HeroUINavbar>
  );
};
