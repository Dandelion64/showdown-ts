import Card from './Card'

class Hand {
  private cards: Card[] = []

  public sortHand(): void {
    this.cards.sort((a, b) => {
      if (a.getSuit() > b.getSuit()) {
        return 1
      }
      if (a.getSuit() < b.getSuit()) {
        return -1
      }
      if (a.getRank() > b.getRank()) {
        return 1
      }
      return -1
    })
  }

  public addCard(card: Card): void {
    this.cards.push(card)
  }

  public setCards(cards: Card[]): void {
    this.cards = cards
  }

  public getCards(): Card[] {
    return this.cards
  }
}

export default Hand
