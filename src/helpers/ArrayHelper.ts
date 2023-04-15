function findIndex(array: any, predicate: any) {
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) {
      return i;
    }
  }
  return -1;
}
const ArrayHelper = {
  findIndex,
};

export default ArrayHelper;
