import {StandardDeck, CardDeck, TeenPatti} from "card-games-utils";
import {Player} from "./player";
import {gameStatus} from "../constants/states";
import wait from "./timer";

// let winnerIndexes = TeenPatti.calculateWinners(players)
// higher rank get
// isRankHigher: it will Calculates the higher ranking hand from given hands

const getPlayersHand = (numOfPlayer = 4) => {
    // //(cardDeck);
    let cardDeck = StandardDeck.getStandardDeck();

    cardDeck = CardDeck.shuffleCards(cardDeck);

    let numOfCardPerPlayer = 3;
    //distribute the 3 cards into 3 different players
    // (cardDeck, numofPlayer,numof card per player)
    let distributedCards = CardDeck.distributeCards(cardDeck, numOfPlayer, numOfCardPerPlayer, true)[0];

    //("distributeCards called");

    return distributedCards;
};

export class MainGame {
    constructor(players) {
        this.players = players || []; // Array of player objects
        // this.deck = this.createDeck();
        this.currentPot = 0;
        this.currentBet = 0;
        this.currentPlayerIndex = 0;
        this.dealerIndex = 0;
        this.sideShow = {
            status: false,
            user: [],
        };
        this.bootAmount = 800;
        this.gameStatus = "waiting"; // other statuses could be "dealing", "betting", "showdown"
        this.userIndex = 1;
       
    }

    changeStatus(currentStatus) {
        this.gameStatus = currentStatus;
    }

    riseBet(amount) {
        this.currentBet = amount;
    }

    collectBoot() {
        this.players = this.players.map((e) => {
            e.giveBoot(this.bootAmount);
            this.currentPot += this.bootAmount;
            return e;
        });
        this.currentBet = this.bootAmount;
        // this.gameStatus = "dealing";
        this.getHands();
    }

    addPlayer(username, chips, position) {
        let hand = TeenPatti.makeHand(getPlayersHand(1)[0]);

        let player = new Player(username, chips);
        this.players[position] = player;
    }

    placeBet(amount) {
        // if (amount < this.currentBet) {
        //     throw new Error("Bet amount is less than current bet.");
        // }

        // if (this.currentPlayerIndex === this.userIndex) {
        //     //(this.currentPlayerIndex === this.userIndex);
        //     this.players[this.userIndex].bet(this.currentBet);

        //     this.currentPot += this.currentBet;
        //     // this.currentBet = amount;
        //     // this.nextPlayer();
        // }

        // check for  blind bet then increase blindCount ;
        this.players[this.currentPlayerIndex].bet(this.currentBet);

        this.currentPot += this.currentBet;
        this.nextPlayer();
    }

    nextPlayer() {
        // current player turn change
        this.players[this.currentPlayerIndex].turn = false;

        // changing the current player index

        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;

        // looping the current player and checking if packed or not

        while (this.players[this.currentPlayerIndex].packed) {
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        }
        // new player index changed and added to new

        this.players[this.currentPlayerIndex].turn = true;
    }

    getUnpackedUser() {
        let userCount = this.players.filter((e) => e.packed === false);
        return userCount;
    }

    pack() {
        this.players[this.currentPlayerIndex].packUser();
        let leftPlayer = this.getUnpackedUser();
        if (leftPlayer.length <= 1) {
            // this.gameStatus = gameStatus.waiting;
            // this.gameStatus=
            // this.resetGame();
            // //("unpackedUser....>>>", this.getUnpackedUser())
            this.awardPot(leftPlayer[0]);
        } else {
            this.nextPlayer();
        }
    }

    getCurrentPlayer() {
        // if
        return this.players[this.currentPlayerIndex];
    }

