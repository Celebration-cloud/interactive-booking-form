/* eslint-disable prettier/prettier */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";

/**
 * ReviewStep Component
 *
 * This component displays a summary of the shipment and cargo details entered by the user.
 * It presents the information in a tabular format for easy review before final submission.
 *
 * Props:
 * - values (object): An object containing all the form values to be reviewed.
 *
 * Example usage:
 * ```jsx
 * <ReviewStep values={formValues} />
 * ```
 */
export const ReviewStep = ({ values }) => (
  <Table>
    <TableHeader>
      <TableColumn>Field</TableColumn>
      <TableColumn>Value</TableColumn>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>Pickup Location</TableCell>
        <TableCell>{values.pickupLocation}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Drop-off Location</TableCell>
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
        <TableCell>{values.temperature}°C</TableCell>
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
