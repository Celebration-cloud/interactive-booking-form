import { Control, FieldErrors } from "react-hook-form";
import { Input, Slider, Checkbox } from "@heroui/input";
import { Controller } from "react-hook-form";

export const CargoStep = ({ control, errors, watch }) => (
  <div className="space-y-4">
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
    <div className="text-lg font-semibold">
      Estimated Price: ${watch("pricing")}
    </div>
  </div>
);