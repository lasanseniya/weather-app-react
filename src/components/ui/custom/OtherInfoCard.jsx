import PropTypes from "prop-types";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { TiWeatherWindy } from "react-icons/ti";
import { GiInvisible } from "react-icons/gi";

/**
 * @description Renders an info card with icon, text, and value.
 *
 * @component
 * @param {Object} props - Component's properties.
 * @param {string} props.text - Text to be displayed on the card.
 * @param {string} props.value - Value to be displayed on the card.
 * @returns {JSX.Element} Rendered OtherInfoCard component.
 */
function OtherInfoCard(props) {
  const { text, value } = props; // Destructuring props

  // Mapping of info icons
  const infoIcons = {
    Humidity: <WiHumidity className="size-[24px]" />,
    Pressure: <WiBarometer className="size-[24px]" />,
    Wind: <TiWeatherWindy className="size-[24px]" />,
    Visibility: <GiInvisible className="size-[24px]" />,
  };

  return (
    <div className="grid grid-cols-1 grid-rows-3 place-items-center">
      <div>{infoIcons[text]}</div>
      <div className="text-[10px] sm:text-xs">{text}</div>
      <div className="text-[10px] sm:text-sm">{value}</div>
    </div>
  );
}

// Prop va
OtherInfoCard.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
};

export default OtherInfoCard;
