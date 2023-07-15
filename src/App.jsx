import "./App.css";
import React, { useEffect, useReducer } from "react";
import Card from "./components/Card";
import { Grid, Paper, Typography, Stack } from "@mui/material";
import ToggleComponent from "./components/ToggleComponent";
import FilterArea from "./components/FilterArea";
import { httpClient, apiKey } from "./api/utils";
import locationData from "./assets/Data";
import { reducer } from "./assets/Reducer";
import { FETCH_SUCCESS } from "./assets/ActionConstants";

const initialState = {
  main: {
    isLoading: true,
    weatherData: [],
    error: "",
  },
  filter: {
    filtered: false,
    minFilter: {
      active: false,
      filteredData: [],
    },
    maxFilter: {
      active: false,
      filteredData: [],
    },
    conditionalOperator: "and",
  },
  toggledFahrenheit: true,
};

export const WeatherContext = React.createContext();

function App() {
  const [state, dispath] = useReducer(reducer, initialState);

  useEffect(() => {
    Promise.all(
      locationData.map((location) =>
        httpClient.get(
          `/data/2.5/weather?lat=${location.lat}&lon=${
            location.long
          }&appid=${apiKey}&units=${
            state.toggledFahrenheit ? "imperial" : "metric"
          }`
        )
      )
    )
      .then((responses) => {
        const weatherData = responses.map((response) => response.data);
        dispath({ type: FETCH_SUCCESS, payload: weatherData });
      })
      .catch((error) => {
        dispath({ type: FETCH_FAILURE, error });
      });
  }, [state.toggledFahrenheit]);

  const getCombinedFilteredData = () => {
    const { minFilter, maxFilter } = state.filter;
    const combinedFilteredData = [];

    if (state.filter.conditionalOperator == "and") {
      if (minFilter.active && !maxFilter.active) {
        combinedFilteredData.push(...minFilter.filteredData);
      } else if (!minFilter.active && maxFilter.active) {
        combinedFilteredData.push(...maxFilter.filteredData);
      } else if (minFilter.active && maxFilter.active) {
        combinedFilteredData.push(
          ...minFilter.filteredData.filter((dataFromMin) => {
            return maxFilter.filteredData.some(
              (dataFromMax) => dataFromMax.name === dataFromMin.name
            );
          })
        );
      }
    } else if (state.filter.conditionalOperator == "or") {
      const { filteredData: minFilteredData } = minFilter;
      const { filteredData: maxFileteredData } = maxFilter;

      const combinedData = minFilteredData.concat(maxFileteredData);
      combinedFilteredData.push(...removeDuplicatesFromTheArray(combinedData));
    }

    return combinedFilteredData;
  };

  const removeDuplicatesFromTheArray = (inputArray) => {
    const resultArray = [];
    inputArray.forEach((inputData) => {
      !resultArray.some((data) => data.name === inputData.name) &&
        resultArray.push(inputData);
    });
    return resultArray;
  };

  return (
    <WeatherContext.Provider
      value={{ weatherPortalState: state, weatherDispatch: dispath }}
    >
      <Paper
        className="main-container"
        elevation={3}
        sx={{ p: "20px", width: 1200, minHeight: "100vh", mt: "20px" }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h3" component="div">
            Weather Portal
          </Typography>
          <ToggleComponent toggled={state.toggledFahrenheit} />
        </Stack>

        <FilterArea />

        <Grid container spacing={2} sx={{ mt: 0.25 }}>
          {state.main.isLoading ? (
            <Typography className="vertical-center" variant="h3">
              Loading
            </Typography>
          ) : state.main.error ? (
            <h3>{state.main.error}</h3>
          ) : state.filter.filtered ? (
            getCombinedFilteredData().map((weather) => (
              <Grid key={weather.name} item md={4} lg={3}>
                <Card weather={weather} />
              </Grid>
            ))
          ) : (
            state.main.weatherData.map((weather) => (
              <Grid key={weather.name} item md={4} lg={3}>
                <Card weather={weather} />
              </Grid>
            ))
          )}
        </Grid>
      </Paper>
    </WeatherContext.Provider>
  );
}
export default App;
