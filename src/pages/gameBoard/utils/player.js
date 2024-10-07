import defaultAvatar from "../../../assets/profiles/profile2.svg";

export class Player {
    constructor(
        username,
        chips,
        turn = false,
        avatar = null,
        playerId,
        isAvailable,
        isNew = false,
        socketId,
        uid,
        _id,
        packed = false,
        seen = false,
        is_all_in = false
    ) {
        this.playerId = playerId;
        this.isAvailable = isAvailable;
        this.username = username;
        this.chips = chips;
        this.hand = [];
        this.packed = packed;
        this.blindCount = 0; //max-4
        this.seen = seen;
        this.turn = turn;
        this.avatar = avatar || defaultAvatar;
        this.isNew = isNew;
        this.socketId = socketId;
        this.uid = uid;
        this._id = _id;
        this.is_all_in = is_all_in
    }

    setCard(card) {
        this.hand = card;
    }

    setAllIn(val){
        this.is_all_in = val
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

        if (amount > this.chips) {
            this.chips = 0;
        } else {
            this.chips -= amount;
        }
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
        this.turn = false;
        this.isAvailable = true;
        this.isNew = false;
        this.is_all_in = false
    }
}
