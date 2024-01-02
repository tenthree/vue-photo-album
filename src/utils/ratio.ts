export type RatioSize = {
  width: number
  height: number
}

export default function ratio({ width, height }: RatioSize) {
  return width / height
}
