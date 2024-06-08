export function takeLast<T>(array: T[], index: number): T[] {
  const toTake = array.length - index;
  return array.splice(index, toTake);
}
