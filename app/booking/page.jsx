/* eslint-disable prettier/prettier */

// Import the BookingForm component from the components folder.
// This is the main form component for handling cargo shipment booking.
import BookingForm from "../../components/BookingForm";

// Define metadata for the page. This metadata can be used by Next.js
// for SEO, head management, and other configurations in your app.
export const metadata = {
  title: "Booking", // Page title
  description: "Descrição da página", // Page description (in Portuguese)
};

// The default export is a functional React component that represents the Booking page.
// In Next.js, the file name and this component determine the route (e.g., /booking).
export default function booking() {
  return (
    <div>
      {/* Render the BookingForm component which encapsulates the multi-step booking form */}
      <BookingForm />
    </div>
  );
}
