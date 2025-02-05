/* eslint-disable prettier/prettier */
import { Button, ButtonGroup } from "@heroui/button";

export const FormNavigation = ({
  activeStep,
  totalSteps,
  prevStep,
  nextStep,
  isPending,
  onSubmit,
}) => (
  <div className="flex flex-row justify-between items-center px-4 py-3">
    {activeStep > 0 && (
      <Button
        className="mb-0"
        color="secondary"
        variant="solid"
        onPress={prevStep}
      >
        Back
      </Button>
    )}
    <ButtonGroup className="w-auto">
      {activeStep < totalSteps - 1 ? (
        <Button color="primary" variant="solid" onPress={nextStep}>
          Next
        </Button>
      ) : (
        <Button
          color="success"
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
