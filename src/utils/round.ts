export default function round(value: number, digits = 0) {
  const factor = 10 ** digits
  const preciseValue = value + Number.EPSILON
  return Math.round(preciseValue * factor) / factor
}
