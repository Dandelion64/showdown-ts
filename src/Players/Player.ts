import CommandLineInterface from '../Game/CommandLineInterface'
import Game from '../Game/Game'
import Hand from '../Game/Hand'
import Card from '../Game/Card'
import ExchangeHand from '../Game/ExchangeHand'
import {
  checkIfDecisionExchangeHandsUsed,
  checkIfPlayersLessThanFour,
  requireNonNullishHand,
  requireNonNullishString,
} from '../Utils/Validation'

abstract class Player {
  protected name: string = ''
  protected cli: CommandLineInterface = new CommandLineInterface()
  protected game: Game
  protected hand: Hand = new Hand()
  protected exchangeHand: ExchangeHand | null
  protected decisionExchangeHandsUsed: boolean = false
  private point: number = 0

  public addPoint() {
    this.point++
  }

  public getPoint(): number {
    return this.point
  }

  public abstract executeTurn(): Promise<void> | void

  protected abstract playCard(): Promise<void> | void

  protected handleExchangeHand(): void {
    const INITIAL_COUNTDOWN = 3
    const FINAL_COUNTDOWN = 0
    if (this.exchangeHand) {
      const countdown = this.exchangeHand.getCountdown()
      if (countdown === INITIAL_COUNTDOWN || countdown === FINAL_COUNTDOWN) {
        this.getGame().getBoard().addExchangeHand(this.exchangeHand)
      }
      this.exchangeHand.updateCountdown()
    }
  }

  protected abstract makeDecisionExchangeHand(): Promise<void> | void

  protected exchangeHandExecute(exchanger: Player, exchangee: Player) {
    checkIfDecisionExchangeHandsUsed(exchanger.decisionExchangeHandsUsed)
    const exchangeHand = new ExchangeHand(exchanger, exchangee)
    this.exchangeHand = exchangeHand
    this.toggleDecisionExchangeHandsUsed()
  }

  private toggleDecisionExchangeHandsUsed(): void {
    this.decisionExchangeHandsUsed = !this.decisionExchangeHandsUsed
  }

  public addHand(card: Card): void {
    this.hand.addCard(card)
  }

  public setHand(hand: Hand): void {
    this.hand = requireNonNullishHand(hand)
  }

  public getHand(): Hand {
    return this.hand
  }

  public async nameItself(): Promise<void> {
    await this.cli.inputName(this)
  }

  public joinGame(game: Game): void {
    checkIfPlayersLessThanFour(game)
    this.game = game
    this.game.addPlayer(this)
  }

  public getGame(): Game {
    return this.game
  }

  protected abstract initName(): void

  public setName(name: string): void {
    this.name = requireNonNullishString(name)
  }

  public getName(): string {
    return this.name
  }
}

export default Player
