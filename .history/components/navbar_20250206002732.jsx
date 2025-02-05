import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@heroui/navbar";
import NextLink from "next/link";

import NavButton from "./NavButton";

import { ThemeSwitch } from "@/components/theme-switch";
import { Logo } from "@/components/icons";

/**
 * The `Navbar` component renders the application's navigation bar using HeroUI's Navbar components.
 * It includes branding, theme switching, and a navigation button.
 *
 * @component
 * @returns {JSX.Element} The rendered Navbar component.
 *
 * @example
 * // Usage in a React component
 * import { Navbar } from '@/components/navbar';
 *
 * function App() {
 *   return (
 *     <div>
 *       <Navbar />
 *       {/* Other components */}
 *     </div>
 *   );
 * }
 */
export const Navbar = () => {
  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Left-aligned content: Branding */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          {/* Link to the home page with branding */}
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">CargoShip</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      {/* Right-aligned content: Theme switch and navigation button */}
      <NavbarContent className="basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavButton />
      </NavbarContent>
    </HeroUINavbar>
  );
};
