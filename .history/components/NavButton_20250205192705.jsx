/* eslint-disable prettier/prettier */
"use client";
import { Button } from "@heroui/button";
import { usePathname, useRouter } from "next/navigation";

const NavButton = () => {
  const router = useRouter();
  const pathname = usePathname()

  const navigateToBooking = () => {
    router.push("/booking");
  };

  return (
    <divcla>
      <Button color="secondary" variant="outline" onPress={navigateToBooking}>
        Book a Shipment
      </Button>
    </divcla>
  );
};

export default NavButton;
