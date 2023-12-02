export class UsernameGenerate {
  readonly #baseFirst: string[] = [
    'flawless',
    'majestic',
    'fearless',
    'fierce',
    'brave',
    'bold',
    'daring',
    'courageous',
    'valiant',
    'heroic',
    'dashing',
    'dauntless',
    'stalwart',
    'staunch',
  ]

  readonly #baseSecond: string[] = [
    'warrior',
    'fighter',
    'champion',
    'conqueror',
    'victor',
    'hero',
    'protector',
    'guardian',
    'defender',
    'sentinel',
    'paladin',
    'knight',
    'gladiator',
    'mercenary',
  ]

  constructor() {}

  baseUsername(): string {
    const first = this.#baseFirst[Math.floor(Math.random() * this.#baseFirst.length)]
    const second = this.#baseSecond[Math.floor(Math.random() * this.#baseSecond.length)]
    return `${first}_${second}`
  }

  generate(): string {
    const base = this.baseUsername()
    const date = new Date().getTime()
    const random = Math.floor(Math.random() * 1000)
    return `${base}${date}${random}`
  }
}
