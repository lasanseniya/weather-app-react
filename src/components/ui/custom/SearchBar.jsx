import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { useState } from "react";
import PropTypes from "prop-types";
import { fetchLocation } from "@/services/apiService";

/**
 * @description SearchBar component for searching weather by city/ZIP.
 *
 * @component
 * @param {Object} props - Component's properties.
 * @param {Function} props.onSearch - Function to be called when a search is performed.
 * @returns {JSX.Element} SearchBar component.
 */
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleCurrentLocation = (currentLocation) => {
    onSearch(currentLocation);
  };

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await fetchLocation(latitude, longitude);
      const locationName = response[0]?.name || "";
      handleCurrentLocation(locationName);
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center space-x-1">
        <div className="relative items-center basis-4/6 flex ">
          <Input
            type="text"
            placeholder="Search by city or ZIP..."
            className="w-80 border border-[#cdcdcd] text-slate-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute right-1">
            <Button size="icon" onClick={handleSearch}>
              <FaSearch />
            </Button>
          </div>
        </div>
        <div className="basis-2/6 flex self-center">
          <Button size="sm" className="space-x-1" onClick={getCurrentLocation}>
            <FaLocationCrosshairs />
            <p className="hidden sm:block text-slate-200">current location</p>
          </Button>
        </div>
      </div>
    </>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchBar;
