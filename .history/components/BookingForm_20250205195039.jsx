/* eslint-disable prettier/prettier */
"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Slider } from "@heroui/slider";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { DatePicker } from "@heroui/date-picker";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { useRouter } from "next/navigation";
import { getLocalTimeZone, today } from "@internationalized/date";

const steps = [
  { label: "Shipment Details" },
  { label: "Cargo Details" },
  { label: "Review & Confirm" },
];

const BookingForm = () => {
  // Use today's date for a proper Date object
  const defaultDate = today(getLocalTimeZone());

  // Set up form validation on change for real-time feedback.
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
      shipmentDate: defaultDate,
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
    console.log("Booking submitted:", data);
    startTransition(() => {
      router.push("/thank-you");
    });
  };

  // Render the content for each step (used within StepperPanel)
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Controller
              control={control}
              name="pickupLocation"
              rules={{ required: "Pickup location is required" }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Pickup Location"
                  placeholder="Enter pickup location"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="dropoffLocation"
              rules={{ required: "Drop-off location is required" }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Drop-off Location"
                  placeholder="Enter drop-off location"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="shipmentDate"
              rules={{ required: "Shipment date is required" }}
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  label="Shipment Date"
                  value={field.value}
                  variant="bordered"
                  onChange={(date) => field.onChange(date)}
                  errorMessage={error ? error.message : ""}
                  isInvalid={!!error}
                />
              )}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Controller
              control={control}
              name="cargoWeight"
              rules={{
                required: "Cargo weight is required",
                min: { value: 0.1, message: "Weight must be positive" },
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Cargo Weight (kg)"
                  placeholder="Enter cargo weight"
                  type="number"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="cargoVolume"
              rules={{
                required: "Cargo volume is required",
                min: { value: 0.1, message: "Volume must be positive" },
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Cargo Volume (m³)"
                  placeholder="Enter cargo volume"
                  type="number"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ""}
                />
              )}
            />
            <Controller
              control={control}
              name="temperature"
              render={({ field }) => (
                <Slider
                  className="max-w-md"
                  label="Temperature"
                  maxValue={1}
                  minValue={0}
                  step={0.01}
                  value={Number(field.value) || 0.4}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            <Controller
              control={control}
              name="fragile"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  Fragile Cargo
                </Checkbox>
              )}
            />
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ""}
                />
              )}
            />
            <div className="text-lg font-semibold">
              Estimated Price: ${watch("pricing")}
            </div>
          </div>
        );
      case 2:
        const values = watch();
        return (
          <Table>
            <TableHeader>
              <TableColumn>Field</TableColumn>
              <TableColumn>Value</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Pickup</TableCell>
                <TableCell>{values.pickupLocation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Drop-off</TableCell>
                <TableCell>{values.dropoffLocation}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shipment Date</TableCell>
                <TableCell>{values.shipmentDate.toString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cargo Weight</TableCell>
                <TableCell>{values.cargoWeight} kg</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Cargo Volume</TableCell>
                <TableCell>{values.cargoVolume} m³</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Temperature</TableCell>
                <TableCell>{values.temperature}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fragile Cargo</TableCell>
                <TableCell>{values.fragile ? "Yes" : "No"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{values.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Estimated Price</TableCell>
                <TableCell>${values.pricing}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        );
      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Render the stepper */}
        <Stepper activeIndex={activeStep} model={steps} className="mb-6" />
        <Card className="bg-white shadow rounded-lg">
          <CardHeader className="px-4 py-5 border-b">
            <h1 className="text-2xl font-bold text-center">
              Cargo Shipment Booking
            </h1>
          </CardHeader>
          <CardBody className="px-4 py-6">
            {/* Wrap the step content within StepperPanel components */}
            <StepperPanel header="Shipment Details" hidden={activeStep !== 0}>
              {renderStepContent(0)}
            </StepperPanel>
            <StepperPanel header="Cargo Details" hidden={activeStep !== 1}>
              {renderStepContent(1)}
            </StepperPanel>
            <StepperPanel header="Review & Confirm" hidden={activeStep !== 2}>
              {renderStepContent(2)}
            </StepperPanel>
          </CardBody>
          <CardFooter className="flex flex-col md:flex-row justify-between items-center px-4 py-3 border-t">
            {activeStep > 0 && (
              <Button
                className="mb-2 md:mb-0"
                color="secondary"
                variant="solid"
                onPress={prevStep}
              >
                Back
              </Button>
            )}
            <ButtonGroup className="w-full md:w-auto">
              {activeStep < steps.length - 1 && (
                <Button color="primary" variant="solid" onPress={nextStep}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button
                  color="success"
                  type="submit"
                  variant="solid"
                  onPress={handleSubmit(onSubmit)}
                >
                  {isPending ? "Submitting..." : "Confirm Booking"}
                </Button>
              )}
            </ButtonGroup>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
