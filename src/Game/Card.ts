enum Rank {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE,
}

enum Suit {
  CLUB,
  DIAMOND,
  HEART,
  SPADE,
}

type PokerMap = {
  [key: string]: string
}

const suitMap: PokerMap = {
  CLUB: '\u2663',
  DIAMOND: '\u2666',
  HEART: '\u2665',
  SPADE: '\u2660',
}

const rankMap: PokerMap = {
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
  NINE: '9',
  TEN: '10',
  JACK: 'J',
  QUEEN: 'Q',
  KING: 'K',
  ACE: 'A',
}

class Card {
  private rank: number
  private suit: number
  private static suitMap: PokerMap = suitMap
  private static rankMap: PokerMap = rankMap

  public constructor(rank: Rank, suit: Suit) {
    this.rank = rank
    this.suit = suit
  }

  public getSuitLiteral(): string {
    return Card.suitMap[Suit[this.suit]]
  }

  public getRankLiteral(): string {
    return Card.rankMap[Rank[this.rank]]
  }

  public getSuit(): number {
    return this.suit
  }

  public getRank(): number {
    return this.rank
  }
}

export default Card
