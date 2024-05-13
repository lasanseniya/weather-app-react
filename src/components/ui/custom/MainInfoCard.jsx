import { WiSunrise, WiSunset } from "react-icons/wi";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import Lottie from "lottie-react";
import rainIcon from "../../../assets/rain.json";
import sunnyIcon from "../../../assets/sunny.json";
import thunderstormIcon from "../../../assets/thunderstorm.json";
import snowingIcon from "../../../assets/snowy.json";
import drizzleIcon from "../../../assets/drizzle.json";
import cloudIcon from "../../../assets/cloudy.json";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * @description MainInfoCard component displays the main weather info.
 *
 * @component
 * @param {Object} props - Component propserties.
 * @param {string} props.unitType - The unit type for temperature and wind speed.
 * @param {function} props.onUnitTypeChange - The function to handle unit type change.
 * @param {string} props.condition - Weather condition.
 * @param {number} props.temp - Temperature.
 * @param {string} props.date - Date.
 * @param {string} props.location - Location.
 * @param {string} props.sunrise - Sunrise time.
 * @param {string} props.sunset - Sunset time.
 * @returns {JSX.Element} Rendered MainInfoCard component.
 */
function MainInfoCard({ unitType, onUnitTypeChange, ...props }) {
  const { condition, temp, date, location, sunrise, sunset } = props;

  const handleUnitTypeChange = (newUnitType) => {
    onUnitTypeChange(newUnitType);
  };

  /**
   * Corresponding weather conditions and icons
   * @type {Object}
   */
  const weatherConditions = {
    Rain: rainIcon,
    Clear: sunnyIcon,
    Snow: snowingIcon,
    Drizzle: drizzleIcon,
    Thunderstorm: thunderstormIcon,
    Clouds: cloudIcon,
  };

  return (
    <div className="basis-3/5 border flex flex-col bg-gradient-to-b from-[#3a45c1] to-[#161141] border-slate-300 rounded-lg">
      <div className="basis-1/6 flex flex-row place-items-center">
        <div className="flex-1 py-0 px-4">
          <p className="text-xs sm:text-sm">{location}</p>
        </div>
        <div className="flex-1 flex place-content-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-12 sm:w-auto h-6 text-xs sm:text- sm:font-normal">
                {unitType}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Select unit type</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={unitType}
                onValueChange={handleUnitTypeChange}
              >
                <DropdownMenuRadioItem value="metric" className="text-xs">
                  Metric: °C, m/s
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="imperial" className="text-xs">
                  Imperial: °F, mph
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="basis-3/6 flex flex-col place-items-center">
        <div className="basis-2/3 flex place-items-center">
          <div className="size-12 sm:size-20">
            <Lottie animationData={weatherConditions[condition]} />
          </div>
          <div className="">
            <span className="text-4xl sm:text-5xl font-bold">{temp}</span>
          </div>
        </div>
        <div className="basis-1/3 place-content-center">
          <p className="text-[11px] sm:text-sm">{date}</p>
        </div>
      </div>
      <div className="basis-2/6 grid grid-cols-2 grid-rows-1 place-items-center">
        <div className="flex flex-col place-items-center">
          <div>
            <WiSunrise className="size-[25px]" />
          </div>
          <div className=" text-xs">sunrise</div>
          <div className=" text-xs font-semibold">{sunrise}</div>
        </div>
        <div className="flex flex-col place-items-center">
          <div>
            <WiSunset className="size-[25px]" />
          </div>
          <div className=" text-xs">sunset</div>
          <div className=" text-xs font-semibold">{sunset}</div>
        </div>
      </div>
    </div>
  );
}

// Props validation for MainInfoCard component
MainInfoCard.propTypes = {
  location: PropTypes.string,
  condition: PropTypes.string,
  temp: PropTypes.string,
  date: PropTypes.string,
  sunrise: PropTypes.string,
  sunset: PropTypes.string,
  unitType: PropTypes.string,
  onUnitTypeChange: PropTypes.func,
};

export default MainInfoCard;
