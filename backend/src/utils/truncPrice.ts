export default function truncateToThreeDecimals(number: number): string {
  const [integerPart, fractionalPart] = number.toString().split(".");
  const lastThreeDigits = integerPart.slice(-3);
  const resultString = lastThreeDigits + "K." + (fractionalPart || "0");
  const [integerPartResult, fractionalPartResult] = resultString.split(".");
  const truncatedFractionalPart = fractionalPartResult.substring(0, 2);
  return `${integerPartResult}.${truncatedFractionalPart}`;
}
