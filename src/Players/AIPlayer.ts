import Player from './Player'
import { requireNonNullishCard, requireNonNullishPlayer } from '../Utils/Validation'

class AIPlayer extends Player {
  private static aiPlayerNumber: number = 1

  public constructor() {
    super()
    this.initName()
  }

  public executeTurn(): void {
    this.makeDecisionExchangeHand()
    this.handleExchangeHand()
    this.playCard()
  }

  protected playCard(): void {
    // possibilities for every card are the same
    const cards = this.hand.getCards()
    const randomIndex = Math.floor(Math.random() * cards.length)
    const card = requireNonNullishCard(cards[randomIndex])
    // or you can use splice()
    const newCards = [...cards.slice(0, randomIndex), ...cards.slice(randomIndex + 1)]
    this.hand.setCards(newCards)
    this.game.getBoard().addCard(card)
  }

  protected makeDecisionExchangeHand(): void {
    if (this.decisionExchangeHandsUsed === false) {
      // possibilities for yes/no: 16%
      const randomNumber = Math.floor(Math.random() * 100) - 83
      if (randomNumber > 0) {
        const choices: Player[] = []
        const players = this.getGame().getPlayers()
        for (const player of players) {
          if (player !== this) {
            choices.push(player)
          }
        }
        // possibilities for exchangee are the same
        const randomIndex = Math.floor(Math.random() * 3)
        const exchangee = requireNonNullishPlayer(choices[randomIndex])
        this.exchangeHandExecute(this, exchangee)
      }
    }
  }

  protected initName(): void {
    this.setName(`AI PLAYER ${AIPlayer.aiPlayerNumber}`)
    this.addAIPlayerNumber()
  }

  private addAIPlayerNumber(): void {
    AIPlayer.aiPlayerNumber++
  }
}

export default AIPlayer
