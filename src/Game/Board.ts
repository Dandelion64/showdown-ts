import Card from './Card'
import ExchangeHand from './ExchangeHand'

class Board {
  private cards: Card[] = []
  private exchangeHandWaitList: ExchangeHand[] = []

  public sortCards(): void {
    this.cards.sort((a, b) => {
      if (a.getRank() > b.getRank()) {
        return -1
      }
      if (a.getRank() < b.getRank()) {
        return 1
      }
      if (a.getSuit() > b.getSuit()) {
        return -1
      }
      return 1
    })
  }

  public executeExchangeHands(): void {
    for (const exchangeHand of this.exchangeHandWaitList) {
      exchangeHand.execute()
    }
  }

  public clearExchangeHandWaitList(): void {
    this.exchangeHandWaitList = []
  }

  public addExchangeHand(exchangeHand: ExchangeHand): void {
    this.exchangeHandWaitList.push(exchangeHand)
  }

  public getExchangeHandWaitList(): ExchangeHand[] {
    return this.exchangeHandWaitList
  }

  public clearCards(): void {
    this.cards = []
  }

  public addCard(card: Card): void {
    this.cards.push(card)
  }

  public getCards(): Card[] {
    return this.cards
  }
}

export default Board
