import { Button } from '@heroui/button';
const NavButton = () => {
  return (
    <div>
      <Button color="light" variant="outline" onPress={navigateToBooking}>
        Book a Shipment
      </Button>
    </div>
  );
}

export default NavButton
