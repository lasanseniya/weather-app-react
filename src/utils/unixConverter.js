import moment from "moment";

/**
 * @description Converts a Unix timestamp to date, time, and day.
 *
 * @param {number} unixTimeStamp - The Unix timestamp to convert.
 * @returns {Object} An object containing the converted date, time, and day.
 */
function unixToDateTime(unixTimeStamp) {
  var dateAndTime = new Date(unixTimeStamp * 1000); // convert to milliseconds

  const dateObject = dateAndTime.toDateString(); // returns the date in readable format
  const timeObject = moment(unixTimeStamp * 1000).format("HH:mm a"); // 24 hour format
  const dayObject = dateAndTime.getDay(); // returns 0-6

  // Day names
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Get the day name from the array
  const dayName = daysOfWeek[dayObject];

  return {
    date: dateObject.toString(),
    time: timeObject.toString(),
    day: dayName,
  };
}

export { unixToDateTime };
