/* eslint-disable prettier/prettier */
"use client";

// pages/booking.js
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Steps } from 'primereact/steps';
// import { Slider, Checkbox, Input } from 'heroui'; // Adjust the import path based on your HeroUi library setup
import { Checkbox } from "@heroui/checkbox";
import { Slider } from "@heroui/slider";
import { Input } from "@heroui/input";
// Define the steps for the Primereact Stepper
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
      // HeroUi-specific fields:
      temperature: 0.4,  // Default value for the slider
      fragile: false,    // For the checkbox
      email: '',
      pricing: 0         // Dynamic price calculated from cargo details
    }
  });

  // Manage the active step
  const [activeStep, setActiveStep] = useState(0);

  // Watch cargo weight and volume fields to update dynamic pricing
  const cargoWeight = watch('cargoWeight');
  const cargoVolume = watch('cargoVolume');

  useEffect(() => {
    const weight = parseFloat(cargoWeight) || 0;
    const volume = parseFloat(cargoVolume) || 0;
    // For example, base price of $50 plus $0.5 per kg and $0.2 per m³:
    const price = 50 + weight * 0.5 + volume * 0.2;
    setValue('pricing', price.toFixed(2));
  }, [cargoWeight, cargoVolume, setValue]);

  // Validate the fields for the current step before moving forward
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
      setActiveStep((prev) => prev + 1);
    }
  };

  const prevStep = () => setActiveStep((prev) => prev - 1);

  // Final submission handler
  const onSubmit = (data) => {
    console.log('Booking submitted:', data);
    // Implement submission logic (e.g., API call) as needed.
  };

  // Render different step contents based on the active step
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-4">
            <Controller
              name="pickupLocation"
              control={control}
              rules={{ required: 'Pickup location is required' }}
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  placeholder="Pickup Location"
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                />
              )}
            />
            <Controller
              name="dropoffLocation"
              control={control}
              rules={{ required: 'Drop-off location is required' }}
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  placeholder="Drop-off Location"
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                />
              )}
            />
            <Controller
              name="shipmentDate"
              control={control}
              rules={{ required: 'Shipment date is required' }}
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  type="date"
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                />
              )}
            />
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <Controller
              name="cargoWeight"
              control={control}
              rules={{
                required: 'Cargo weight is required',
                min: { value: 0.1, message: 'Weight must be positive' }
              }}
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Cargo Weight (kg)"
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                />
              )}
            />
            <Controller
              name="cargoVolume"
              control={control}
              rules={{
                required: 'Cargo volume is required',
                min: { value: 0.1, message: 'Volume must be positive' }
              }}
              render={({ field, fieldState: { error } }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="Cargo Volume (m³)"
                  className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
                />
              )}
            />
            {/* HeroUi Slider for Temperature */}
            <Controller
              name="temperature"
              control={control}
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
              name="fragile"
              control={control}
              render={({ field }) => (
                <Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)}>
                  Fragile Cargo
                </Checkbox>
              )}
            />
            {/* HeroUi Input for Email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              }}
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
      {/* Primereact Steps component for navigation */}
      <Steps readOnly model={steps} activeIndex={activeStep} />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        {renderStepContent(activeStep)}
        <div className="flex justify-between">
          {activeStep > 0 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
          )}
          {activeStep < steps.length - 1 && (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Confirm Booking
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookingForm;