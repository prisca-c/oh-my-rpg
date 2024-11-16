export namespace Numbers {
  export function random(min: number, max: number, decimalPlaces = 0): number {
    return Number.parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces))
  }
}