    requestSideShow() {
        let sideShowCurrentPlayer = this.players[this.currentPlayerIndex];

        //("side Show.------------->", this);

        let lastPlayerindex = this.currentPlayerIndex === 0 ? 3 : this.currentPlayerIndex - 1;

        while (this.players[lastPlayerindex].packed) {
            if (lastPlayerindex === 0) {
                lastPlayerindex = 3;
            } else {
                lastPlayerindex--;
            }
        }

        let sideShowPreviousPlayer = this.players[lastPlayerindex];
        this.sideShow = {
            status: true,
            user: [sideShowCurrentPlayer, sideShowPreviousPlayer],
        };

        //("side Show.", this.sideShow);
    }

    cancelSideShow() {
        // alert("are you sue");
        this.sideShow = {
            status: false,
            user: [],
        };
    }

    acceptSideShow() {
        // alert("accepted")
        // let winnerIndexes = TeenPatti.calculateWinners(players);

        // isRankHigher: it will Calculates the higher ranking hand from given hands
        // it takes 2 hands as parameter and return true is first hand is ranked higher then second one, else it will return false
        // there can be a case where the TIE happens, means 2 or more players have cards with same value(ranking), in this case the returning array will have more then 1 index of winners.

        // higher rank get
        // isRankHigher: it will Calculates the higher ranking hand from given hands
        let [player1, player2] = this.sideShow.user.map((e)=>e.hand);
        
        //("sideShow from this game....>>", this.sideShow);
        //(player1, player2);

        let higherRank = TeenPatti.isRankHigher(player1, player2);

        if (higherRank) {
            player2.packed = true;
        } else {
            player1.packed = true;
        }

        this.sideShow = {
            status: false,
            user: [],
        };

        this.nextPlayer();
    }

    getHands() {
        let hands = getPlayersHand(this.players.length);

        // this.players = this.players.map((e, i) => {
        //     return {...e, hand: TeenPatti.makeHand(hands[i])};
        // });
        hands.map((e, i) => {
            this.players[i].hand = TeenPatti.makeHand(e);
        });

        // .map((e, i) => {
        //     let hand = TeenPatti.makeHand(e);

        //     let name = i === numberOfPlayer-1 ? "ME" : `Bot${i + 1}`;
        //     let player = new Player(name, 100000,);
        //     return player;
        // });
        wait(2000, () => {
            this.gameStatus = "betting";
        });
    }

    showDown(currentPlayer, nextPlayer) {
        // isRankHigher: it will Calculates the higher ranking hand from given hands
        // it takes 2 hands as parameter and return true is first hand is ranked higher then second one, else it will return false
        // there can be a case where the TIE happens, means 2 or more players have cards with same value(ranking), in this case the returning array will have more then 1 index of winners.

        // higher rank get
        // isRankHigher: it will Calculates the higher ranking hand from given hands
        //("show down players.", currentPlayer, nextPlayer);

        let winner = null;

        let higherRank = TeenPatti.isRankHigher(currentPlayer.hand, nextPlayer.hand);

        if (higherRank) {
            nextPlayer.packed = true;
            winner = currentPlayer;
        } else {
            currentPlayer.packed = true;
            winner = nextPlayer;
        }
        //("higher rank", higherRank, winner);
        this.awardPot(winner);
    }

    awardPot(winner) {
        winner.chips += this.currentPot;

        this.gameStatus = gameStates.showdown;
        this.resetGame();
    }

    resetGame() {
        this.currentPot = 0;
        this.currentBet = 0;
        this.currentPlayerIndex = this.dealerIndex;
        this.dealerIndex = (this.dealerIndex + 1) % this.players.length;
      
        this.players.map((e) => {
            e.reset();
        });
        // this.gameStatus = "waiting";
    }
}

const createNewGame = (numberOfPlayer) => {
    // console.count("create the player called");
    let players = getPlayersHand(numberOfPlayer).map((e, i) => {
        // let hand = TeenPatti.makeHand(e);

        let name = i === numberOfPlayer - 1 ? "ME" : `Bot${i + 1}`;

        // let player = new Player(name, 100000);
        return new Player(name, 60000, i === 0 ? true : false);
    });

    let game = new MainGame(players);

    return game;
};

export {getPlayersHand, createNewGame};
