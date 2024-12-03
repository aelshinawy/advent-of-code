export const binaryInsert = (array: number[], value: number): void => {
    let low = 0, high = array.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (array[mid] <= value) low = mid + 1;
      else high = mid;
    }
    array.splice(low, 0, value);
};