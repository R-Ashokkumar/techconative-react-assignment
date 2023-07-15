import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/material";
export default function WeatherCard({ weather }) {
  return (
    <Box sx={{ width: 300 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            City : {weather.name}
          </Typography>
          <Typography variant="h6" component="div">
            Min : {weather.main.temp_min}
          </Typography>
          <Typography variant="h6" component="div">
            Max : {weather.main.temp_max}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
