/* eslint-disable prettier/prettier */
"use c"
export const StepperIndicator = ({ steps, activeStep }) => (
  <div className="flex justify-between my-5 md:flex-col md:gap-10 md:w-1/3 md:justify-around">
    {steps.map((step, index) => (
      <div
        key={step.label}
        className="text-center flex flex-col items-center space-y-2 md:flex-row md:gap-5"
      >
        <h2
          className={`text-lg font-bold bg-gray-300 text-black px-3 py-1 rounded-full ${
            activeStep === index || activeStep >= index
              ? "bg-green-500 text-foreground-300"
              : ""
          }`}
        >
          {index + 1}
        </h2>
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
