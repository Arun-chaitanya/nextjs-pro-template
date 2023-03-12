import _get from "lodash/get";

function comparator<T>(keys: string[], reverse: boolean = false) {
  const compare = (a: T, b: T, keys: string[]) => {
    let aVal = _get(a, keys[0]);
    let bVal = _get(b, keys[0]);
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();
    if (aVal < bVal) return reverse ? 1 : -1;
    else if (aVal > bVal) return reverse ? -1 : 1;
    else if (keys.length > 1) return compare(a, b, keys.slice(1));
    else return 0;
  };
  return (a: T, b: T) => compare(a, b, keys);
}

export default comparator;
