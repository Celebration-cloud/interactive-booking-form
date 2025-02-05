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
import 'tailwindcss/tailwind.css';

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
      temperature: 0.4, // Default for Slider
      fragile: false,   // For Checkbox
      email: '',
      pricing: 0,       // Dynamic pricing value
    }
  });

  // Manage current active step (0-indexed)
  const [activeStep, setActiveStep] = useState(0);

  // Watch cargo weight and volume for dynamic pricing
  const cargoWeight = watch('cargoWeight');
  const cargoVolume = watch('cargoVolume');

  useEffect(() => {
    const weight = parseFloat(cargoWeight) || 0;
    const volume = parseFloat(cargoVolume) || 0;
    // Example pricing: Base $50 + $0.5 per kg + $0.2 per m³
    const price = 50 + weight * 0.5 + volume * 0.2;
    setValue('pricing', price.toFixed(2));
  }, [cargoWeight, cargoVolume, setValue]);

  // Validate fields for current step before moving forward
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
    // Implement further submission logic (e.g. API call) here.
  };

  // Render form content for each step using HeroUI Input components
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
                <Input
                  {...field}
                  label="Pickup Location"
                  placeholder="Enter pickup location"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ''}
                />
              )}
            />
            <Controller
              name="dropoffLocation"
              control={control}
              rules={{ required: 'Drop-off location is required' }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Drop-off Location"
                  placeholder="Enter drop-off location"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ''}
                />
              )}
            />
            <Controller
              name="shipmentDate"
              control={control}
              rules={{ required: 'Shipment date is required' }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Shipment Date"
                  type="date"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ''}
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
                <Input
                  {...field}
                  label="Cargo Weight (kg)"
                  type="number"
                  placeholder="Enter cargo weight"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ''}
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
                <Input
                  {...field}
                  label="Cargo Volume (m³)"
                  type="number"
                  placeholder="Enter cargo volume"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ''}
                />
              )}
            />
            {/* HeroUI Slider for Temperature */}
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
            {/* HeroUI Checkbox for Fragile Cargo */}
            <Controller
              name="fragile"
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                >
                  Fragile Cargo
                </Checkbox>
              )}
            />
            {/* HeroUI Input for Email */}
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
              }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
                  isInvalid={!!error}
                  errorMessage={error ? error.message : ''}
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
          <Table>
      <TableHeader>
        <TableRow>
          <TableColumn>Field</TableColumn>
          <TableColumn>Value</TableColumn>
        </TableRow>
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
          <TableCell>{values.shipmentDate}</TableCell>
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
          <TableCell>{values.fragile ? 'Yes' : 'No'}</TableCell>
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
        return 'Unknown Step';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Primereact Steps component for navigation */}
      <Steps readOnly model={steps} activeIndex={activeStep} />
      <Card className="mt-6">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Cargo Shipment Booking</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {renderStepContent(activeStep)}
          </form>
        </CardBody>
        <CardFooter className="flex justify-between">
          {activeStep > 0 && (
            <Button variant="solid" color="secondary" onClick={prevStep}>
              Back
            </Button>
          )}
          <ButtonGroup>
            {activeStep < steps.length - 1 && (
              <Button variant="solid" color="primary" onClick={nextStep}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button variant="solid" color="success" type="submit" onClick={handleSubmit(onSubmit)}>
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