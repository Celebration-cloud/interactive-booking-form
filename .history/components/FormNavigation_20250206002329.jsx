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
}: FormNavigationProps) => (
  <div 
    className="flex flex-row justify-between items-center px-4 py-3"
    role="navigation"
    aria-label="Form navigation"
  >
    {/* Back Button - Only shown when not on first step */}
    {activeStep > 0 && (
      <Button
        className="mb-0"
        color="secondary"
        variant="solid"
        onPress={prevStep}
        aria-label="Previous step"
        disabled={isPending}
      >
        Back
      </Button>
    )}

    {/* Next/Submit Button Group */}
    <ButtonGroup className="w-auto">
      {activeStep < totalSteps - 1 ? (
        // Next Step Button
        <Button 
          color="primary" 
          variant="solid"
          onPress={nextStep}
          aria-label="Next step"
          disabled={isPending}
        >
          Next
        </Button>
      ) : (
        // Final Submission Button
        <Button
          color="success"
          type="submit"
          variant="solid"
          onPress={onSubmit}
          aria-label={isPending ? "Submitting form" : "Confirm submission"}
          disabled={isPending}
          isLoading={isPending}
        >
          {isPending ? "Submitting..." : "Confirm Booking"}
        </Button>
      )}
    </ButtonGroup>
  </div>
);