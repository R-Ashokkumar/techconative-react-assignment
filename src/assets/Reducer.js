import {
  FETCH_SUCCESS,
  FETCH_FAILURE,
  UPDATE_TOGGLE_STATE,
  UPDATE_CONDITIONAL_OPERATOR_STATE,
  FILTER_BASED_ON_MAX_TEMP,
  FILTER_BASED_ON_MIN_TEMP,
} from "./ActionConstants";

export const reducer = (state, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      return {
        ...state,
        main: {
          ...state.main,
          isLoading: false,
          weatherData: action.payload,
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
      };
    }
    case FETCH_FAILURE:
      return {
        ...state,
        main: {
          ...state.main,
          isLoading: false,
          weatherData: [],
          error: action.error,
        },
      };
    case UPDATE_TOGGLE_STATE:
      return {
        ...state,
        toggledFahrenheit: action.toggled,
      };
    case FILTER_BASED_ON_MIN_TEMP: {
      const { weatherData } = state.main;

      if (action.operator && action.filterValue) {
        let filteredData = [];
        if (action.operator == "LT")
          filteredData = weatherData.filter(
            (data) => data.main.temp_min < parseInt(action.filterValue)
          );
        else if (action.operator == "GT")
          filteredData = weatherData.filter(
            (data) => data.main.temp_min > parseInt(action.filterValue)
          );

        return {
          ...state,
          filter: {
            ...state.filter,
            filtered: true,
            minFilter: {
              active: true,
              filteredData,
            },
          },
        };
      } else {
        return {
          ...state,
          filter: {
            ...state.filter,
            filtered: state.filter.maxFilter.active,
            minFilter: {
              active: false,
              filteredData: [],
            },
          },
        };
      }
    }
    case FILTER_BASED_ON_MAX_TEMP: {
      const { weatherData } = state.main;
      if (action.operator && action.filterValue) {
        let filteredData = [];
        if (action.operator == "LT") {
          filteredData = weatherData.filter(
            (data) => data.main.temp_max < parseInt(action.filterValue)
          );
        } else if (action.operator == "GT") {
          filteredData = weatherData.filter(
            (data) => data.main.temp_max > parseInt(action.filterValue)
          );
        }
        return {
          ...state,
          filter: {
            ...state.filter,
            filtered: true,
            maxFilter: {
              active: true,
              filteredData,
            },
          },
        };
      } else {
        return {
          ...state,
          filter: {
            ...state.filter,
            filtered: state.filter.minFilter.active,
            maxFilter: {
              active: false,
              filteredData: [],
            },
          },
        };
      }
    }
    case UPDATE_CONDITIONAL_OPERATOR_STATE:
      return {
        ...state,
        filter: {
          ...state.filter,
          conditionalOperator: action.conditionalOperator,
        },
      };
    default:
      return state;
  }
};
