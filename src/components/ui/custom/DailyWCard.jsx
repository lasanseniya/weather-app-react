import PropTypes from "prop-types";

import Lottie from "lottie-react";

// Importing weather icon json files
import rainIcon from "../../../assets/rain.json";
import sunnyIcon from "../../../assets/sunny.json";
import thunderstormIcon from "../../../assets/thunderstorm.json";
import snowingIcon from "../../../assets/snowy.json";
import drizzleIcon from "../../../assets/drizzle.json";
import cloudIcon from "../../../assets/cloudy.json";

/**
 * @description Renders a daily weather card component.
 *
 * @component
 * @param {Object} props - propserties of the component
 * @param {string} props.day - Day of the week.
 * @param {string} props.condition - Weather condition.
 * @returns {JSX.Element} Rendered DailyWCard component.
 */
function DailyWCard(props) {
  const { day, condition } = props; // Destructuring props

  // Corresponding weather icons mapped to weather conditions
  const weatherConditions = {
    Rain: rainIcon,
    Clear: sunnyIcon,
    Snow: snowingIcon,
    Drizzle: drizzleIcon,
    Thunderstorm: thunderstormIcon,
    Clouds: cloudIcon,
  };

  return (
    <div className="flex-1 place-content-center grid grid-cols-1 grid-rows-3 border bg-gradient-to-b from-[#231b67] to-[#27282c] border-slate-300 rounded-[10px]">
      <div className="flex-1 place-self-center">
        <p className="text-xs sm:text-sm font-normal">{day}</p>
      </div>
      <div className="flex-1 place-self-center">
        <Lottie
          animationData={weatherConditions[condition]} // accessing the weather icon via the condition
          className="size-[29px] sm:size-10 md:size-14"
        />
      </div>
      <div className="flex-1 place-self-center">
        <p className="text-sm font-normal">{condition}</p>
      </div>
    </div>
  );
}

// Props validations for DailyWCard component
DailyWCard.propTypes = {
  day: PropTypes.string,
  icon: PropTypes.element,
  condition: PropTypes.string,
};

export default DailyWCard;
