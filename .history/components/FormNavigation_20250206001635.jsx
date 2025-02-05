/* eslint-disable prettier/prettier */
/**
 * FormNavigation Component
 *
 * A reusable navigation control for multi-step forms. Handles:
 * - Step progression (Next/Back buttons)
 * - Final submission
 * - Loading states
 * - Accessibility attributes
 *
 * @component
 * @example
 * // Basic usage in a 3-step form
 * <FormNavigation
 *   activeStep={1}
 *   totalSteps={3}
 *   prevStep={() => setStep(prev => prev - 1)}
 *   nextStep={() => setStep(prev => prev + 1)}
 *   isPending={false}
 *   onSubmit={handleSubmit}
 * />
 *
 * @typedef {Object} FormNavigationProps
 * @property {number} activeStep - Current step index (0-based)
 * @property {number} totalSteps - Total number of steps in the form
 * @property {() => void} prevStep - Callback for navigating to previous step
 * @property {() => void} nextStep - Callback for navigating to next step
 * @property {boolean} isPending - Loading state for submission
 * @property {() => void} onSubmit - Final form submission handler
 *
 * @param {FormNavigationProps} props
 */
"use client";

import { Button, ButtonGroup } from "@heroui/button";

export const FormNavigation = ({
  activeStep,
  totalSteps,
  prevStep,
  nextStep,
  isPending,
  onSubmit,
}) => (
  <div
    aria-label="Form navigation"
    className="flex flex-row justify-between items-center px-4 py-3"
    role="navigation"
  >
    {/* Back Button - Only shown when not on first step */}
    {activeStep > 0 && (
      <Button
        aria-label="Previous step"
        className="mb-0"
        color="secondary"
        disabled={isPending}
        variant="solid"
        onPress={prevStep}
      >
        Back
      </Button>
    )}

    {/* Next/Submit Button Group */}
    <ButtonGroup className="w-auto">
      {activeStep < totalSteps - 1 ? (
        // Next Step Button
        <Button
          aria-label="Next step"
          color="primary"
          disabled={isPending}
          variant="solid"
          onPress={nextStep}
        >
          Next
        </Button>
      ) : (
        // Final Submission Button
        <Button
          aria-label={isPending ? "Submitting form" : "Confirm submission"}
          color="success"
          disabled={isPending}
          isLoading={isPending}
          type="submit"
          variant="solid"
          onPress={onSubmit}
        >
          {isPending ? "Submitting..." : "Confirm Booking"}
        </Button>
      )}
    </ButtonGroup>
  </div>
);
