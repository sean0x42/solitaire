/**
 * Shuffles an array in place, using the Fisher-Yates method.
 * See: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 */
export function shuffle<T>(array: T[]): void {
  for (let idx = array.length - 1; idx > 0; idx--) {
    const rand = Math.floor(Math.random() * (idx + 1));
    [array[idx], array[rand]] = [array[rand], array[idx]];
  }
}
