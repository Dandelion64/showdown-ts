import { blue, magenta } from 'colorette'
import * as figlet from 'figlet'
import { prompt } from 'enquirer'

import Game from './Game'
import Player from '../Players/Player'
import ExchangeHand from './ExchangeHand'

type Question = {
  type: string
  name: string
  message: string
  choices?: Answer[]
}

type Answer = {
  [key: string]: string
}

class CommandLineInterface {
  public async selectCard(player: Player) {
    const choices: Answer[] = []
    const cards = player.getHand().getCards()
    for (const card of cards) {
      const cardString = `${card.getSuitLiteral()} ${card.getRankLiteral()}`
      const choice: Answer = {
        name: cardString,
        message: cardString,
        value: cardString,
      }
      choices.push(choice)
    }
    const questions: Question[] = [
      {
        type: 'select',
        name: 'card',
        message: `[SYSTEM] Please select a card and play:`,
        choices: choices,
      },
    ]
    const answers: Answer = await prompt(questions)
    const cardName = answers.card
    this.onCardSelected(player)
    return cardName
  }

  public async selectExchangee(game: Game, exchanger: Player): Promise<string> {
    const choices: Answer[] = []
    const players = game.getPlayers()
    for (const player of players) {
      if (player !== exchanger) {
        const name = player.getName()
        const choice: Answer = {
          name: name,
          message: name,
          value: name,
        }
        choices.push(choice)
      }
    }
    const questions: Question[] = [
      {
        type: 'select',
        name: 'exchangee',
        message: `[SYSTEM] Select the player you want to exchange hand with:`,
        choices: choices,
      },
    ]
    const answers: Answer = await prompt(questions)
    const exchangeeName = answers.exchangee
    this.onExchangeeSelected(exchanger, exchangeeName)
    return exchangeeName
  }

  public async decideIfExchangeHand(player: Player): Promise<string> {
    const choices = [
      { name: 'YES', message: 'YES', value: 'YES' },
      { name: 'NO', message: 'NO', value: 'NO' },
    ]
    const questions: Question[] = [
      {
        type: 'select',
        name: 'decision',
        message: `[SYSTEM] Do ${player.getName()} want to exchange hand with any other player?`,
        choices: choices,
      },
    ]
    const answers: Answer = await prompt(questions)
    return answers.decision
  }

  public async inputName(player: Player): Promise<void> {
    const questions: Question[] = [
      {
        type: 'input',
        name: 'name',
        message: `[SYSTEM] Please give ${player.getName()} a name: (or just press enter)`,
      },
    ]
    const answers: Answer = await prompt(questions)
    if (answers.name !== '') {
      player.setName(answers.name)
    }
    this.onPlayerEnterGameHall(player)
  }

  public printWinner(winner: Player): void {
    console.log(`[SYSTEM] ${winner.getName()} WINS!`)
  }

  public printGameOver(): void {
    console.log(blue(figlet.textSync('GAME OVER')))
  }

  public printGameTitle(title: string): void {
    this.clearConsole()
    console.log(blue(figlet.textSync(title)))
  }

  public clearConsole(): void {
    console.clear()
  }

  public onShowdown(winner: Player): void {
    console.log(`[SYSTEM] ${winner.getName()} is the winner of the round!`)
  }

  private onCardSelected(player: Player): void {
    console.log(blue(`[PLAYER] ${player.getName()} play a card.`))
  }

  public onExchangeHandSwapAgain(exchangerHand: ExchangeHand): void {
    const exchangerName = exchangerHand.getExchanger().getName()
    const exchangeeName = exchangerHand.getExchangee().getName()
    console.log(magenta(`[BROADCAST] ${exchangerName} and ${exchangeeName} exchange their hands again.`))
  }

  public onExchangeHandSwap(exchangerHand: ExchangeHand): void {
    const exchangerName = exchangerHand.getExchanger().getName()
    const exchangeeName = exchangerHand.getExchangee().getName()
    console.log(magenta(`[BROADCAST] ${exchangerName} and ${exchangeeName} exchange their hands.`))
  }

  public onExchangeHandExecuted(): void {
    console.log('[SYSTEM] EXCHANGE HAND')
  }

  public onRoundStart(round: number): void {
    console.log(`[SYSTEM] ROUND: ${round}`)
  }

  private onExchangeeSelected(exchanger: Player, exchangeeName: string): void {
    console.log(blue(`[PLAYER] ${exchanger.getName()} will exchange hand with ${exchangeeName}.`))
  }

  private onPlayerEnterGameHall(player: Player): void {
    console.log(magenta(`[BROADCAST] ${player.getName()} enter the game hall.`))
  }
}

export default CommandLineInterface
