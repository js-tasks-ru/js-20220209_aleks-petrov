/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const objTemp = new Object();
  for (const iterator of fields) {
    if (obj.hasOwnProperty(iterator)) {
      objTemp[iterator] = obj[iterator];
    }
  }
  return objTemp;
};
