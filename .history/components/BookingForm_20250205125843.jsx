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
import { DatePicker } from '@heroui/date-picker';
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/table';

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
              control={control}
              name="pickupLocation"
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  errorMessage={error ? error.message : ""}
                  isInvalid={!!error}
                  label="Pickup Location"
                  placeholder="Enter pickup location"
                  variant="bordered"
                />
              )}
              rules={{ required: "Pickup location is required" }}
            />
            <Controller
              control={control}
              name="dropoffLocation"
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  errorMessage={error ? error.message : ""}
                  isInvalid={!!error}
                  label="Drop-off Location"
                  placeholder="Enter drop-off location"
                  variant="bordered"
                />
              )}
              rules={{ required: "Drop-off location is required" }}
            />
            <Controller
  control={control}
  name="shipmentDate"
  rules={{ required: 'Shipment date is required' }}
  render={({ field, fieldState: { error } }) => (
    <DatePicker
      value={field.value}
      onChange={field.onChange}
      label="Shipment Date"
      variant="bordered"
      errorMessage={error ? error.message : ''}
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
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  errorMessage={error ? error.message : ''}
                  isInvalid={!!error}
                  label="Cargo Weight (kg)"
                  placeholder="Enter cargo weight"
                  type="number"
                  variant="bordered"
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
                <Input
                  {...field}
                  errorMessage={error ? error.message : ''}
                  isInvalid={!!error}
                  label="Cargo Volume (m³)"
                  placeholder="Enter cargo volume"
                  type="number"
                  variant="bordered"
                />
              )}
              rules={{
                required: 'Cargo volume is required',
                min: { value: 0.1, message: 'Volume must be positive' }
              }}
            />
            {/* HeroUI Slider for Temperature */}
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
            {/* HeroUI Checkbox for Fragile Cargo */}
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
            {/* HeroUI Input for Email */}
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <Input
                  {...field}
                  errorMessage={error ? error.message : ''}
                  isInvalid={!!error}
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  variant="bordered"
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
        return 'Unknown Step';
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Primereact Steps component for navigation */}
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
              <Button color="success" type="submit" variant="solid" onPress={handleSubmit(onSubmit)}>
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