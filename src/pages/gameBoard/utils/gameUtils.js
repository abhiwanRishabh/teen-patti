import {CardDeck, StandardDeck} from "card-games-utils";

export class TeenPatti {
    constructor(inGamePlayer = 2) {
        this.cardDeck = StandardDeck.getStandardDeck();
        this.inGamePlayer = inGamePlayer; // default
        this.suffleCards = [];
        this.distributCards = [];
    }

    /**
     * card suffling
     * @returns [suffled card]
     */
    suffleCard() {
        this.suffleCards = CardDeck.shuffleCards(this.cardDeck);
    }

    /**
     * distribute card
     * @returns []
     */

    distributedCards(maxplayer = 4) {
        //distribute the 3 cards into n different players
        // (cardDeck, numofPlayer,numof card per player)
        this.distributCards = CardDeck.distributeCards(this.suffleCards, maxplayer, 3, true)[0];
    }

    changeTurn() {}
}

// export changePlayerTurn=(currentTurn){ }
