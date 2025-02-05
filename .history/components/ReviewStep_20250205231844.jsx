import { Table, TableCell, TableRow } from "@heroui/table";
import { WatchProps } from "./types";

export const ReviewStep = ({ values }) => (
  <Table>
    <TableHeader>
      <TableColumn>Field</TableColumn>
      <TableColumn>Value</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Pickup</TableCell>
        <TableCell>{values.pickupLocation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Drop-off</TableCell>
        <TableCell>{values.dropoffLocation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Shipment Date</TableCell>
        <TableCell>{values.shipmentDate.toString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cargo Weight</TableCell>
        <TableCell>{values.cargoWeight} kg</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Cargo Volume</TableCell>
        <TableCell>{values.cargoVolume} m³</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Temperature</TableCell>
        <TableCell>{values.temperature}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Fragile Cargo</TableCell>
        <TableCell>{values.fragile ? "Yes" : "No"}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Email</TableCell>
        <TableCell>{values.email}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Estimated Price</TableCell>
        <TableCell>${values.pricing}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);