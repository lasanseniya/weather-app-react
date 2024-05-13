import PropTypes from "prop-types";

/**
 * @description Displays secondary information (Weather condition / Feels like
 *               / Temp min / Temp max / Latitude / Longitude) in a card.
 *
 * @component
 * @param {Object} props - Properties of component.
 * @param {string} props.description - Description of the info.
 * @param {string} props.value - Value of the secondary information.
 * @returns {JSX.Element} - Rendered SecondaryInfoCard component.
 */
function SecondaryInfoCard(props) {
  const { description, value } = props; // Destructuring props

  return (
    <div className="place-content-center">
      <div className="w-20 md:w-full h-full md:h-auto md:p-1 place-content-center text-slate-200 grid grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1 bg-gradient-to-b from-[#231b67] to-[#27282c] border-slate-300 rounded-lg">
        <div className="flex-1 place-self-center p-1">
          <p className="text-xs font-normal">{description}</p>
        </div>
        <div className="flex-1 place-self-center">
          <p className="text-xs p-3 md:p-0 font-normal">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Prop validation for SecondaryInfoCard component
SecondaryInfoCard.propTypes = {
  description: PropTypes.string,
  value: PropTypes.string,
};

export default SecondaryInfoCard;
