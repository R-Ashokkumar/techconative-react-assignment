import React, { useContext, useEffect, useState } from "react";
import { Stack, Typography, TextField } from "@mui/material";
import DropDown from "./DropDown";
import { WeatherContext } from "../App";
import {
  FILTER_BASED_ON_MIN_TEMP,
  FILTER_BASED_ON_MAX_TEMP,
} from "../assets/ActionConstants";

export default function FilterComponent({ attributeName }) {
  const [operator, setOperator] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const { _, weatherDispatch } = useContext(WeatherContext);

  useEffect(() => {
    if (attributeName == "Min") {
      weatherDispatch({
        type: FILTER_BASED_ON_MIN_TEMP,
        operator,
        filterValue,
      });
    } else if (attributeName == "Max") {
      weatherDispatch({
        type: FILTER_BASED_ON_MAX_TEMP,
        operator,
        filterValue,
      });
    }
  }, [filterValue, operator]);

  const handleDropDownChange = (event) => {
    setOperator(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography>{attributeName}</Typography>
      <DropDown operator={operator} handleChange={handleDropDownChange} />
      <TextField
        size="small"
        sx={{ width: 100 }}
        value={filterValue}
        onChange={handleFilterValueChange}
      ></TextField>
    </Stack>
  );
}
