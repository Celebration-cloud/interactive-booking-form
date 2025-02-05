// Logo Component
// This component renders an SVG of a logo, customizable by its size or explicit width and height.

export const Logo = ({ size = 36, width, height, ...props }) => (
  // The SVG element is rendered with configurable height and width using size, width, and height props.
  // Default size is 36, but can be customized through the props.
  <svg
    fill="none" // Ensures no fill color by default (will inherit color from parent).
    height={size || height} // Use the 'size' prop if available, otherwise fallback to 'height'.
    viewBox="0 0 32 32" // SVG viewBox is fixed to 32x32 for proper scaling.
    width={size || width} // Use the 'size' prop if available, otherwise fallback to 'width'.
    {...props} // Spread the rest of the props onto the SVG element (e.g., className, style).
  >
    {/* The main path element representing the logo's shape */}
    <path
      clipRule="evenodd" // Uses 'evenodd' clipping rule to define how the path is filled.
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" // Path data for the logo's shape.
      fill="currentColor" // Fill color will be the current text color of the parent element (CSS 'color' property).
      fillRule="evenodd" // Defines how to determine if a path is inside or outside when overlapping.
    />
  </svg>
);

// MoonFilledIcon Component
// This component renders a filled moon icon, customizable by size, width, height, and other SVG properties.

export const MoonFilledIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true" // This ensures the SVG is hidden from screen readers (since it's decorative).
    focusable="false" // Prevents the SVG from receiving focus (no interaction).
    height={size || height} // Similar to Logo, the height can be controlled via props.
    role="presentation" // Specifies the role as a decorative image (not interactive).
    viewBox="0 0 24 24" // Viewbox for the moon icon, ensuring the icon scales properly.
    width={size || width} // Similar to height, width is customizable.
    {...props} // Spread remaining props (e.g., className, style, onClick).
  >
    {/* Path element that renders the moon shape */}
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z" // Path data for the moon's filled shape.
      fill="currentColor" // Fill color will inherit from the parent element's color.
    />
  </svg>
);

// SunFilledIcon Component
// This component renders a filled sun icon, customizable by size, width, height, and other SVG properties.

export const SunFilledIcon = ({ size = 24, width, height, ...props }) => (
  <svg
    aria-hidden="true" // Hides the icon from screen readers.
    focusable="false" // Prevents focus on the icon for accessibility purposes.
    height={size || height} // Height is either taken from 'size' or 'height' prop.
    role="presentation" // This is a purely decorative icon, so no interactive role.
    viewBox="0 0 24 24" // Viewbox ensures the icon scales properly across different screen sizes.
    width={size || width} // Width is either taken from 'size' or 'width' prop.
    {...props} // Spread the remaining props onto the SVG element.
  >
    <g fill="currentColor">
      {" "}
      {/* Grouping paths for fill color uniformity */}
      {/* Circle path for the sun's body */}
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      {/* Small paths for the sun's rays */}
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);
