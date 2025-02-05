import { Control, FieldErrors } from "react-hook-form";
import { Input, Slider, Checkbox } from "@heroui/input";
import { Controller } from "react-hook-form";

export const CargoStep = ({
  control,
  errors,
  watch,
}) => (
  <div className="space-y-4">
    {/* Keep all Controller components for cargo fields */}
    <div className="text-lg font-semibold">
      Estimated Price: ${watch("pricing")}
    </div>
  </div>
);