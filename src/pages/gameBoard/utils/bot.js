//for roll dice
export const botDession = {SEE: "SEE", PACK: "PACK", BET: "BET", RISE: "RISE", NONE: "NONE", SIDESHOW: "SIDESHOW"};

export const desideBotAction = () => {
    let idx = Math.ceil(Math.random() * 5);
    let botDessionArr = Object.keys(botDession);
    let dession = botDessionArr[idx];
    // //(dession, idx);
    return dession;
};
