/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { usePathname, useRouter } from "next/navigation";

/**
 * NavButton Component
 *
 * This component renders a "Book a Shipment" button that navigates the user to the booking page.
 * The button is hidden when the user is already on the booking page.
 *
 * @component
 */
const NavButton = () => {
  const router = useRouter();
  const pathname = usePathname();

  /**
   * navigateToBooking
   *
   * Navigates the user to the "/booking" route when invoked.
   */
  const navigateToBooking = () => {
    router.push("/booking");
  };

  return (
    <div className={`${pathname === "/booking" ? "hidden" : ""}`}>
      <Button size="md" color="primary" variant="bordered" onPress={navigateToBooking}>
        Book a Shipment
      </Button>
    </div>
  );
};

export default NavButton;