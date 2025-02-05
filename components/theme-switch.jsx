"use client"; // This line indicates that the component is rendered on the client side in a Next.js application.

import { VisuallyHidden } from "@react-aria/visually-hidden"; // For hiding the switch input element visually but keeping it accessible for screen readers.
import { useSwitch } from "@heroui/switch"; // Custom hook to manage the switch state and behavior.
import { useTheme } from "next-themes"; // Next.js theme hook for managing light and dark modes.
import { useIsSSR } from "@react-aria/ssr"; // Check if the component is running server-side.
import clsx from "clsx"; // Utility to combine class names conditionally.

import { SunFilledIcon, MoonFilledIcon } from "@/components/icons"; // Icons representing sun (light mode) and moon (dark mode).

// ThemeSwitchProps defines the props for the ThemeSwitch component.

// ThemeSwitch component for toggling between light and dark themes.
export const ThemeSwitch = ({ className, classNames }) => {
  const { theme, setTheme } = useTheme(); // `theme` stores the current theme, and `setTheme` updates the theme.
  const isSSR = useIsSSR(); // `isSSR` determines if the app is being rendered on the server.

  // `onChange` function to toggle between light and dark themes.
  const onChange = () => {
    // If the current theme is light, switch to dark, otherwise, switch to light.
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  // Use the `useSwitch` hook to manage the switch state and behavior.
  const {
    Component, // The main component for the switch (renders the input element).
    slots, // Helper functions for managing the visual structure of the switch.
    isSelected, // Boolean indicating if the switch is selected (light or dark theme).
    getBaseProps, // Function to get the base props for the component.
    getInputProps, // Function to get props for the input element.
    getWrapperProps, // Function to get props for the wrapper element.
  } = useSwitch({
    // `isSelected` determines if the switch should be in the 'light' mode or 'dark' mode.
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`, // Accessibility label for screen readers.
    onChange, // The onChange handler for switching themes.
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          "px-px transition-opacity hover:opacity-80 cursor-pointer", // Basic styles for the switch button.
          className, // Allow additional custom class names to be added.
          classNames?.base, // Additional base class names provided by the parent component.
        ),
      })}
    >
      {/* VisuallyHidden is used to hide the input for screen readers, keeping it accessible. */}
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      {/* Wrapper element for the switch. It includes conditional class names and styling. */}
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              "w-auto h-auto", // Set width and height.
              "bg-transparent", // Background is transparent.
              "rounded-lg", // Rounded corners for the wrapper.
              "flex items-center justify-center", // Center the contents inside the wrapper.
              "group-data-[selected=true]:bg-transparent", // Custom styling for the selected state.
              "!text-default-500", // Ensure text color is set correctly.
              "pt-px", // Set padding-top to 1px.
              "px-0", // Set padding-x to 0.
              "mx-0", // Set margin-x to 0.
            ],
            classNames?.wrapper, // Allow additional custom wrapper class names.
          ),
        })}
      >
        {/* If the switch is selected (light mode) or if SSR (Server-Side Rendering), render the Sun icon. */}
        {!isSelected || isSSR ? (
          <SunFilledIcon height={22} size={22} width={22} /> // Sun icon for light mode.
        ) : (
          <MoonFilledIcon height={22} size={22} width={22} /> // Moon icon for dark mode.
        )}
      </div>
    </Component>
  );
};
