/* eslint-disable prettier/prettier */
"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

/**
 * HomePage component for displaying the main landing page of the cargo shipping service.
 *
 * This component renders a title, description, and a call-to-action button that
 * navigates to the booking page when clicked.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const HomePage = () => {
  const router = useRouter();

  /**
   * Navigates to the booking page.
   *
   * This function uses the Next.js router to programmatically navigate
   * to the '/booking' route when called.
   */
  const navigateToBooking = () => {
    router.push("/booking");
  };

  return (
    <div>
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Reliable Cargo Shipping Services
      </h1>
      <p className="text-lg md:text-2xl mb-8">
        Fast, secure, and efficient transportation solutions tailored to your
        needs.
      </p>
      <Button
        color="primary"
        size="lg"
        variant="solid"
        onPress={navigateToBooking}
      >
        Get Started
      </Button>
    </div>
  );
};

export default HomePage;
