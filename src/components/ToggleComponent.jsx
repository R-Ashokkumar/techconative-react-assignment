import React, { useContext } from "react";
import { Switch, Typography, Stack } from "@mui/material";
import { WeatherContext } from "../App";

export default function ToggleComponent({ toggled, setToggled }) {
  const { weatherPortalState, weatherDispatch } = useContext(WeatherContext);
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Typography>Celsius</Typography>
        <Switch
          checked={toggled}
          onChange={(e) =>
            weatherDispatch({
              type: "UPDATE_TOGGLE_STATE",
              toggled: e.target.checked,
            })
          }
        />
        <Typography>Fahrenheit</Typography>
      </Stack>
    </>
  );
}
