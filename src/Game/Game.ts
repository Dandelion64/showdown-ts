import CommandLineInterface from './CommandLineInterface'
import Player from '../Players/Player'
import Board from './Board'
import Deck from './Deck'
import Card from './Card'
import { requireNonNullishPlayer } from '../Utils/Validation'

class Game {
  private readonly name: string = 'Showdown'
  private readonly cli: CommandLineInterface = new CommandLineInterface()
  private readonly players: Player[] = []
  private readonly deck: Deck = new Deck()
  private readonly board: Board = new Board()
  private round: number = 1

  public async start(): Promise<void> {
    this.cli.printGameTitle(this.name)
    await this.namePlayers()
    this.shuffleDeck()
    this.dealCards()
    this.sortPlayersHand()
    await this.executeRounds()
    this.cli.printWinner(this.findGameWinner())
    this.cli.printGameOver()
  }

  private findGameWinner(): Player {
    let winner
    const players = this.getPlayers()
    for (const player of players) {
      if (!winner) winner = player
      if (player.getPoint() > winner.getPoint()) {
        winner = player
      }
    }
    winner = requireNonNullishPlayer(winner)
    return winner
  }

  private async executeRounds(): Promise<void> {
    const ROUNDS = 13
    for (; this.round <= ROUNDS; ++this.round) {
      this.cli.onRoundStart(this.round)
      await this.executeTurns()
      this.showdown()
      this.executeExchangeHands()
      this.clearBoard()
    }
  }

  private clearBoard(): void {
    this.board.clearCards()
    this.board.clearExchangeHandWaitList()
  }

  private executeExchangeHands(): void {
    if (this.board.getExchangeHandWaitList().length > 0) {
      this.cli.onExchangeHandExecuted()
      this.board.executeExchangeHands()
    }
  }

  private showdown(): Player {
    const copyCards = this.board.getCards().slice()
    this.board.sortCards()
    const strongestCard = this.board.getCards()[0]
    const _winner = this.findRoundWinner(copyCards, strongestCard)
    const winner = requireNonNullishPlayer(_winner)
    this.cli.onShowdown(winner)
    winner.addPoint()
    return winner
  }

  private findRoundWinner(copyCards: Card[], strongestCard: Card): Player | undefined {
    const players = this.getPlayers()
    for (let i = 0; i < players.length; ++i) {
      if (copyCards[i] !== strongestCard) continue
      return players[i]
    }
  }

  private async executeTurns(): Promise<void> {
    for (const player of this.players) {
      await player.executeTurn()
    }
  }

  public getBoard(): Board {
    return this.board
  }

  private sortPlayersHand(): void {
    for (const player of this.players) {
      player.getHand().sortHand()
    }
  }

  private dealCards(): void {
    this.deck.dealCard(this.players)
  }

  private shuffleDeck(): void {
    this.deck.shuffle()
  }

  private async namePlayers(): Promise<void> {
    for (const player of this.players) {
      await player.nameItself()
    }
  }

  public addPlayer(player: Player): void {
    this.players.push(player)
  }

  public getPlayers(): Player[] {
    return this.players
  }

  public getCli(): CommandLineInterface {
    return this.cli
  }
}

export default Game
