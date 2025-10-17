// import React from "react";
import { TableCell, Chip } from "@mui/material";

interface StatusCellProps {
  status: number; // 1 = Pending, 2 = Confirmed, 3 = Denied
}

export default function StatusCell({ status }: StatusCellProps) {
  let label = "";
  let color: "default" | "success" | "error" | "warning" = "default";

  switch (status) {
    case 1:
      label = "Pending";
      color = "warning";
      break;
    case 2:
      label = "Confirmed";
      color = "success";
      break;
    case 3:
      label = "Denied";
      color = "error";
      break;
    default:
      label = "Unknown";
      color = "default";
      break;
  }

  return (
    <TableCell>
      <Chip
        label={label}
        color={color}
        variant="outlined"
        sx={{
          fontWeight: "bold",
          textTransform: "capitalize",
          borderRadius: "8px",
          minWidth: "100px",
        }}
      />
    </TableCell>
  );
}