/**
 * @name DateConverter
 * @description - Utility method for coverting a date to MM/DD/YYYY format
 * @param {string} date date to be converted
 */
export default function convertDateToMMDDYYYY(date) {
  const dateObject = new Date(date);
  const utcYear = dateObject.getUTCFullYear();
  const utcMonth = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
  const utcDay = String(dateObject.getUTCDate()).padStart(2, '0');
  return `${utcMonth}/${utcDay}/${utcYear}`;
}
