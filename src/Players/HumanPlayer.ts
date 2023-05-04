import Player from './Player'
import AIPlayer from './AIPlayer'
import Card from '../Game/Card'
import { requireNonNullishCard, requireNonNullishPlayer } from '../Utils/Validation'

class HumanPlayer extends Player {
  private static humanPlayerNumber: number = 1

  public constructor() {
    super()
    this.initName()
  }

  public async executeTurn(): Promise<void> {
    await this.makeDecisionExchangeHand()
    this.handleExchangeHand()
    await this.playCard()
  }

  protected async playCard(): Promise<void> {
    const cardName = await this.cli.selectCard(this)
    const card = requireNonNullishCard(this.findAndPlayCard(cardName))
    this.game.getBoard().addCard(card)
  }

  private findAndPlayCard(cardName: string): Card | undefined {
    const [suit, rank] = cardName.split(' ')
    const cards = this.getHand().getCards()
    for (let i = 0; i < cards.length; ++i) {
      const card = cards[i]
      if (card.getSuitLiteral() !== suit || card.getRankLiteral() !== rank) continue
      // or you can use splice()
      const newCards = [...cards.slice(0, i), ...cards.slice(i + 1)]
      this.hand.setCards(newCards)
      return card
    }
  }

  protected async makeDecisionExchangeHand(): Promise<void> {
    if (this.decisionExchangeHandsUsed === false) {
      const decision = await this.cli.decideIfExchangeHand(this)
      if (decision === 'YES') {
        const exchangeeName = await this.cli.selectExchangee(this.game, this)
        const exchangee = requireNonNullishPlayer(this.findPlayer(exchangeeName))
        this.exchangeHandExecute(this, exchangee)
      }
    }
  }

  private findPlayer(name: string): Player | undefined {
    const players = this.getGame().getPlayers()
    for (const player of players) {
      if (name === player.getName()) {
        return player
      }
    }
  }

  protected initName(): void {
    this.setName(`HUMAN PLAYER ${HumanPlayer.humanPlayerNumber}`)
    this.addHumanPlayerNumber()
  }

  public addAIPlayer(): void {
    const aiPlayer = new AIPlayer()
    aiPlayer.joinGame(this.game)
  }

  private addHumanPlayerNumber(): void {
    HumanPlayer.humanPlayerNumber++
  }
}

export default HumanPlayer
