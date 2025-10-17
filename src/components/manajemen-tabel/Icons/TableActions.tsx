import React from "react";
import { IconButton, Stack, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActionButtons({ onEdit, onDelete }: any) {
  return (
    <Stack direction="row" spacing={1}>
      {/* Edit Button */}
      <Tooltip title="Edit">
        <IconButton onClick={onEdit} sx={{ color: "grey.600", "&:hover": { color: "grey.800" } }}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {/* Delete Button */}
      <Tooltip title="Delete">
        <IconButton onClick={onDelete} sx={{ color: "grey.600", "&:hover": { color: "grey.800" } }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}