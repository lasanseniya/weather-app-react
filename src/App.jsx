import "./App.css";
import { useState, useEffect } from "react";

// Custom Components
import SearchBar from "./components/ui/custom/SearchBar";
import DailyWCard from "./components/ui/custom/DailyWCard";
import SecondaryInfo from "./components/ui/custom/SecondaryInfoCard";
import OtherInfoCard from "./components/ui/custom/OtherInfoCard";
import MainInfoCard from "./components/ui/custom/MainInfoCard";

// Services
import { fetchDailyWeather, fetchWeatherViaCity } from "./services/apiService";
import { unixToDateTime } from "./utils/unixConverter";

// React toast message
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null); // Current weather data

  const [dailyWeather, setDailyWeather] = useState(null); // Daily weather data

  const [dailyWeatherFetched, setDailyWeatherFetched] = useState(false); // Flag to check if daily weather data is fetched

  const [unitType, setUnitType] = useState("metric"); // Unit type for the weather data

  const [location, setLocation] = useState("California"); // Location for the weather data

  /**
   * @description Handles the change of unit type.
   *
   * @param {string} unitType - The new unit type.
   */
  const handleUnitTypeChange = (unitType) => {
    setLocation(currentWeather?.name);
    setUnitType(unitType);
  };

  /**
   * Handles the search query and updates the location.
   * @param {string} query - The search query entered by the user.
   * @returns {Promise<void>}
   */
  const handleSearchQuery = async (query) => {
    const regex = /[^\w\s,]/; // detect special characters

    if (query.trim() === "") {
      // React toast message configuration for empty input
      toast.warning("Please enter a City name or a ZIP code.");
    } else if (regex.test(query)) {
      // React toast message configuration for invalid characters
      toast.warning("Invalid characters. Please try again.");
    } else {
      setLocation(query);
    }
  };

  // Fetch weather data based each time the location or  unit type changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherData = await fetchWeatherViaCity(location, unitType);
        setCurrentWeather(weatherData);
        setDailyWeatherFetched(false);
      } catch (error) {
        // React toast message configuration
        toast.warning(error);
      }
    };

    fetchData();
  }, [location, unitType]);

  // Fetch daily weather data each time the current weather data is fetched
  useEffect(() => {
    // Fetch daily weather data if current weather data is available and daily weather data is not fetched
    if (currentWeather && !dailyWeatherFetched) {
      const fetchDailyData = async () => {
        try {
          const dailyWeatherData = await fetchDailyWeather(
            currentWeather.coord.lat,
            currentWeather.coord.lon
          );
          setDailyWeather(dailyWeatherData);
          setDailyWeatherFetched(true);
        } catch (error) {
          // React toast message configuration
          toast(error);
        }
      };
      fetchDailyData();
    }
  }, [currentWeather, dailyWeather, dailyWeatherFetched]);

  return (
    <>
      <div className="flex-1 justify-center">
        <SearchBar onSearch={handleSearchQuery} />
      </div>
      <div className="basis-2/3 flex p-4 flex-col md:flex-row w-[calc(100vw-4rem)] gap-4 sm:w-[calc(100vw-10rem)] lg:w-[calc(100vw-22rem)]">
        <div className="basis-2/3 flex sm:space-x-3 space-x-2">
          {/*MAIN CARD - DATE, TEMPERATURE, LOCATION, SUNRISE AND SUNSET*/}
          <MainInfoCard
            location={
              `${currentWeather?.name}, ${currentWeather?.sys.country}` || "N/A"
            }
            temp={
              `${Math.round(currentWeather?.main?.temp, 2)} ${
                unitType === "metric" ? "°C" : "°F"
              }` || "N/A"
            }
            date={unixToDateTime(currentWeather?.dt).date}
            condition={`${currentWeather?.weather[0]?.main}`}
            sunrise={unixToDateTime(currentWeather?.sys?.sunrise).time}
            sunset={unixToDateTime(currentWeather?.sys?.sunset).time}
            unitType={unitType}
            onUnitTypeChange={handleUnitTypeChange}
          />
          <div className="basis-2/5">
            <div className="grid grid-cols-2 grid-rows-2 h-full place-items-center bg-gradient-to-b from-[#3a45c1] to-[#161141] border border-slate-300 rounded-lg">
              {/* HUMIDITY, PRESSURE ,WIND SPEED, VISIBILITY */}

              <OtherInfoCard
                text="Humidity"
                value={`${currentWeather?.main?.humidity}%` || "NA"}
              />
              <OtherInfoCard
                text="Pressure"
                value={`${currentWeather?.main?.pressure}hPa` || "N/A"}
              />
              <OtherInfoCard
                text="Wind"
                value={
                  `${currentWeather?.wind.speed} ${
                    unitType === "metric" ? "m/s" : "mph"
                  }` || "N/A"
                }
              />
              <OtherInfoCard
                text="Visibility"
                value={`${currentWeather?.visibility / 1000}km` || "N/A"}
              />
            </div>
          </div>
        </div>
        <div className="md:w-48">
          <div className="grid grid-rows-6 grid-cols-1 h-full w-full space-x-2">
            {/*SECONDARY INFO CONTAINER - WEATHER CONDITION, FEELS LIKE, TEMP(MIN/MAX), LATITUDE, LONGITUDE*/}
            <SecondaryInfo
              value={`${currentWeather?.weather[0]?.main}`}
              description="Weather"
            />
            <SecondaryInfo
              value={`${currentWeather?.main?.feels_like} ${
                unitType === "metric" ? "°C" : "°F"
              }`}
              description="Feels like"
            />
            <SecondaryInfo
              value={`${currentWeather?.main?.temp_min} ${
                unitType === "metric" ? "°C" : "°F"
              }`}
              description="Temp min"
            />
            <SecondaryInfo
              value={`${currentWeather?.main?.temp_max} ${
                unitType === "metric" ? "°C" : "°F"
              }`}
              description="Temp max"
            />
            <SecondaryInfo
              value={`${currentWeather?.coord?.lat}`}
              description="Latitude"
            />
            <SecondaryInfo
              value={`${currentWeather?.coord?.lon}`}
              description="Longitude"
            />
          </div>
        </div>
      </div>
      <div className="basis-1/3 w-[calc(100vw-2rem)] sm:w-[calc(100vw-10rem)] flex space-x-5">
        {/*DAILY WEATHER FORECAST UPTO 5 DAYS*/}
        <DailyWCard
          day={`${unixToDateTime(dailyWeather?.list[2]?.dt).day}`}
          condition={`${dailyWeather?.list[2]?.weather[0]?.main}` || "N/A"} // upcoming day 1 weather condition
        />
        <DailyWCard
          day={`${unixToDateTime(dailyWeather?.list[10]?.dt).day}`}
          condition={`${dailyWeather?.list[10]?.weather[0]?.main}` || "N/A"} // upcoming day 2 weather condition
        />
        <DailyWCard
          day={`${unixToDateTime(dailyWeather?.list[18]?.dt).day}`}
          condition={`${dailyWeather?.list[18]?.weather[0]?.main}` || "N/A"} // upcoming day 3 weather condition
        />
        <DailyWCard
          day={`${unixToDateTime(dailyWeather?.list[26]?.dt).day}`}
          condition={`${dailyWeather?.list[26]?.weather[0]?.main}` || "N/A"} // upcoming day 4 weather condition
        />
        <DailyWCard
          day={`${unixToDateTime(dailyWeather?.list[34]?.dt).day}`}
          condition={`${dailyWeather?.list[34]?.weather[0]?.main}` || "N/A"} // upcoming day 5 weather condition
        />
      </div>
      {/* Sonner Toaster configuration */}
      <Toaster
        position="top-right"
        richColors
        expand={true}
        toastOptions={{
          style: {
            width: "auto",
          },
          className: "class",
        }}
      />
    </>
  );
}

export default App;
