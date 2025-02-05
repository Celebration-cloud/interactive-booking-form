/* eslint-disable prettier/prettier */
"use client";

// Import React hooks and libraries
import React, { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// Import custom UI components from HeroUI and PrimeReact
import { Card, CardHeader, CardBody } from "@heroui/card";

// Import your custom step components (each representing a form step)
import { StepperIndicator } from "./StepperIndicator"; // Custom indicator component for steps
import { FormNavigation } from "./FormNavigation"; // Component handling navigation buttons (Next, Back, Submit)
import { ShipmentStep } from "./ShipmentStep"; // Step 0: Shipment details input fields
import { CargoStep } from "./CargoStep"; // Step 1: Cargo details input fields
import { ReviewStep } from "./ReviewStep"; // Step 2: Review and confirmation of input values
import { getLocalTimeZone, today } from "@internationalized/date";

// Define the steps labels for the booking process
const steps = [
  { label: "Shipment Details" },
  { label: "Cargo Details" },
  { label: "Review & Confirm" },
];

const BookingForm = () => {
  // Initialize today's date using @internationalized/date (you could uncomment the import if needed)
  // const defaultDate = today(getLocalTimeZone());
  // For simplicity, we assume the default date is handled externally if needed.
   defaultDate = today(getLocalTimeZone());

  // Initialize React Hook Form
  const {
    control, // Control object to connect inputs to the form
    handleSubmit, // Function to handle form submission
    trigger, // Function to programmatically trigger validation
    watch, // Function to watch input values
    setValue, // Function to update form values
    formState: { errors }, // Contains validation errors
  } = useForm({
    mode: "onChange", // Validate on every change for real-time feedback
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      shipmentDate: defaultDate,
      cargoWeight: "",
      cargoVolume: "",
      temperature: 0.4,
      fragile: false,
      email: "",
      pricing: 0,
    },
  });

  // Manage the current step of the multi-step form (0-indexed)
  const [activeStep, setActiveStep] = useState(0);
  // useTransition hook for handling asynchronous UI transitions (e.g., form submission)
  const [isPending, startTransition] = useTransition();
  // Next.js router for navigation
  const router = useRouter();

  // Watch cargoWeight and cargoVolume for dynamic pricing calculations
  const cargoWeight = watch("cargoWeight");
  const cargoVolume = watch("cargoVolume");

  // useEffect: Recalculate pricing whenever cargo weight or volume changes.
  useEffect(() => {
    // Parse values or default to 0 if not provided.
    const weight = parseFloat(cargoWeight) || 0;
    const volume = parseFloat(cargoVolume) || 0;
    // Calculate price with a base value and per-unit multipliers
    const price = 50 + weight * 0.5 + volume * 0.2;

    // Update the 'pricing' field in the form state (formatted to 2 decimal places)
    setValue("pricing", price.toFixed(2));
  }, [cargoWeight, cargoVolume, setValue]);

  // Function to move to the next step after validating current step fields
  const nextStep = async () => {
    let valid = false;

    // Validate different fields depending on the current active step
    if (activeStep === 0) {
      valid = await trigger([
        "pickupLocation",
        "dropoffLocation",
        "shipmentDate",
      ]);
    } else if (activeStep === 1) {
      valid = await trigger(["cargoWeight", "cargoVolume", "email"]);
    } else {
      valid = true;
    }
    if (valid) {
      // Move to the next step
      setActiveStep((prev) => prev + 1);
    }
  };

  // Function to move back a step
  const prevStep = () => setActiveStep((prev) => prev - 1);

  // onSubmit: Final submission handler
  const onSubmit = () => {
    console.log("Booking submitted:", watch()); // Log form data for debugging
    // Use startTransition to ensure smooth UI updates and navigate to the thank-you page
    startTransition(() => {
      router.push("/thank-you");
    });
  };

  // Render the content for the current step by delegating to the appropriate component
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        // ShipmentStep handles shipment-related fields
        return <ShipmentStep control={control} errors={errors} />;
      case 1:
        // CargoStep handles cargo details; it receives watch to enable dynamic updates
        return <CargoStep control={control} errors={errors} watch={watch} />;
      case 2:
        // ReviewStep shows a summary of entered values for review
        return <ReviewStep values={watch()} />;
      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Container: Centers the form with responsive width */}
      <div className="max-w-4xl md:max-w-7xl md:flex mx-auto space-y-5">
        {/* StepperIndicator shows the progress and active step */}
        <StepperIndicator activeStep={activeStep} steps={steps} />
        {/* Main content area */}
        <div className="md:w-2/3 w-full">
          {/* Card containing the current step's form */}
          <Card className="shadow rounded-lg">
            <CardHeader className="px-4 pt-5 border-b-current">
              <h1 className="text-2xl font-bold text-center">
                Cargo Shipment Booking
              </h1>
            </CardHeader>
            <CardBody className="px-4 py-10">
              {/* Render the step-specific content */}
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {renderStepContent(activeStep)}
              </form>
            </CardBody>
          </Card>
          {/* FormNavigation provides the Next, Back, and Submit buttons */}
          <FormNavigation
            activeStep={activeStep}
            isPending={isPending}
            nextStep={nextStep}
            prevStep={prevStep}
            totalSteps={steps.length}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
