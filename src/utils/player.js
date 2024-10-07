export class Player {
    constructor(username, chips, turn) {
        this.username = username;
        this.chips = chips;
        this.hand = null;
        this.packed = false;
        this.blindCount = 0; //max-4
        this.seen = false;
        this.turn= turn
    }

    bet(amount) {
        // if (amount > this.chips) {
        //     throw new Error("Not enough chips.");
        // }
        if (!this.seen) {
            if (this.blindCount >= 4) {
                this.seen = true;
            } else {
                this.blindCount++;
            }
        }
        this.chips -= amount;
    }
    seeCards() {
        this.seen = true;
    }
    giveBoot(bootAmount) {
        this.chips = this.chips - bootAmount;
    }
    packUser() {
        this.packed = true;
    }
    reset() {
        this.hand = null;
        this.packed = false;
        this.blindCount = 0; //max-4
        this.seen = false;
    }
}
