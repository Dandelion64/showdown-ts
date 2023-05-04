import Player from '../Players/Player'
import { requireNonNullishPlayer } from '../Utils/Validation'

class ExchangeHand {
  private countdown: number = 3
  private exchanger: Player
  private exchangee: Player

  public constructor(exchanger: Player, exchangee: Player) {
    this.setExchanger(exchanger)
    this.setExchangee(exchangee)
  }

  public execute(): void {
    const INITIAL_COUNTDOWN = 3
    const FINAL_COUNTDOWN = 0
    const DEDUCTION = 1
    const SWAP_COUNTDOWN = INITIAL_COUNTDOWN - DEDUCTION
    const SWAP_AGAIN_COUNTDOWN = FINAL_COUNTDOWN - DEDUCTION
    if (this.countdown === SWAP_COUNTDOWN) {
      this.exchanger.getGame().getCli().onExchangeHandSwap(this)
    } else if (this.countdown === SWAP_AGAIN_COUNTDOWN) {
      this.exchanger.getGame().getCli().onExchangeHandSwapAgain(this)
    }
    this.swapHand(this.exchanger, this.exchangee)
  }

  private swapHand(exchanger: Player, exchangee: Player): void {
    const temp = exchanger.getHand()
    exchanger.setHand(exchangee.getHand())
    exchangee.setHand(temp)
  }

  public updateCountdown(): void {
    this.countdown--
  }

  public getCountdown(): number {
    return this.countdown
  }

  private setExchangee(exchangee: Player): void {
    this.exchangee = requireNonNullishPlayer(exchangee)
  }

  public getExchangee(): Player {
    return this.exchangee
  }

  private setExchanger(exchanger: Player): void {
    this.exchanger = requireNonNullishPlayer(exchanger)
  }

  public getExchanger(): Player {
    return this.exchanger
  }
}

export default ExchangeHand
