import { TeenPatti } from "card-games-utils";
import { gameStatus } from "../../../constants/states";
import { Player } from "./player";
import { saveToSessionStorage } from "../../../utils/storage";

let playerId = 0;
export class GameManager {
  constructor(
    bootAmount = 800,
    chalLimit = 50000,
    podLimit = 100000,
    userIndex = 2
  ) {
    this.players = []; // Array of player objects
    // this.deck = this.createDeck();
    this.currentPot = 0;
    this.currentBet = 0;
    this.bootAmount = bootAmount;
    this.chalLimit = chalLimit;
    this.podLimit = podLimit;

    this.currentPlayerIndex = 0;
    this.dealerIndex = 0;
    this.sideShow = {
      status: false,
      user: {
        sender: {},
        receiver: {},
      },
    };
    this.gameStatus = gameStatus?.NOT_STARTED; // other statuses could be "dealing", "betting", "showdown"
    this.userIndex = userIndex;
    this.userTurn = {};
    this.mode = "bet";
    this.allIn = false;
    this.allInAmount = 0;
    // this.waitingPlayers = [];
  }

  // static getPlayers() {
  //     return GameManager.players;
  // }

  static addPlayer(
    game,
    index,
    {
      username,
      chips,
      avatar,
      isAvailable,
      isNew,
      socketId,
      uid,
      _id,
      hand = [],
      turn = false,
      packed,
      seen,
    }
  ) {
    let currentleftPlayers = game.players?.filter((e) => e.isAvailable);

    // //("current players", currentleftPlayers);
    if (currentleftPlayers.length <= 3) {
      let newPlayer = new Player(
        username,
        chips,
        turn,
        avatar,
        index,
        isAvailable,
        isNew,
        socketId,
        uid,
        _id,
        packed,
        seen
      );
      if (hand?.length === 3) newPlayer.setCard(hand);
      game.players[index] = newPlayer;
      playerId += 1;
    }
  }

  static getPlayers(game) {
    return game?.players;
  }

  static removePlayer(game, index) {
    // let toBeRemovedPlayer = game.players[index];
    game.players[index].isAvailable = false;
    // game.waitingPlayers.push(toBeRemovedPlayer);
  }
}

export const compareHand = (player1, player2) => {
  //  if the first hand is higher than second hand the it's return true other wise return false;

  let isHigher = TeenPatti.isRankHigher(
    TeenPatti.makeHand(player1),
    TeenPatti.makeHand(player2)
  );

  return isHigher;
};

export const getActivePlayers = (game) => {
  let activePlayers = game.players.reduce((a, c) => {
    if (c.isAvailable) return a + 1;
    return a;
  }, 0);

  return activePlayers;
};

export const calculateWinners = (players) => {
  // debugger;
  let playersHands = players.map((e) => TeenPatti.makeHand(e.hand));
  try {
    let winnerIdx = TeenPatti.calculateWinners(playersHands);
    return winnerIdx;
  } catch (error) {
    console.error("error", error);
  }
};

export function updateTimeStamp() {
  let now = new Date().getTime() + 14900;
  saveToSessionStorage("timeStamp", now);
}
