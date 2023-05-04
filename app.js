const Showdown = require('./dist/showdown.js')

const { Game, HumanPlayer } = Showdown

const game = new Game()
const player = new HumanPlayer()

player.joinGame(game)
player.addAIPlayer()
player.addAIPlayer()
player.addAIPlayer()

game.start()
