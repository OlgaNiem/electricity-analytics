export function calculateScore(price: number, temp: number): number {
  const normalizedPrice = Math.min(price, 15) / 15;
  const idealTemp = 18;
  const tempPenalty = Math.abs(temp - idealTemp) / 20;
  const score = 1 - (normalizedPrice * 0.7 + tempPenalty * 0.3);
  return Math.max(0, Math.min(1, score));
}
