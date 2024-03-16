export function allItemsEqual(arr, arr2) {
  if (!Array.isArray(arr) || !Array.isArray(arr2))
    throw new Error("Both arguments must be arrays");
  if (arr.length !== arr2.length) return false;
  return arr.every((item, index) => Object.is(item, arr2[index]));
}
