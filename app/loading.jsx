/* eslint-disable prettier/prettier */
import { Spinner } from "@heroui/spinner"; // Importing Spinner component from HeroUI for loading indicator

/**
 * Loading Component
 * - Displays a centered loading spinner while data or content is being loaded.
 *
 * @returns {JSX.Element} - A centered spinner that occupies the full screen height
 */
export default function Loading() {
  return (
    <div className="flex justify-center w-full h-screen">
      {/* Centering the spinner in the middle of the screen */}
      <Spinner />
    </div>
  );
}
