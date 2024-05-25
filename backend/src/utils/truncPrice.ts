export default function truncateToThreeDecimals(number: number): number {
  return parseFloat(number.toFixed(3));
}
