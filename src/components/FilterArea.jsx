import React, { useContext } from "react";
import { Paper, Stack, Box } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import FilterComponent from "./FilterComponent";
import { WeatherContext } from "../App";
import { UPDATE_CONDITIONAL_OPERATOR_STATE } from "../assets/ActionConstants";

export default function FilterArea() {
  const { weatherPortalState, weatherDispatch } = useContext(WeatherContext);
  const conditionalToggle = (
    <ToggleButtonGroup
      color="primary"
      value={weatherPortalState.filter.conditionalOperator}
      exclusive
      size="small"
      onChange={(e) => {
        weatherDispatch({
          type: UPDATE_CONDITIONAL_OPERATOR_STATE,
          conditionalOperator: e.target.value,
        });
      }}
      aria-label="conditional operator"
    >
      <ToggleButton value="and">AND</ToggleButton>
      <ToggleButton value="or">OR</ToggleButton>
    </ToggleButtonGroup>
  );
  return (
    <Paper elevation={3}>
      <Stack direction="row" spacing={3} alignItems="center">
        <Box
          display="flex"
          direction="row"
          alignItems="center"
          sx={{ backgroundColor: "gray", p: 1, height: 40 }}
        >
          Filter&nbsp;&nbsp;&nbsp; <FilterListIcon />
        </Box>

        <Stack direction="row" spacing={5} alignItems="center">
          <FilterComponent attributeName="Min" />
          {conditionalToggle}
          <FilterComponent attributeName="Max" />
        </Stack>
      </Stack>
    </Paper>
  );
}
