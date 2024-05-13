import axios from "axios";

// OpenWeatherMap API key
const API_KEY = "342a6e4c45ca3a3ca135f793af56df6e";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_URL = "http://api.openweathermap.org/geo/1.0/";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    // Handle specific errors and return corresponding error codes
    if (error.response) {
      // The request was made and the server responded with a status code
      const statusCode = error.response.status;
      if (statusCode === 404) {
        throw new Error("City not found", 404);
      } else {
        throw new Error(
          `Request failed with status code ${statusCode}`,
          statusCode
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server", 500);
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error("Error setting up request", 500);
    }
  }
};

const fetchWeatherViaCity = async (query, unitType) => {
  const url = `${WEATHER_URL}weather?q=${query.trim()}&appid=${API_KEY}&units=${unitType}`;
  return fetchData(url);
};

const fetchDailyWeather = async (latitude, longitude) => {
  const url = `${WEATHER_URL}forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
  return fetchData(url);
};

const fetchLocation = async (latitude, longitude) => {
  const url = `${GEO_URL}reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
  return fetchData(url);
};

export { fetchWeatherViaCity, fetchLocation, fetchDailyWeather };
