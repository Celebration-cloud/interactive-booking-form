import BookingForm from "../../components/BookingForm";

export const metadata = {
  title: "Booking",
  description: "Descrição da página",
};

export default function booking() {
  return (
    <div>
      <BookingForm />
    </div>
  );
}
