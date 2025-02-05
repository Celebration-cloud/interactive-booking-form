/* eslint-disable prettier/prettier */
"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

const NavButton = () => {
  const router = useRouter();

  const navigateToBooking = () => {
    router.push("/booking");
  };

  return (
    <div>
      <Button color="" variant="outline" onPress={navigateToBooking}>
        Book a Shipment
      </Button>
    </div>
  );
};

export default NavButton;
