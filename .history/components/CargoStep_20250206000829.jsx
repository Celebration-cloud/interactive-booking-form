/* eslint-disable prettier/prettier */
"use client";

import { Checkbox } from "@heroui/checkbox";
import { Input } from "@heroui/input";
import { Slider } from "@heroui/slider";
import { Controller } from "react-hook-form";

/**
 * CargoStep Component
 *
 * This component represents the second step in a multi-step form process,
 * focusing on collecting details about the cargo. It utilizes the `react-hook-form`
 * library for form management and validation, and components from the HeroUI library
 * for consistent UI elements.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.control - The control object from `react-hook-form` used to manage form state.
 * @param {Function} props.watch - The watch function from `react-hook-form` to monitor form values.
 * @returns {JSX.Element} The rendered CargoStep component.
 */
export const CargoStep = ({ control, watch }) => (
  <div className="space-y-4">
    {/* Cargo Weight Input */}
    <Controller
      control={control}
      name="cargoWeight"
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          errorMessage={error ? error.message : ""}
          isInvalid={!!error}
          label="Cargo Weight (kg)"
          placeholder="Enter cargo weight"
          type="number"
          variant="bordered"
        />
      )}
      rules={{
        required: "Cargo weight is required",
        min: { value: 0.1, message: "Weight must be positive" },
      }}
    />

    {/* Cargo Volume Input */}
    <Controller
      control={control}
      name="cargoVolume"
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          errorMessage={error ? error.message : ""}
          isInvalid={!!error}
          label="Cargo Volume (m³)"
          placeholder="Enter cargo volume"
          type="number"
          variant="bordered"
        />
      )}
      rules={{
        required: "Cargo volume is required",
        min: { value: 0.1, message: "Volume must be positive" },
      }}
    />

    {/* Temperature Slider */}
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

    {/* Fragile Cargo Checkbox */}
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

    {/* Email Input */}
    <Controller
      control={control}
      name="email"
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          errorMessage={error ? error.message : ""}
          isInvalid={!!error}
          label="Email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
        />
      )}
      rules={{
        required: "Email is required",
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Invalid email address",
        },
      }}
    />

    {/* Estimated Price Display */}
    <div className="text-lg font-semibold">
      Estimated Price: ${watch("pricing")}
    </div>
  </div>
);