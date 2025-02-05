/* eslint-disable prettier/prettier */
"use client";
import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { getLocalTimeZone, today } from "@internationalized/date";
import { Card, CardHeader, CardBody } from "@heroui/card";

import { StepperIndicator } from "./StepperIndicator";
import { FormNavigation } from "./FormNavigation";
import { ShipmentStep } from "./ShipmentStep";
import { CargoStep } from "./CargoStep";
import { ReviewStep } from "./ReviewStep";

const steps = [
  { label: "Shipment Details" },
  { label: "Cargo Details" },
  { label: "Review & Confirm" },
];

const BookingForm = () => {
  // Existing hooks and state management
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      pickupLocation: "",
      dropoffLocation: "",
      cargoWeight: "",
      cargoVolume: "",
      temperature: 0.4,
      fragile: false,
      email: "",
      pricing: 0,
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Existing effects and handlers
  // Watch cargo fields for dynamic pricing
  const cargoWeight = watch("cargoWeight");
  const cargoVolume = watch("cargoVolume");

  useEffect(() => {
    const weight = parseFloat(cargoWeight) || 0;
    const volume = parseFloat(cargoVolume) || 0;
    const price = 50 + weight * 0.5 + volume * 0.2;

    setValue("pricing", price.toFixed(2));
  }, [cargoWeight, cargoVolume, setValue]);

  const nextStep = async () => {
    let valid = false;

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
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setActiveStep((prev) => prev - 1);

  const onSubmit = (data) => {
    startTransition(() => {
      router.push("/thank-you");
    });
  };
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <ShipmentStep control={control} errors={errors} />;
      case 1:
        return <CargoStep control={control} errors={errors} watch={watch} />;
      case 2:
        return <ReviewStep values={watch()} />;
      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl md:max-w-7xl md:flex mx-auto space-y-5">
        <StepperIndicator activeStep={activeStep} steps={steps} />

        <div className="md:w-2/3 w-full">
          <Card className="shadow rounded-lg">
            <CardHeader className="px-4 pt-5 border-b-current">
              <h1 className="text-2xl font-bold text-center">
                Cargo Shipment Booking
              </h1>
            </CardHeader>
            <CardBody className="px-4 py-10">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                {renderStepContent(activeStep)}
              </form>
            </CardBody>
          </Card>

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
