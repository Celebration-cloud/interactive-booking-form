/* eslint-disable prettier/prettier */
"use client";
// import { Control, FieldErrors } from "react-hook-form";
import { Input, DatePicker } from "@heroui/input";
import { Controller } from "react-hook-form";

export const ShipmentStep = ({ control, error }) => (
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
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          errorMessage={error ? error.message : ""}
          isInvalid={!!error}
          label="Shipment Date"
          value={field.value}
          variant="bordered"
          onChange={(date) => field.onChange(date)}
        />
      )}
      rules={{ required: "Shipment date is required" }}
    />
  </div>
);