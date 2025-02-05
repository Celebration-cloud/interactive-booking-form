import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';

const NavButton = () => {
     const router = useRouter();

     const navigateToBooking = () => {
       router.push("/booking");
     };
  return (
    <div>
      <Button color="light" variant="outline" onPress={navigateToBooking}>
        Book a Shipment
      </Button>
    </div>
  );
}

export default NavButton
