/* eslint-disable prettier/prettier */
"use "
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter();

  const handleNewBooking = () => {
    router.push("/booking-form");
  };

  const handleHome = () => {
    router.push("/");
  };

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
        <CardFooter className="flex justify-center space-x-4">
          <Button color="primary" variant="solid" onPress={handleNewBooking}>
            Start a New Booking
          </Button>
          <Button color="secondary" variant="outline" onPress={handleHome}>
            Return to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ThankYouPage;