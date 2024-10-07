import anime from "animejs";

let cardAnimateArr = [
    {
        id: 1,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "3%",
                rotate: "1turn",
            },
            {
                rotate: "-12deg",
            },
        ],
    },
    {
        id: 4,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "84%",
                rotate: "1turn",
                // translateX: 15,
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 7,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "94%",
                left: "65%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 10,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "94%",
                left: "18%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 2,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "5%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 5,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "86%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 8,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "94%",
                left: "67%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 11,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "94%",
                left: "20%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 3,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "7%",
                bottom: "3%",
                rotate: "1turn",
                translateX: 20,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 6,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "88%",
                rotate: "1turn",
                translateX: 15,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 9,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "94%",
                left: "69%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 12,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "94%",
                left: "22%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "8deg",
            },
        ],
    },
];

let cardAnimateMidArr = [
    {
        id: 1,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
            },
            {
                opacity: 1,
            },
            {
                top: "55%",
                left: "3%",
                rotate: "1turn",
            },
            {
                rotate: "-12deg",
            },
        ],
    },
    {
        id: 4,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "55%",
                left: "84%",
                rotate: "1turn",
                // translateX: 15,
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 7,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "110%",
                left: "65%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 10,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "110%",
                left: "18%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 2,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "55%",
                left: "5%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 5,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "55%",
                left: "86%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 8,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "110%",
                left: "67%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 11,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "110%",
                left: "20%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 3,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "55%",
                left: "7%",
                bottom: "3%",
                rotate: "1turn",
                translateX: 20,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 6,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "55%",
                left: "88%",
                rotate: "1turn",
                translateX: 15,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 9,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "110%",
                left: "69%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 12,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "110%",
                left: "22%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "8deg",
            },
        ],
    },
];

let cardAnimateSmallArr = [
    {
        id: 1,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "3%",
                rotate: "1turn",
            },
            {
                rotate: "-12deg",
            },
        ],
    },
    {
        id: 4,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "84%",
                rotate: "1turn",
                // translateX: 15,
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 7,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "105%",
                left: "65%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 10,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "105%",
                left: "18%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 2,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "5%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 5,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "86%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 8,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "105%",
                left: "67%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 11,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "105%",
                left: "20%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 3,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "7%",
                bottom: "3%",
                rotate: "1turn",
                translateX: 20,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 6,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "40%",
                left: "88%",
                rotate: "1turn",
                translateX: 15,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 9,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "105%",
                left: "69%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 12,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "105%",
                left: "22%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "8deg",
            },
        ],
    },
];

let cardAnimateLargeArr = [
    {
        id: 1,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
            },
            {
                opacity: 1,
            },
            {
                top: "45%",
                left: "3%",
                rotate: "1turn",
            },
            {
                rotate: "-12deg",
            },
        ],
    },
    {
        id: 4,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "45%",
                left: "84%",
                rotate: "1turn",
                // translateX: 15,
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 7,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "100%",
                left: "65%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 10,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "100%",
                left: "18%",
                rotate: "1turn",
            },
            {
                rotate: "-10deg",
            },
        ],
    },
    {
        id: 2,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "45%",
                left: "5%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 5,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "45%",
                left: "86%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 8,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "100%",
                left: "67%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 11,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "100%",
                left: "20%",
                rotate: "1turn",
                translateX: 10,
            },
            {
                rotate: "0deg",
            },
        ],
    },
    {
        id: 3,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "45%",
                left: "7%",
                bottom: "3%",
                rotate: "1turn",
                translateX: 20,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 6,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "45%",
                left: "88%",
                rotate: "1turn",
                translateX: 15,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 9,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "100%",
                left: "69%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "10deg",
            },
        ],
    },
    {
        id: 12,
        keyframes: [
            {
                opacity: 0,
                top: "30%",
                translateY: -50,
                left: "48%",
            },
            {
                opacity: 1,
            },
            {
                top: "100%",
                left: "22%",
                rotate: "1turn",
                translateX: 16,
            },
            {
                rotate: "8deg",
            },
        ],
    },
];



const chipskeyframs = [
    {
        id: 0,
        keyframes: [
            {
                opacity: 1,
                left: "-5%",
            },
            {
                // top: "40%",
                left: "46%",
            },
            {
                opacity: 0,
            },
            {
                left: "0%",
                // bottom:"20%"
            },
        ],
    },
    {
        id: 1,
        keyframes: [
            {
                opacity: 1,
                left: "90%",
            },
            {
                top: "40%",
                left: "46.6%",
            },
            {
                opacity: 0,
            },
            {
                left: "80%",
                // bottom: "-10%"
            },
        ],
    },
    {
        id: 2,
        keyframes: [
            {
                opacity: 1,
                left: "80%",
            },
            {
                left: "46%",
                bottom: "63%",
            },
            {
                opacity: 0,
            },
            {
                left: "60%",
                bottom: "-10%",
            },
        ],
    },
    {
        id: 3,
        keyframes: [
            {
                opacity: 1,
                left: "10%",
            },
            {
                left: "46%",
                bottom: "63%",
            },
            {
                opacity: 0,
            },
            {
                left: "15%",
                bottom: "-13%",
            },
        ],
    },
];

