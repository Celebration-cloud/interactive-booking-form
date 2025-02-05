/* eslint-disable prettier/prettier */
"use client"; // This file is a client component, ensuring it runs in the browser.

// Import necessary components and hooks:
// - DatePicker and Input are UI components from HeroUI.
// - Controller is used from react-hook-form to connect controlled inputs to the form state.
import { DatePicker } from "@heroui/date-picker";
import { Input } from "@heroui/input";
import { Controller } from "react-hook-form";

/**
 * ShipmentStep Component
 *
 * This component renders the shipment details form fields for the booking process.
 * It includes three fields:
 *   1. Pickup Location (text input)
 *   2. Drop-off Location (text input)
 *   3. Shipment Date (date picker)
 *
 * The component uses the Controller from react-hook-form to connect each input to the form's state
 * and perform validation. Validation rules are specified via the "rules" prop.
 *
 * @param {object} props - The component props.
 * @param {object} props.control - The control object from react-hook-form, used for managing form state.
 */
export const ShipmentStep = ({ control }) => (
  // The container div applies vertical spacing between fields using Tailwind CSS's "space-y-4" utility.
  <div className="space-y-4">
    {/* Pickup Location Field */}
    <Controller
      control={control}
      name="pickupLocation" // Form field name
      render={({ field, fieldState: { error } }) => (
        // Render the HeroUI Input component for Pickup Location.
        <Input
          {...field} // Spread field props (value, onChange, etc.) to the input.
          errorMessage={error ? error.message : ""} // Display error message if validation fails.
          isInvalid={!!error} // Set invalid state if there's an error.
          label="Pickup Location" // Label text for the input.
          placeholder="Enter pickup location" // Placeholder text.
          variant="bordered" // Use the bordered variant of the input.
        />
      )}
      rules={{ required: "Pickup location is required" }} // Validation rule: field is required
    />

    {/* Drop-off Location Field */}
    <Controller
      control={control}
      name="dropoffLocation"
      render={({ field, fieldState: { error } }) => (
        // Render the HeroUI Input component for Drop-off Location.
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

    {/* Shipment Date Field */}
    <Controller
      control={control}
      name="shipmentDate"
      render={({ field, fieldState: { error } }) => (
        // Render the HeroUI DatePicker component for Shipment Date.
        <DatePicker
          errorMessage={error ? error.message : ""}
          isInvalid={!!error}
          label="Shipment Date"
          value={field.value} // Pass the current value from the form state.
          variant="bordered"
          onChange={(date) => field.onChange(date)} // Update the form state on change.
        />
      )}
      rules={{ required: "Shipment date is required" }}
    />
  </div>
);
