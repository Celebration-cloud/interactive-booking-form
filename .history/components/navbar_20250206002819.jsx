/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { usePathname, useRouter } from "next/navigation";

/**
 * NavButton Component
 *
 * This component renders a "Book a Shipment" button that navigates users to the booking page.
 * The button is hidden when the current pathname is "/booking".
 *
 * @component
 * @returns {JSX.Element|null} The rendered NavButton component or null if on the booking page.
 *
 * @example
 * // Usage in a React component
 * import NavButton from './NavButton';
 *
 * function App() {
 *   return (
 *     <div>
 *       <NavButton />
 *       {/* Other components */}
 *     </div>
 *   );
 * }
 */
const NavButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * Navigates the user to the booking page.
   */
  const navigateToBooking = () => {
    router.push("/booking");
  };

  // Hide the button if the current pathname is "/booking"
  if (pathname === "/booking") {
    return null;
  }

  return (
    <Button color="primary" variant="bordered" onPress={navigateToBooking}>
      Book a Shipment
    </Button>
  );
};

export default NavButton;