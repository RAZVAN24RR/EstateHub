export default function truncateToThreeDecimals(number: number): string {
  // Split the number into integer and fractional parts
  const [integerPart, fractionalPart] = number.toString().split(".");

  // Extract the last three digits of the integer part
  const lastThreeDigits = integerPart.slice(-3);

  // Combine the last three digits with 'K' and the fractional part
  const resultString = lastThreeDigits + "K." + (fractionalPart || "0");

  // Truncate the fractional part to two decimal places if needed
  const [integerPartResult, fractionalPartResult] = resultString.split(".");
  const truncatedFractionalPart = fractionalPartResult.substring(0, 2);

  return `${integerPartResult}.${truncatedFractionalPart}`;
}
