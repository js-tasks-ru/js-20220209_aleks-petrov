/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrTemp = [...arr]
  return arrTemp.sort((a, b) => {
    if (param === 'asc') {
      return a.localeCompare(b, ['ru-RU', 'en-EN'], {caseFirst: "upper"}); // -1 0 1
    } else if (param === 'desc') {
      return b.localeCompare(a, ['ru-RU', 'en-EN'], {caseFirst: "upper"});
    } else { return 0; }
  });
}
