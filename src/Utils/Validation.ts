import Game from '../Game/Game'
import Player from '../Players/Player'
import Hand from '../Game/Hand'
import Card from '../Game/Card'

function checkIfDecisionExchangeHandsUsed(decisionExchangeHandsUsed: boolean): void {
  if (decisionExchangeHandsUsed === true) {
    throw new Error('A player can only decide to exchange hands with other player once.')
  }
}

function requireNonNullishPlayer(player: Player | undefined): Player {
  if (!player) {
    throw new Error('Player is required.')
  }
  return player
}

function requireNonNullishHand(hand: Hand | undefined): Hand {
  if (!hand) {
    throw new Error('Hand is required.')
  }
  return hand
}

function requireNonNullishCard(card: Card | undefined): Card {
  if (!card) {
    throw new Error('No cards in the deck to be drawn.')
  }
  return card
}

function checkIfPlayersLessThanFour(game: Game): void {
  if (game.getPlayers().length === 4) {
    throw new Error('This game hall is full.')
  }
}

function requireNonNullishString(string: string): string {
  if (!string) {
    throw new Error('This can not be nullish.')
  }
  return string
}

export {
  checkIfDecisionExchangeHandsUsed,
  requireNonNullishPlayer,
  requireNonNullishHand,
  requireNonNullishCard,
  checkIfPlayersLessThanFour,
  requireNonNullishString,
}
