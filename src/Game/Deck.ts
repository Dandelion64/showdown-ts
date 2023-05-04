import Card from './Card'
import Player from '../Players/Player'
import { requireNonNullishCard } from '../Utils/Validation'

class Deck {
  private readonly cards: Card[] = []

  public constructor() {
    this.initCards()
  }

  public dealCard(players: Player[]): void {
    const PLAYER_CARDS = 13
    for (let i = 0; i < PLAYER_CARDS; ++i) {
      for (const player of players) {
        const card = this.drawCard()
        player.addHand(card)
      }
    }
  }

  public drawCard(): Card {
    const card = requireNonNullishCard(this.cards.pop())
    return card
  }

  public shuffle(): void {
    const DECK_CARDS = this.cards.length
    // swap shuffle
    const SWAP_TIMES = 4
    for (let i = 0; i < SWAP_TIMES; ++i) {
      for (let j = 0; j < DECK_CARDS; ++j) {
        const randomNumber = j + Math.floor(Math.random() * (52 - j))
        this.swapCard(j, randomNumber)
      }
    }
    // fold shuffle
    const FOLD_TIMES = 20
    for (let i = 0; i < FOLD_TIMES; ++i) {
      const startIndex = 1 + ((Math.random() * (DECK_CARDS - 1)) | 0)
      const thickness = (Math.random() * (DECK_CARDS - startIndex)) | 0
      const fold = this.cards.splice(startIndex, thickness)
      this.cards.push(...fold)
    }
  }

  public swapCard(indexA: number, indexB: number): void {
    const temp = this.cards[indexA]
    this.cards[indexA] = this.cards[indexB]
    this.cards[indexB] = temp
  }

  public initCards(): void {
    const RANKS = 13
    const SUITS = 4
    for (let i = 0; i < RANKS; ++i) {
      for (let j = 0; j < SUITS; ++j) {
        const card = new Card(i, j)
        this.cards.push(card)
      }
    }
  }
}

export default Deck
