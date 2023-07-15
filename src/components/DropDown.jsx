import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export default function DropDown({ operator, handleChange }) {
  return (
    <Box width="150px">
      <TextField
        label="Select operator"
        select
        size="small"
        value={operator}
        onChange={handleChange}
        fullWidth
      >
        <MenuItem value="LT">&lt;</MenuItem>
        <MenuItem value="GT">&gt;</MenuItem>
      </TextField>
    </Box>
  );
}
