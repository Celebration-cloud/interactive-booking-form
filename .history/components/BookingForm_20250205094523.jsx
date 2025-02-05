/* eslint-disable prettier/prettier */
"use client";
// pages/booking.js
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Steps } from 'primereact/steps';
import { Button, ButtonGroup } from "@heroui/button";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Slider } from "@heroui/slider";
import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";

// Define steps for the Primereact Steps component
const steps = [
  { label: 'Shipment Details' },
  { label: 'Cargo Details' },
  { label: 'Review & Confirm' }
];

const BookingForm = () => {
  // Initialize React Hook Form with default values
  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      pickupLocation: '',
      dropoffLocation: '',
      shipmentDate: '',
      cargoWeight: '',
      cargoVolume: '',
      temperature: 0.4, // Default value for the slider
      fragile: false,   // Checkbox for fragile cargo
      email: '',
      pricing: 0,       // Dynamic pricing value
    }
  });

  // Manage the current active step (0-indexed)
  const [activeStep, setActiveStep] = useState(0);

  // Watch cargo weight and volume to update pricing dynamically
  const cargoWeight = watch('cargoWeight');
  const cargoVolume = watch('cargoVolume');

  useEffect(() => {
    const weight = parseFloat(cargoWeight) || 0;
    const volume = parseFloat(cargoVolume) || 0;
    // Example pricing formula: Base $50 + $0.5 per kg + $0.2 per m³
    const price = 50 + weight * 0.5 + volume * 0.2;

    setValue('pricing', price.toFixed(2));
  }, [cargoWeight, cargoVolume, setValue]);

  // Function to validate fields for the current step before moving forward
  const nextStep = async () => {
    let valid = false;

    if (activeStep === 0) {
      valid = await trigger(['pickupLocation', 'dropoffLocation', 'shipmentDate']);
    } else if (activeStep === 1) {
      valid = await trigger(['cargoWeight', 'cargoVolume', 'email']);
    } else {
      valid = true;
    }
    if (valid) {
      setActiveStep(prev => prev + 1);
    }
  };

  const prevStep = () => setActiveStep(prev => prev - 1);

  // Final submission handler
  const onSubmit = (data) => {
    console.log('Booking submitted:', data);
    // Implement your submission logic (e.g., API call) here.
  };

  // Render form content for each step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Controller
              control={control}
              name="pickupLocation"
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                  placeholder="Pickup Location"
                />
              )}
              rules={{ required: 'Pickup location is required' }}
            />
            <Controller
              control={control}
              name="dropoffLocation"
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                  placeholder="Drop-off Location"
                />
              )}
              rules={{ required: 'Drop-off location is required' }}
            />
            <Controller
              control={control}
              name="shipmentDate"
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                  type="date"
                />
              )}
              rules={{ required: 'Shipment date is required' }}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Controller
              control={control}
              name="cargoWeight"
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                  placeholder="Cargo Weight (kg)"
                  type="number"
                />
              )}
              rules={{
                required: 'Cargo weight is required',
                min: { value: 0.1, message: 'Weight must be positive' }
              }}
            />
            <Controller
              control={control}
              name="cargoVolume"
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                  placeholder="Cargo Volume (m³)"
                  type="number"
                />
              )}
              rules={{
                required: 'Cargo volume is required',
                min: { value: 0.1, message: 'Volume must be positive' }
              }}
            />
            {/* HeroUi Slider for Temperature */}
            <Controller
              control={control}
              name="temperature"
              render={({ field }) => (
                <Slider
                  className="max-w-md"
                  defaultValue={field.value}
                  label="Temperature"
                  maxValue={1}
                  minValue={0}
                  step={0.01}
                  onChange={(val) => field.onChange(val)}
                />
              )}
            />
            {/* HeroUi Checkbox for Fragile Cargo */}
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
            {/* HeroUi Input for Email */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <Input
                  className="max-w-xs"
                  defaultValue={field.value}
                  errorMessage={error ? error.message : ''}
                  isInvalid={!!error}
                  label="Email"
                  type="email"
                  variant="bordered"
                  onChange={field.onChange}
                />
              )}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              }}
            />
            <div className="text-lg font-semibold">
              Estimated Price: ${watch('pricing')}
            </div>
          </div>
        );
      case 2:
        const values = watch();

        return (
          <div className="space-y-4">
            <div><strong>Pickup:</strong> {values.pickupLocation}</div>
            <div><strong>Drop-off:</strong> {values.dropoffLocation}</div>
            <div><strong>Shipment Date:</strong> {values.shipmentDate}</div>
            <div><strong>Cargo Weight:</strong> {values.cargoWeight} kg</div>
            <div><strong>Cargo Volume:</strong> {values.cargoVolume} m³</div>
            <div><strong>Temperature:</strong> {values.temperature}</div>
            <div><strong>Fragile Cargo:</strong> {values.fragile ? 'Yes' : 'No'}</div>
            <div><strong>Email:</strong> {values.email}</div>
            <div><strong>Estimated Price:</strong> ${values.pricing}</div>
          </div>
        );
      default:
        return 'Unknown Step';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Primereact Steps component displays the navigation progress */}
      <Steps readOnly activeIndex={activeStep} model={steps} />
      <Card className="mt-6">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Cargo Shipment Booking</h1>
        </CardHeader>
        <CardBody>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {renderStepContent(activeStep)}
          </form>
        </CardBody>
        <CardFooter className="flex justify-between">
          {activeStep > 0 && (
            <Button color="secondary" variant="solid" onPress={prevStep}>
              Back
            </Button>
          )}
          <ButtonGroup>
            {activeStep < steps.length - 1 && (
              <Button color="primary" variant="solid" onPress={nextStep}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button color="success" type="submit" variant="solid" onP={handleSubmit(onSubmit)}>
                Confirm Booking
              </Button>
            )}
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookingForm;
