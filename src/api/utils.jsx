import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://api.openweathermap.org",
});

export const apiKey = "392cbd6c44b6fc8c6552c48239d85471";