const winnerChipskeyframs = [
    {
        id: 0,
        keyframes: [
            {
                opacity: 0,
                left: "46%",
            },
            {
                opacity: 1,
            },
            {
                left: "0%",
                opacity: 0,
            },
            {opacity: 0, left: "46%"},
        ],
    },
    {
        id: 1,
        keyframes: [
            {
                opacity: 0,
                left: "46%",
            },
            {
                opacity: 1,
                left: "90%",
            },
            {
                opacity: 0,
            },
            {
                opacity: 0,
                left: "46%",
            },
        ],
    },
    {
        id: 2,
        keyframes: [
            {
                opacity: 0,
                // left: "90%",
                left: "46%",
                bottom: "63%",
            },
            {
                opacity: 1,

                left: "80%",
                bottom: "0%",
            },
            {
                opacity: 0,
            },
            {
                opacity: 0,
                left: "80%",
                bottom: "0%",
            },
        ],
    },
    {
        id: 3,
        keyframes: [
            {
                opacity: 0,
                // left: "10%",
                left: "46%",
                bottom: "63%",
            },
            {
                opacity: 1,
                // left: "46%",
                // bottom: "63%",
                left: "15%",
                bottom: "3%",
            },
            {
                opacity: 0,
            },
            {
                opacity: 0,
                left: "15%",
                bottom: "3%",
            },
        ],
    },
];

export const windowSizeCategory = {
    SMALL: "small",
    MID: "mid",
    LARGE: "large",
    EXTRA_LARGE: "extra_large",
};

function getWindowSizeCategory() {
    if (window.matchMedia("(max-width: 690px)").matches) {
        return windowSizeCategory.SMALL;
    } else if (window.matchMedia("(min-width: 691px) and (max-width: 900px)").matches) {
        return windowSizeCategory.MID;
    } else if (window.matchMedia("(min-width: 901px) and (max-width: 1200px)").matches) {
        return windowSizeCategory.LARGE;
    } else if (window.matchMedia("(min-width: 1201px)").matches) {
        return windowSizeCategory.EXTRA_LARGE;
    }
}

export const distributeAnimation = (cards, players, cb) => {
    // let isMidMobileScreen = window.matchMedia(
    //     "(orientation : landscape) and (max-width : 950px ) and (max-height : 450px)"
    // ).matches;
    // let isMobileScreen = window.matchMedia(
    //     "(orientation : landscape) and (max-width : 950px ) and (max-height : 450px)"
    // ).matches;
    // let isLargeScreen = window.matchMedia(
    //     "(orientation : landscape) and (max-width : 950px ) and (max-height : 450px)"
    // ).matches;

    // //(
    //     "isMidMobileScreen",
    //     isMidMobileScreen,
    //     "isMobileScreen..>>",
    //     isMobileScreen,
    //     "isLargeScreen...>>>",
    //     isLargeScreen
    // );

    // checking for the window size
    let sizeCategory = getWindowSizeCategory();

    if (sizeCategory === windowSizeCategory.SMALL) {
        cardAnimateArr = cardAnimateSmallArr;
    } else if (sizeCategory === windowSizeCategory.MID) {
        cardAnimateArr = cardAnimateMidArr;
    } else if (sizeCategory === windowSizeCategory.LARGE) {
        cardAnimateArr = cardAnimateLargeArr;
    }

    distribute(cards, players, cb);
};

function distribute(cards, players, cb) {
    // debugger;
    let cardSelectIdx = 1;
    let nextCount = 3;
    let visisted = 0;
    let playerIndex = 0;

    const cardIds = [...cards];
    let animatenIdx = [];
    for (let i = 1; i <= cards.length; i++) {
        if (cardIds.includes(cardSelectIdx)) {
            // checking for the player is isAvailable then add the cards.
            if (players[playerIndex]?.isAvailable) {
                animatenIdx.push(cardSelectIdx);
            }

            // remove visisted ids
            playerIndex = ++playerIndex % 4;
            const findIndexOfCards = cardIds.indexOf(cardSelectIdx);
            cardIds.splice(findIndexOfCards, 1);

            // update card select idx
            cardSelectIdx = nextCount + cardSelectIdx;
            visisted++;

            if (visisted === 4) {
                if (cardIds.length === 4) {
                    cardSelectIdx = 3;
                    nextCount = 3;
                } else {
                    cardSelectIdx = 2;
                }
                visisted = 0;
            }
        }
    }
    //   //("animatenIdx", animatenIdx);
    executeAnimation(animatenIdx, cb);
}

function executeAnimation(animatenIdx, cb) {
    let len = animatenIdx.length;
    let TIME = 300;
    for (let i = 0; i < len; i++) {
        setTimeout(() => {
            let findAnimation = cardAnimateArr.find((item) => item.id === animatenIdx[i]);
            anime({
                targets: `.card-id-${findAnimation.id}`,
                keyframes: findAnimation.keyframes,
                duration: 800,
                opacity: 0,
                easing: "easeInOutQuad",
                delay: i * TIME,
            });
        }, 50);
    }

    // update game state
    setTimeout(() => {
        cb();
    }, len * TIME);
}

export const collectingAnimation = (id, cb, players) => {
    //("collected animation ID....>>>>", id);
    if (id !== null) {
        setTimeout(() => {
            let findAnimation = id?.type === "winner" ? winnerChipskeyframs[id?._id] : chipskeyframs[id];
            anime({
                targets: `.player-chips-${findAnimation.id}`,
                keyframes: findAnimation.keyframes,
                duration: 2000,
                easing: "easeInOutQuad",
                delay: 100,
            });
        }, 0);
    } else {
        for (let i = 0; i < 4; i++) {
            if (players[i]?.isAvailable) {
                setTimeout(() => {
                    let findAnimation = chipskeyframs.find((item) => item.id === i);
                    anime({
                        targets: `.player-chips-${findAnimation.id}`,
                        keyframes: findAnimation.keyframes,
                        duration: 2000,
                        easing: "easeInOutQuad",
                        delay: 100,
                    });
                }, 0);
            }
        }
    }

    setTimeout(() => {
        cb();
    }, 1500);
};
