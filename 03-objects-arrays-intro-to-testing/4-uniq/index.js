/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr = []) {
  let resultArr = [];
  for (const item of arr) {
    if (!resultArr.includes(item)) {
      resultArr.push(item);
    }
  }
  return resultArr;
}
