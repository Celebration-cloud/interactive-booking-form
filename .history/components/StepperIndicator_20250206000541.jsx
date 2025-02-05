/* eslint-disable prettier/prettier */
"use client";

// StepperIndicator Component
// Props:
//   - steps: an array of objects, each representing a step with at least a "label" property.
//   - activeStep: the index (0-based) of the currently active step.
export const StepperIndicator = ({ steps, activeStep }) => (
  // Outer container with Tailwind classes for spacing and responsive layout.
  <div className="flex justify-between my-5 md:flex-col md:gap-10 md:w-1/3 md:justify-around">
    {steps.map((step, index) => (
      // Map over each step to render its indicator.
      <div
        key={step.label}
        className="text-center flex flex-col items-center space-y-2 md:flex-row md:gap-5"
      >
        {/* 
          The step number is displayed in a heading element (h2).
          The class names conditionally apply a green background and text colors if
          the current step is active or already completed (activeStep >= index).
        */}
        <h2
          className={`text-lg font-bold bg-gray-300 text-black px-3 py-1 rounded-full ${
            activeStep === index || activeStep >= index
              ? "bg-green-500 text-foreground-300"
              : ""
          }`}
        >
          {index + 1}
        </h2>
        {/*
          The step label is displayed next to the step number.
          If the step is active or already completed, its text is styled in green.
        */}
        <span
          className={`max-sm:text-xs ${
            activeStep === index || activeStep >= index ? "text-green-500" : ""
          }`}
        >
          {step.label}
        </span>
      </div>
    ))}
  </div>
);
