import { Button } from "@heroui/button";
export default function Home() {
  return (
    <section className="">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
        Reliable Cargo Shipping Services
      </h1>
      <p className="text-lg md:text-2xl mb-8">
        Fast, secure, and efficient transportation solutions tailored to your
        needs.
      </p>
      <Button
        color="primary"
        size="lg"
        variant="solid"
        onPress={navigateToBooking}
      >
        Get Started
      </Button>
    </section>
  );
}
