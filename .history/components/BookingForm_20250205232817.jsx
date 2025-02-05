import { useState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getLocalTimeZone, today } from "@internationalized/date";
import { StepperIndicator } from "./StepperIndicator";
import { FormNavigation } from "./FormNavigation";
import { ShipmentStep } from "./ShipmentStep";
import { CargoStep } from "./CargoStep";
import { ReviewStep } from "./ReviewStep";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Step, WatchProps } from "./types";

const steps: Step[] = [
  { label: "Shipment Details" },
  { label: "Cargo Details" },
  { label: "Review & Confirm" },
];

const BookingForm = () => {
  // Existing hooks and state management
  const defaultDate = today(getLocalTimeZone());
  const { control, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm({/*...*/});
  const [activeStep, setActiveStep] = useState(0);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Existing effects and handlers

  const renderStepContent = (step: number) => {
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
        <StepperIndicator steps={steps} activeStep={activeStep} />
        
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
            totalSteps={steps.length}
            prevStep={prevStep}
            nextStep={nextStep}
            isPending={isPending}
            onSubmit={handleSubmit(onSubmit)}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;