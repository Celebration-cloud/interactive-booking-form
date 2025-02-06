/* eslint-disable prettier/prettier */
/**
 * ThankYouPage Component
 *
 * Displays a confirmation page after successful booking submission. Provides:
 * - Success message with email confirmation note
 * - Action buttons for new bookings or returning home
 * - Responsive layout using Tailwind CSS
 * - Client-side navigation using Next.js router
 *
 * @component
 * @example
 * // Basic usage in Next.js router
 * import ThankYouPage from '@/components/ThankYouPage';
 *
 * function Page() {
 *   return <ThankYouPage />;
 * }
 *
 * @dependencies
 * - Next.js: Used for client-side navigation
 * - @heroui/card: Provides card components
 * - @heroui/button: Provides styled buttons
 *
 * @accessibility
 * - Uses semantic HTML structure
 * - Buttons have clear action labels
 * - Text contrast meets WCAG standards
 */

"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export const ThankYouPage = () => {
  const router = useRouter();

  // Navigation handlers
  const handleNewBooking = () => router.push("/booking");
  const handleHome = () => router.push("/");

  return (
    <div className="container mx-auto p-4">
      <Card className="mt-6 text-center">
        <CardHeader>
          <h1 className="text-3xl font-bold">Thank You!</h1>
        </CardHeader>

        <CardBody>
          <p className="text-lg">
            Your booking has been successfully submitted. Please check your
            email for confirmation and further details.
          </p>
        </CardBody>

        <CardFooter className="flex justify-center max-[425px]:flex-col space-x-4 max-sm:space-x-0">
          <Button
            aria-label="Start a new booking"
            color="primary"
            variant="solid"
            onPress={handleNewBooking}
          >
            Start a New Booking
          </Button>
          <Button
            aria-label="Return to homepage"
            color="secondary"
            variant="outline"
            onPress={handleHome}
          >
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYouPage;
