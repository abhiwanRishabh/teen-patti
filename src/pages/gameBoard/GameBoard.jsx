/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  calculateWinners,
  compareHand,
  GameManager,
  getActivePlayers,
  updateTimeStamp,
} from "./utils/game";
import Player from "./Player";
import DealerCards from "./DealerCards";
import { gameStatus } from "../../constants/states";
import { collectingAnimation, distributeAnimation } from "./utils/animations";
import Notification from "../../components/notification/Notification";
import ChipsCard from "../../components/cards/ChipsCard";
import { TeenPatti } from "./utils/gameUtils";

import EmptyPlayerCard from "../../components/cards/EmptyPlayerCard";
import GameInfoModal from "../../components/Modal/GameInfoModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomChatModal from "../../components/Modal/CustomChatModal";

import LowBalancemodal from "../../components/Modal/LowBalancemodal";
import InformationModal from "../../components/Modal/InformationModal";
import ConformModal from "../../components/Modal/ConformModal";
import SettingModal from "../../components/Modal/SettingModal";
import useSearchParams from "../../hooks/useSearchParams";
import ActionInfoButtons from "../_components/ActionInfoButtons";
import ActionButtons from "../_components/ActionButtons";
import { botDession, desideBotAction } from "./utils/bot";
import wait from "../../utils/timer";

import profile0 from "../../assets/profiles/profile2.svg";
import profile1 from "../../assets/profiles/profile3.svg";
import profile2 from "../../assets/profiles/profile4.svg";
import profile3 from "../../assets/profiles/profile5.svg";
import { BsNewspaper } from "react-icons/bs";
import { gameSound } from "../../App";
import PotLimitMessage from "../../components/Modal/PotLimitMessage";
import { socket } from "../../socket/socket";
import { publish, subscribe, unsubscribe } from "../../CustomEvents/event";
import {
  getRoomProperties,
  LeaveRoom,
  OnConnectToMaster,
  onGetRoomProperties,
  onJoinRoom,
  onJoinRoomFailed,
  OnPlayerEnterRoom,
  OnPlayerLeftRoom,
  OnPlayerList,
  onRaiseEvent,
  raiseEvent,
  reJoinRoom,
} from "../../constants/socketKeys";
import { showToast } from "../../utils";
import {
  setGamePlayers,
  setRoomProperties,
  setRoomType,
  setUserData,
} from "../../redux/slice/gameSlice";
import useParamsChange from "../../hooks/useParamsChange";
import {
  getFromSessionStorage,
  saveToSessionStorage,
} from "../../utils/storage";
import usePublishEvent from "../../hooks/usePublishEvent";
import { saveGameProperties } from "../../socket/publishEvent";
import useCreateQuickPlay from "../../hooks/useCreateQuickPlay";

const roomsTypes = {
  silverRoom: "Silver",
  goldRoom: "Gold",
  platinumRoom: "Platinum",
  vipRoom: "VIP",
  vvipRoom: "VVIP",
  unlimited: "Unlimited",
};

const bootAmount = {
  silverRoom: 5,
  goldRoom: 25,
  platinumRoom: 100,
  vipRoom: 500,
  vvipRoom: 1000,
  unlimited: 10000,
};

// dummy information
let information =
  "subho ipsum dolor sit amet consectetur adipisicing elit. Quam, eligendi. Impedit magnam magni harum eum illum molestiae soluta quia maxime et, similique cum esse vel numquam possimus atque veritatis. Omnis reprehenderit dolores voluptate, odio excepturi nesciunt ipsum saepe nihil nostrum laboriosam ipsam, minus reiciendis magnam pariatur velit dicta praesentium distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, eligendi. Impedit magnam magni harum eum illum molestiae soluta quia maxime et, similique cum esse vel numquam possimus atque veritatis. Omnis reprehenderit dolores voluptate, odio excepturi nesciunt ipsum saepe nihil nostrum laboriosam ipsam, minus reiciendis magnam pariatur velit dicta praesentium distinctio!";
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function GameBoard() {
  const { roomType, gameObj, userData, roomProperties } = useSelector(
    (state) => state.game
  );
  const [gameUtils, updateUtils] = useState(new TeenPatti(4));
  const [game, updateGame] = useState(
    new GameManager(
      bootAmount[roomType] * 10,
      bootAmount[roomType] * 100,
      bootAmount[roomType] * 1000
    )
  );

  // (boot ,chal, pod) limit
  const [players, setPlayers] = useState([]);
  const [started, setStarted] = useState(false);
  // const [bettinStarted , setBettingStarted] = useState(false)
  const [notificationText, setNotificationText] = useState(null);
  const notificationRef = useRef();

  let query = useSearchParams();
  const [param, setSearchParam] = useParamsChange();
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [timer, setTimer] = useState(15);
  const [startTime, setStartTime] = useState(3000);
  const timerRef = useRef(null);

  // modal handel states
  const [newPlayerEnter, setNewPlayerEnter] = useState(false);
  const [showGameInfo, setGameInfo] = useState(true);
  const [openRiseBet, setOpenRiseBet] = useState(false);
  const [openChatmodal, setOpenChatModal] = useState(false);
  const [isLowBalance, setIsLowBalance] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [sideShowRequestReceiveUser, setSideShowRequestReceiveUser] =
    useState(null); // used for conform modal
  const [risedBetAmount, setRisedBetAmount] = useState(game?.bootAmount);

  const [showPotLimitMessage, setShowPotLimitMessage] = useState(false);

  const [winner, setWinner] = useState(null);

  const [isShowDown, setShowDowm] = useState(false);

  const [sideShowAccepted, setSideShowAccepted] = useState(false);

  const [eventMessage, seteventMessage] = useState(null);

  const [chatMessage, setChatMessage] = useState(null);

  const history = useHistory();

  const dispatch = useDispatch();

  const { handleSetLocalRoomPropertyByCreator } = usePublishEvent();
  const { handleCreateLocalRoomPropertyLobbyByCreator } = useCreateQuickPlay();

  const leaveRoom = () => {
    publish(LeaveRoom, {
      roomName: query.get("roomName"),
    });
  };

  const handleBack = () => {
    leaveRoom();
    history.push("/home");
  };

  const getProfile = (position) => {
    switch (position) {
      case 1:
        return profile1;
      case 2:
        return profile2;
      case 3:
        return profile3;

      default:
        return profile0;
    }
  };

  const onCloseGameInfo = () => {
    gameType === "Private" || gameType === "Quick"
      ? setGameInfo(false)
      : handleStartGame();
  };

  const gameType = param.get("gameType");
  let roomPlayers = gameObj.players;
  // player obj from socket
  // {
  //   isConnected: true
  //   nickname: "user0056"
  //   socketId: "DVIo8M9liCa4E1wSAAD5"
  //   uid: "lzmcxn82auwvtm"
  //   _id: "66b5be78d1278ad722937587"
  // }

  // //(roomPlayers);

  let socketPlayers = useMemo(() => {
    const players = gameObj.players.map((e, i) => {
      let dummyuser = {
        username: "Guest 1",
        chips: 100000,
        avatar: getProfile(i),
        isAvailable: false,
        isNew: false,
      };
      return roomPlayers[i]
        ? {
            username: e.nickname,
            chips: 100000,
            avatar: profile0,
            isAvailable: e.isConnected,
            isNew: false,
            socketId: e.socketId,
            uid: e.uid,
            _id: e._id,
          }
        : dummyuser;
    });

    console.log("socketPlayers2>>", players);
    return players;
  }, [gameObj?.players]);

  let playersData = [
    {
      username: "Guest 1",
      chips: 100000,
      avatar: profile0,
      isAvailable: param.get("gameType") === "Free" ? true : false,
      isNew: false,
    },
    {
      username: "Guest 2",
      chips: 100000,
      avatar: profile1,
      isAvailable: param.get("gameType") === "Free" ? true : false,
      isNew: false,
    },
    {
      username: "MY Profile",
      chips: 100000,
      avatar: profile2,
      isAvailable: param.get("gameType") === "Free" ? true : false,
      isNew: false,
    },
    {
      username: "Guest 3",
      chips: 100000,
      avatar: profile3,
      isAvailable: param.get("gameType") === "Free" ? true : false,
      isNew: false,
    },
  ];

  /**
   * @Restore session
   * @useEffect
   */

  useEffect(() => {
    const gameSession = getFromSessionStorage("gameSession");
    const roomType = getFromSessionStorage("roomType");
    const playerTurnIndex = getFromSessionStorage("playerTurnIndex");
    // const currentPlayerIndex = getFromSessionStorage('currentPlayerIndex');
    if (gameSession) {
      updateGame(gameSession);
      setCurrentPlayerIndex(+playerTurnIndex);
      dispatch(setRoomType(roomType));
    }
  }, []);

  useEffect(() => {
    const started = param.get("started");
    // console.log("game>>",game);
    if (started === "true") {
      setGameInfo(false);
      saveToSessionStorage("gameSession", game);
    }
    saveGameProperties(
      { isStarted: Boolean(started), ...game },
      param.get("roomName"),
      userData
    );
  }, [game]);

  /** check my turn */
  const isMyTurn = useMemo(() => {
    if (param.get("gameType") === "Free") {
      return game?.userIndex === currentPlayerIndex;
    } else if(userData) {
      const myTurn = game?.players.find(
        (player) => (player.uid === userData?.uid && player?.playerId === currentPlayerIndex)
      );
      return myTurn ? myTurn?.turn : false;
    }
  }, [game?.players, game?.userIndex, currentPlayerIndex,userData?.uid]);

  /**
   * @SetRoomPropertiesFale
   * update room to isOpen close
   */
  // useEffect(() => {
  //   if (roomPlayers.length === 4) {
  //     handleCreateLocalRoomPropertyLobbyByCreator(
  //       userData,
  //       param.get("roomName"),
  //       false
  //     );
  //   }
  // }, [roomPlayers]);

  /**
   * @deserializeGameSession
   */
  const deserializeGameSession = (gameSession, players) => {
    //  console.log("gameSession?.players",gameSession?.players)
    // // debugger;
    let updatedPlayers = players?.map((new_player) => {
      const prev_player = gameSession?.players.find(
        (prev) => prev?.uid === new_player?.uid
      );
      if (new_player?.uid === prev_player?.uid) {
        return {
          username: new_player.nickname,
          chips: prev_player?.chips,
          turn: prev_player?.turn,
          avatar: profile0,
          isAvailable: new_player.isConnected,
          hand: prev_player?.hand,
          isNew: false,
          socketId: new_player.socketId,
          uid: new_player.uid,
          _id: new_player._id,
          packed: prev_player?.packed,
          seen: prev_player?.seen,
        };
      }
    });

    gameSession?.players.forEach((prev_player, i) => {
      const newPlayerData = updatedPlayers?.find(
        (prevPlayer) => prevPlayer?.uid === prev_player?.uid
      );
      GameManager.addPlayer(
        game,
        i,
        newPlayerData ? newPlayerData : prev_player
      );
    });
  };

  useEffect(() => {
    if (param.get("gameType") === "Free") {
      playersData.forEach((e, i) => {
        GameManager.addPlayer(game, i, socketPlayers[i] ? socketPlayers[i] : e);
      });
      console.log("**game.players**", game.players, currentPlayerIndex);
    }
  }, []);

  // add new players for private
  useEffect(() => {
    if (param.get("gameType") === "Private") {
      console.log("link 324>>>", isMyTurn);
      if (game?.players.length == 0) {
        playersData.forEach((e, i) => {
          GameManager.addPlayer(
            game,
            i,
            socketPlayers[i] ? socketPlayers[i] : e
          );
        });
        console.log("**game.players**", game.players, currentPlayerIndex);
      }
      updateGame({
        ...game,
        userIndex: game.players.findIndex((e) => e?.uid === userData?.uid),
      });
    }
  }, [game?.players, userData?.uid]);

  // add player for quick play
  useEffect(() => {
    if (param.get("gameType") === "Quick") {
      // execute this in case of game is not started
      if (param.get("started") === "false" && userData?.isCreator) {
        console.log("link 346>>>", isMyTurn);
        playersData.forEach((e, i) => {
          GameManager.addPlayer(
            game,
            i,
            socketPlayers[i] ? socketPlayers[i] : e
          );
        });
        updateGame({
          ...game,
          userIndex: game.players.findIndex((e) => e?.uid === userData?.uid),
        });
      }
    }
  }, [socketPlayers, userData?.uid, userData?.isCreator]);

  // todo --> combine all new and old players
  useEffect(() => {
    if (param.get("gameType") === "Quick") {
      // execute this in case of game is not started
      const players = gameObj?.players;
      const playerLength = players?.length;
      if (userData?.isCreator === false && roomProperties) {
        //  debugger;
        const updatedSocketPlayers = players.map((player) => {
          const oldPlayers = roomProperties.players?.find(
            (prev_player) => prev_player?.uid === player?.uid
          );
          if (oldPlayers) {
            return oldPlayers;
          } else {
            return {
              username: player.nickname,
              chips: 100000,
              avatar: profile0,
              isAvailable: playerLength > 2 ? false : player.isConnected,
              isNew: playerLength > 2 ? true : false,
              socketId: player.socketId,
              uid: player.uid,
              _id: player._id,
            };
          }
        });

        // add new players
        // console.log("updatedSocketPlayers",updatedSocketPlayers);

        playersData.forEach((e, i) => {
          GameManager.addPlayer(
            game,
            i,
            updatedSocketPlayers[i] ? updatedSocketPlayers[i] : e
          );
        });

        // get new players
        const updatedPlayers = GameManager.getPlayers(game);

        if (playerLength > 2) {
          const restoreData = {};
          for (const [key, value] of Object.entries(roomProperties)) {
            if (key !== "players") {
              restoreData[key] = value;
            }
          }
          console.log("restoreData", updatedPlayers, userData);
          updateGame({
            ...restoreData,
            players: updatedPlayers,
            userIndex: updatedPlayers.find((e) => e?.uid === userData?.uid)
              ?.playerId,
          });
        } else {
          updateGame({
            ...game,
            players: GameManager.getPlayers(game),
            userIndex: updatedPlayers.find((e) => e?.uid === userData?.uid)
              ?.playerId,
          });
        }
        dispatch(setRoomProperties(null));
      }
    }
  }, [gameObj?.players, roomProperties, userData?.uid, userData?.isCreator]);

  function updateParam() {
    setSearchParam({
      roomName: param.get("roomName"),
      gameType: param.get("gameType"),
      started: true,
    });
  }

  // ("game  in Private", game);
  // //("starting Game User", "userIndex :", game.players.findIndex((e) => e?.uid === gameObj?.userData?.uid), "GAmeMode:", param.get("gameType"));

  const handleAddPlayer = (playerEnter, position) => {
    // alert("new user is adding");

    // if (userData) {
    //   showToast("error", "You can not join in same room");
    //   return;
    // }

    // debugger;

    let newUserData = {
      username: playerEnter?.nickname,
      chips: 100000,
      avatar: getProfile(position),
      isAvailable: false,
      isNew: true,
      ...playerEnter,
    };

    if (game?.gameStatus === gameStatus.WAITING || game?.gameStatus === gameStatus.COLLECTING || game?.gameStatus === gameStatus.COLLECTING) {
      newUserData = { ...newUserData, isAvailable: true, isNew: false };
    }

    if (+newUserData.chips < +game?.bootAmount) {
      setNotificationText("You Don't enough amout to sit in the table...");
      wait(1500, () => setNotificationText(null));
    } else {
      // // debugger;
      GameManager.addPlayer(game, position, newUserData);
    }

    // console.log("GameManager>>",game.players);

    // const newPlayerRaiseEvent = {
    //   roomName: query.get("roomName"),
    //   EventCode: 15,
    //   SendTo: "Other", // Other/All
    //   CustomData: {
    //     sendingUser: socket.id,
    //     playerEnter,
    //     players : game?.players
    //   },
    // };

    // publish(raiseEvent, newPlayerRaiseEvent);

    updateGame({
      ...game,
      players: GameManager.getPlayers(game),
    });
    //("game obj after adding new palyer", game);
  };

  // Handle Start Game
  const handleStartGame = () => {
    if (game?.gameStatus === gameStatus.NOT_STARTED) {
      updateGame({
        ...game,
        gameStatus: gameStatus?.WAITING,
      });
    }
    updateParam();
    setGameInfo(false);
  };

  /**
   * handling game states and animations
   */

  const collectBoot = () => {
    // // debugger;
    game.players = game.players.map((e) => {
      if (e.isAvailable) {
        e.giveBoot(game.bootAmount);
        game.currentPot += game.bootAmount;
      }
      return e;
    });
    game.currentBet = game.bootAmount;
  };

  // changing the functionality according to the game states

  useEffect(() => {
    if (game?.gameStatus === gameStatus?.DEALING) {
      setNotificationText("Dealing cards...");
      wait(2500, () => setNotificationText(null));

      gameSound.playSufflingCardsSound();

      distributeAnimation(cards, game?.players, () => {
        gameSound.pauseSufflingCardsSound();

        if (userData?.isCreator) {
          // ** distributing cards
          gameUtils.distributedCards();

          // ** set card to player
          const players = game?.players;

          players.forEach((player, idx) => {
            if (player.isAvailable) {
              player.setCard(gameUtils.distributCards[idx]);
            }
          });

          const cardDistribtionEvent = {
            roomName: query.get("roomName"),
            EventCode: 14,
            SendTo: "Other", //__ Other/All
            CustomData: {
              //  here we provide all the data want to send.
              sendingUser: socket.id,
              cards: gameUtils.distributCards,
            },
          };

          publish(raiseEvent, cardDistribtionEvent);
        } else if (param.get("gameType") === "Free") {
          // debugger;
          // ** distributing cards
          gameUtils.distributedCards();

          const players = game?.players;

          players.forEach((player, idx) => {
            if (player.isAvailable) {
              player.setCard(gameUtils.distributCards[idx]);
            }
          });
        }

        // set Initial player turn
        const findInitialPlayerIndex = () => {
          let index = game?.players.findIndex((e) => e.isAvailable);
          setCurrentPlayerIndex(index);
        };
        findInitialPlayerIndex();

        // update game state
        updateGame({
          ...game,
          gameStatus: gameStatus?.BETTING,
        });

        // //("game", game);
        // set Card to players
      });
    } else if (game?.gameStatus === gameStatus?.COLLECTING) {
      // ** card suffling
      gameUtils.suffleCard();

      // ** collection animation (id,callback)
      collectingAnimation(
        null,
        () => {
          collectBoot();
          updateGame({
            ...game,
            gameStatus: gameStatus?.DEALING,
          });
        },
        game?.players
      );
    }
  }, [game, gameUtils, query]);

  // show notification text before game start

  useEffect(() => {
    if (game?.gameStatus === gameStatus.WAITING) {
      setNotificationText("Game Starting in a sec...");
      updateUtils(new TeenPatti(4));

      const findMe = game?.players.find(
        (player) => player?.socketId === socket.id
      );

      console.log("PAYERSF", findMe);

      if (findMe) {
        checkLowBalanceForAll();
      }

      let activePlayers = getActivePlayers(game);
      if (activePlayers >= 2) {
        let timeout = setTimeout(() => {
          setNotificationText("Collecting booting amount...");

          // update game State
          updateGame({
            ...game,
            gameStatus: gameStatus?.COLLECTING,
          });
        }, 3000);

        return () => clearTimeout(timeout);
      } else {
        wait(1000, () => {
          setNotificationText("waiting for other players to join...");
        });
      }
    }
  }, [game?.gameStatus, getActivePlayers(game)]);

  //Player turn change
  let updatePlayer = (index = currentPlayerIndex) => {
    // // debugger;
    let updatedPlayers = game.players.map((e) => {
      if (e?.playerId === index) {
        e.turn = true;
        return e;
      } else if (e) {
        e.turn = false;
        return e;
      }
      return e;
    });
    //("**updatedPlayers**", updatedPlayers)
    updateGame({
      ...game,
      players: updatedPlayers,
    });
  };

  /** Update Player Seen and Packed */
  let updatePlayerSeenOrPacked = (key, index = currentPlayerIndex) => {
    // // debugger;
    let updatedPlayers = game.players.map((player) => {
      if (player?.playerId === index) {
        player[key] = true;
        return player;
      }
      return player;
    });

    // console.log('updatedPlayers>>>',updatedPlayers)
    // // //("**updatedPlayers**", updatedPlayers)
    updateGame({
      ...game,
      players: updatedPlayers,
    });
  };

  // const checkLowBalance = () => {
  //   let currentPlayerBetAbleAmout =
  //     game?.players[currentPlayerIndex].chips - game?.currentBet;
  //   if (game?.players[currentPlayerIndex].chips <= 0 && game?.players[currentPlayerIndex].socketId === socket.id) {
  //     game?.players[currentPlayerIndex].packUser();
  //     setIsLowBalance(true);
  //   }
  // };

  const checkLowBalanceForAll = useCallback(() => {
    const findMe = game?.players.find(
      (player) => player?.socketId === socket.id
    );
    if (findMe.socketId === socket.id && findMe.chips <= 0) {
      setIsLowBalance(true);
    }
  }, [game?.players]);

  const checkPodLimit = () => {
    //("pod limit called", game.gameStatus);
    // // debugger;

    if (game?.currentPot >= game?.podLimit) {
      clearInterval(timerRef.current);
      setTimer(15);
      setShowPotLimitMessage(true);
      // waiting 2000ms for complete the message show animtion
      wait(2000, () => {
        //("conosole.log checkPodLimit before",game?.players)
        let currentPlayers = game?.players.filter((e) => e.isAvailable);
        //("conosole.log checkPodLimit",game?.players)
        let winnerIdx = calculateWinners(currentPlayers);
        //("pod Limit", currentPlayers, currentPlayers[winnerIdx]);
        setShowPotLimitMessage(false);
        console.log("yha se check pot limkt me se aaya", game?.players);
        awardPot(currentPlayers[winnerIdx]);
      });
      return false;
    }
    return true;
  };

  // timer for player turn change
  const startTimer = () => {
    // close rise bet modal as the current user changed
    if (openRiseBet) {
      setOpenRiseBet(false);
      setRisedBetAmount(game?.currentBet);
    }

    // ---- setting player turn
    updatePlayer();
    clearInterval(timerRef.current);
    updateTimeStamp();

    // timerRef.current = setInterval(() => {
    //   setTimer((prev) => {
    //     if (prev === 1) {
    //       // nextPlayer();
    //       // packed();
    //       return 15;
    //     }
    //     return prev - 1;
    //   });
    // }, 1000);
  };

  // getting the lset unpacked user
  function preIndex() {
    let currentPlayers = game.players?.filter((e) => e.isAvailable);

    let incindex = (currentPlayerIndex + 1) % 4;

    while (
      game.players[incindex].packed ||
      !game.players[incindex].isAvailable
    ) {
      incindex = (incindex + 1) % game.players.length;
    }

    return incindex;
  }

  function checkAllBlind() {
    //("conosole.log checkPodLimit before",game?.players)
    let currentPlayers = game.players?.filter((e) => e.isAvailable);

    let playerCount = currentPlayers.length;

    let currentBlind = currentPlayers.reduce((a, c) => {
      if (!c.seen) return a + 1;
      return a;
    }, 0);

    //("conosole.log checkPodLimit 2",game?.players)
    return playerCount === currentBlind;
  }

  const nextPlayer = () => {
    // chack for blind and seen and according to that increase the bet.
    //  // debugger;
    let isCurrentPlayerBlind = !game.players[currentPlayerIndex].seen;

    let incindex = preIndex();

    let isNextPlayerBlind = !game.players[incindex].seen;

    if (isCurrentPlayerBlind && isNextPlayerBlind && checkAllBlind()) {
      game.currentBet = game.currentBet * 2;
    }

    // setCurrentPlayerIndex
    setCurrentPlayerIndex(incindex);

    saveToSessionStorage("playerTurnIndex", incindex);

    updateTimeStamp();

    //("game aafter player bet next", incindex, game);

    return incindex;
    // setCurrentPlayerIndex( currentPlayerIndex +1 % game?.players.length);

    // publish event for nxtPlayers
    // if (param.get("gameType") === "Private") {
    //   const nextPlayerEvent = {
    //     roomName: query.get("roomName"),
    //     EventCode: 5,
    //     SendTo: "Others",
    //     CustomData: {
    //       sendingUser: socket.id,
    //       turn: currentPlayerIndex,
    //       // currentTime  : new Date().getTime()
    //     },
    //   };
    //   // publis event
    //   publish(raiseEvent, nextPlayerEvent);
    // }
  };

  const compareCard = (players) => {
    const [getWinner] = calculateWinners(players);
    const getWinPlayer = players.find(
      (player) => player?.playerId === getWinner
    );
    console.log("yha se compare card me se aaya", game?.players);
    awardPot(getWinPlayer);
    console.log("getWinner", players, getWinner);
  };

  function check_all_in() {
    return game?.players
      .filter((player) => player?.isAvailable)
      .every((player) => player?.is_all_in);
  }

  // Todo -> check all in
  function CheckAllIn() {
    // invove all in
    const isAllIn = check_all_in();

    if (isAllIn) {
      // find all connected players
      let players = game?.players.filter(
        (player) => player?.isAvailable && !player?.packed
      );

      // update player's seen card to -> true
      players.forEach((player) => {
        if (player.is_all_in) {
          player.seeCards();
        }
      });

      compareCard(players);

      // show card to all
      setShowDowm(true);
      updateGame({
        ...game,
        gameStatus: gameStatus.ALL_IN,
      });
    }
  }

  //  start game player turn timer by 15 sec
  useEffect(() => {
    if (
      game?.gameStatus === gameStatus.BETTING &&
      param.get("started") === "true"
    ) {
      // starting the player turn
      startTimer();
      //  checkLowBalance();

      // check for pot limit
      let isPotLimitExceeded = checkPodLimit();

      // //  make bot dessission
      if (
        game?.userIndex !== currentPlayerIndex &&
        isPotLimitExceeded &&
        param.get("gameType") === "Free"
      ) {
        //("Taking decission");
        takeDession();
      }
      return () => clearInterval(timerRef.current);
    }
  }, [currentPlayerIndex, game.gameStatus, started]);

  // end timer function.

  // action Buttons functions
  function getUnpackedUser() {
    let unpackedUses = game?.players
      .filter((e) => e.isAvailable)
      .filter((e) => e?.packed === false);
    return unpackedUses;
  }

  // action Buttons functions

  // pack user
  const packed = (isFromSocket = false) => {
    game.players[currentPlayerIndex].packUser();

    let leftPlayer = getUnpackedUser();

    // //("packed left Players", leftPlayer, game.players);
    if (leftPlayer.length <= 1) {
      // declear winner
      clearInterval(timerRef.current);
      setTimer(15);
      // // debugger;
      // console.log("yha se packed me se arrya", game?.players)
      awardPot(leftPlayer[0], isFromSocket);
    } else {
      setTimer(15);
      nextPlayer();
    }

    // update packed user
    const packedUser = game.players[currentPlayerIndex];

    updatePlayerSeenOrPacked("packed", packedUser?.playerId);

    // raising pack event
    if (param.get("gameType") !== "Free" && !isFromSocket) {
      const packPlayerGameEvent = {
        roomName: query.get("roomName"),
        EventCode: 6,
        SendTo: "Other", //__ Other/All
        CustomData: {
          //  here we provide all the data want to send.
          sendingUser: socket.id,
          playerTurn: {
            index: currentPlayerIndex,
            user: userData,
          },
        },
      };

      publish(raiseEvent, packPlayerGameEvent);
    }
  };

  const bet = (calledFromSocket = false, mode = "bet") => {
    // checking for chalLimit
    if (risedBetAmount > game.currentBet) {
      if (risedBetAmount > game?.chalLimit) {
        game.currentBet = game?.chalLimit;
      } else {
        game.currentBet = risedBetAmount;
      }
      // // debugger;
    }

    if (mode === "all-in") {
      const betPlayer = game.players[currentPlayerIndex];
      game.currentBet = betPlayer.chips;
    }

    // check if the player convert to seen from
    let previousIndex = preIndex();

    if (!game?.players[previousIndex].seen && !checkAllBlind()) {
      console.warn("current bet is doubled");
      game.currentBet = game.currentBet * 2;
    }

    // extra time for the animation
    setTimer((pre) => pre + 2);

    collectingAnimation(currentPlayerIndex, () => {
      const betPlayer = game.players[currentPlayerIndex];

      betPlayer.bet(game.currentBet);
      game.currentPot += game.currentBet;

      if (mode === "all-in") {
        betPlayer.setAllIn(true);
      }

      if (betPlayer?.chips <= 0 && mode !== "all-in") {
        if (betPlayer?.socketId === socket.id) setIsLowBalance(true); // only current match socket id's player will've popup
        packed();
      } else {
        setTimer(15);
        updateGame({
          ...game,
          mode,
        });
        CheckAllIn();
        nextPlayer();
      }
    });

    // raising bet event
    if (param.get("gameType") !== "Free" && !calledFromSocket) {
      const playerBetGameEvent = {
        roomName: query.get("roomName"),
        EventCode: 7,
        SendTo: "Other", //__ Other/All
        CustomData: {
          //  her we provide all the data want to send.
          sendingUser: socket.id,
          playerTurn: {
            index: currentPlayerIndex,
            user: userData,
          },
          currentBetAmount: game.currentBet,
          mode: mode,
        },
      };
      publish(raiseEvent, playerBetGameEvent);
    }
  };

  // handle low Balance
  const handleLowBalance = (calledFromSocket = false) => {
    setIsLowBalance(false); //todo
    GameManager.removePlayer(game, currentPlayerIndex);
    packed();

    // update event for low balance
    if (param.get("gameType") !== "Free" && !calledFromSocket) {
      const playerBetGameEvent = {
        roomName: query.get("roomName"),
        EventCode: 13,
        SendTo: "Other", //__ Other/All
        CustomData: {
          //  her we provide all the data want to send.
          sendingUser: socket.id,
        },
      };

      publish(raiseEvent, playerBetGameEvent);
    }
  };

  // pot limit exist

  // side show
  const handleSideShow = () => {
    // stop the timer
    clearInterval(timerRef.current);

    game.players[currentPlayerIndex].bet(game.currentBet);
    game.currentPot += game.currentBet;

    // set side show player
    let sideShowCurrentPlayer = game.players[currentPlayerIndex];
    let lastPlayerindex = currentPlayerIndex === 0 ? 3 : currentPlayerIndex - 1;

    while (
      game.players[lastPlayerindex].packed ||
      !game.players[lastPlayerindex].isAvailable
    ) {
      if (lastPlayerindex === 0) {
        lastPlayerindex = 3;
      } else {
        lastPlayerindex--;
      }
    }
    let sideShowPreviousPlayer = game.players[lastPlayerindex];
    game.sideShow = {
      status: true,
      user: {
        sender: sideShowCurrentPlayer,
        receiver: sideShowPreviousPlayer,
      },
    };

    // //("side show users", {
    //   status: true,
    //   user: {
    //     sender: sideShowCurrentPlayer,
    //     receiver: sideShowPreviousPlayer,
    //   },
    // });

    // showing animation and update the game
    collectingAnimation(currentPlayerIndex, () => {
      // update state for reflect
      //("handle side show",game)
      updateGame({ ...game });
      setTimer(15);
      setSideShowRequestReceiveUser(sideShowPreviousPlayer);
    });

    // request side show event publish

    if (param.get("gameType") !== "Free") {
      const sideShowRequestGameEvent = {
        roomName: query.get("roomName"),
        EventCode: 8,
        SendTo: "Other", // Other/All
        CustomData: {
          //  her we provide all the data want to send.
          sendingUser: socket.id,
          sideShow: {
            status: true,
            user: {
              sender: sideShowCurrentPlayer,
              receiver: sideShowPreviousPlayer,
            },
          },
          currentPlayerIndex: currentPlayerIndex,
          currentBet: game.currentBet,
        },
      };

      publish(raiseEvent, sideShowRequestGameEvent);
    }
  };


  const handleCancelSideShow = (calledFromSocket = false) => {
    //("cancel side Show", game.sideShow);
    game.sideShow = {
      status: false,
      user: {
        sender: {},
        receiver: {},
      },
    };
    updateGame({ ...game });
    setSideShowRequestReceiveUser(null);
    nextPlayer();
    //  cancel side show  event publish

    if (param.get("gameType") !== "Free" && !calledFromSocket) {
      const cancelSideShowEvent = {
        roomName: query.get("roomName"),
        EventCode: 10,
        SendTo: "Other", // Other/All
        CustomData: {
          //  her we provide all the data want to send.
          sendingUser: socket.id,
          currentPlayerIndex: currentPlayerIndex,
        },
      };

      publish(raiseEvent, cancelSideShowEvent);
    }
  };

  const _showDown = useCallback(() => {
   
      let [player1, player2] = getUnpackedUser();
      let higherRank = compareHand(player1.hand, player2.hand);
      let winner = {};
  
      if (higherRank) {
        winner = player1;
      } else {
        winner = player2;
      }
  
      const updatedPlayers = game?.players.map((player) => {
        if (
          player.playerId === player1.playerId ||
          player.playerId === player2.playerId
        ) {
          player.seeCards();
          player.seen = true;
          return player;
        }
        return player;
      });
  
      // console.log("updatedPlayers>>",updatedPlayers);
  
      setShowDowm(true);
  
      //  SHOW CARD TO ALL THE PLAYERS
      updateGame({
        ...game,
        players: updatedPlayers,
      });
  
      awardPot(winner);
    
  },[])

  const handleShowDown = () => {
    _showDown();
     
    if (param.get("gameType") !== "Free") {
      const _showDownRaiseEvent = {
        roomName: query.get("roomName"),
        EventCode: 17,
        SendTo: "Other", // Other/All
        CustomData: {
          //  her we provide all the data want to send.
          sendingUser: socket.id,
        },
      };
      publish(raiseEvent, _showDownRaiseEvent);
    }
    //  ("Winner....show down state..>>> ", winner, higherRank, player1, player2);
  };

  // declear winner and reset game
  function awardPot(winner, calledFromSocket) {
    console.log("awardPot>>", game?.players);
    // // debugger;
    if (param.get("gameType") !== "Free" && !calledFromSocket) {
      const sideShowRequestGameEvent = {
        roomName: query.get("roomName"),
        EventCode: 12,
        SendTo: "Other", // Other/All
        CustomData: {
          //  her we provide all the data want to send.
          sendingUser: socket.id,
          winner,
        },
      };
      publish(raiseEvent, sideShowRequestGameEvent);
    }

    const winnerC = game?.players.find(
      (prevPlayer) => prevPlayer?.uid === winner?.uid
    );

    setWinner(winnerC);

    gameSound.playWinSound();

    console.log("winnerC updatedChips ", winnerC);

    // console.log("updatedChips>>",updatedChips);
    collectingAnimation({ type: "winner", _id: winner?.playerId }, () => {
      // // debugger;
      // winnerC.chips += game.currentPot;
      console.log("winner prev ", winnerC);

      // // debugger;
      const updatedChips = game?.players?.map((player) => {
        if (player?.uid === winnerC?.uid) {
          player.chips += game.currentPot;
          return player;
        }
        return player;
      });

      updateGame({
        ...game,
        gameStatus: gameStatus?.ALL_PACKED,
        players: updatedChips,
      });

      // // debugger;
      resetGame();
    });

    // // debugger;
  }

  // reset the game after a round is complete.
  function resetGame() {
    setTimeout(() => gameSound.pauseWinSound(), 2000)
    game.currentPot = 0;
    game.currentBet = 0;
    game.currentPlayerIndex = game.dealerIndex;
    game.dealerIndex = (game.dealerIndex + 1) % game.players.length;
    game.mode = "bet";
    game.players.map((e) => {
      if (e.isNew || e.isAvailable) {
        e.reset();
      }
    });
    // nextPlayer();
    setRisedBetAmount(0);
    setShowDowm(false);
    setSideShowAccepted(false);
    updateGame({
      ...game,
      gameStatus: gameStatus?.WAITING,
    });
    // //("gameState after reset", game);
  }

  /**
   * @game bot take dessition on their turn
   */
  function takeDession() {
    let dession = desideBotAction();
    //("bot dession 1", dession);

    let getSecondDec = () => {
      let secondDec = desideBotAction();
      if (secondDec === botDession.SEE || secondDec === botDession.RISE) {
        return getSecondDec();
      }
      //("Bot second dession", secondDec);
      return secondDec;
    };

    let takeAction = (dession) => {
      switch (dession) {
        case botDession.BET:
          //("bet dession called");
          bet();
          return;
        case botDession.SEE:
          //("see dession called see");
          game?.players[currentPlayerIndex].seeCards();
          //  taking action after see the cards
          wait(1500, () => takeAction(getSecondDec()));
          break;
        case botDession.PACK:
          //("dession called Packed");
          packed();
          break;
        case botDession.SIDESHOW:
          //("dession called sideShow");

          handleSideShow();

          //("game from player dession", game);
          // // wait for more than 2 sec till the coin gave animation end.
          // if ((Math.floor(Math.random() * 100) % 2) === 0) {
          //   wait(7500, handleCancelSideShow);
          // } else {
          //   // wait(7500, handleCancelSideShow);
          //   wait(7500, handleAcceptSideShow);
          // }

          break;
        case botDession.RISE:
          setRisedBetAmount(game.currentBet * 2);
          //("dession called Rise");
          bet();
          break;

        default:
          break;
      }
    };

    // wait for taking the action so that feels like thinking\
    wait(2000, () => takeAction(dession));
  }

  // bot sideShow request handler
  useEffect(() => {
    // bot request for side show accept or reject
    if (param.get("gameType") === "Free") {
      if (
        sideShowRequestReceiveUser !== null &&
        sideShowRequestReceiveUser?.playerId !== game?.userIndex
      ) {
        if (Math.floor(Math.random() * 100) % 2 === 0) {
          wait(6000, handleCancelSideShow);
        } else {
          // wait(7500, handleCancelSideShow);
          wait(6000, handleAcceptSideShow);
        }
      }
    }
  }, [sideShowRequestReceiveUser]);

  function allIn() {
    // // debugger;
    // set current bet at max to the chal limit if all in then only incleased upto the chaal limit
    game.currentBet =
      game.players[currentPlayerIndex].chips > game?.chalLimit
        ? game?.chalLimit
        : game.players[currentPlayerIndex].chips;
    bet(false, "all-in");
  }

  // event emit
  //**startRaiseEvent */
  const startRaiseEvent = useCallback(
    (joinedUserData) => {
      //("user Jouned successfully !", joinedUserData);
    },
    [history, param.get("gameType")]
  );

  const changePlayerTurnRaiseEvent = useCallback(
    (CustomData) => {
      // currently not active.
    },
    [currentPlayerIndex]
  );

  const handlePlayerPackedRaiseEvent = useCallback(
    (CustomData) => {
      // // debugger;
      console.log("handlePlayerPackedRaiseEvent game?.players", game?.players);
      //("player packed event called . here is the data", CustomData);
      // if from socket dont call the event again.
      let isFromSocket = true;
      packed(isFromSocket);
    },
    [game?.players]
  );

  const handlePlayerBetRaiseEvent = useCallback(
    (CustomData) => {
      // // debugger;
      game.currentBet = CustomData.currentBetAmount;
      console.log("Player Bet Event index", CustomData);
      let calledFromSocket = true;

      updateGame({
        ...game,
        mode: CustomData.mode,
      });

      bet(calledFromSocket, CustomData.mode);
      //(" bet called on socket");
    },
    [bet, game.currentBet]
  );

  console.log("Game>>>>", game.mode);

  const handleRequestSideShowRaiseEvent = useCallback(
    (CustomData) => {
      let { sendingUser, sideShow, currentPlayerIndex, currentBet } =
        CustomData;

      clearInterval(timerRef.current);
      game.players[currentPlayerIndex].bet(currentBet);

      game.sideShow = sideShow;

      collectingAnimation(currentPlayerIndex, () => {
        // update state for reflect
        updateGame({ ...game });
        setTimer(15);
        setSideShowRequestReceiveUser(sideShow.user.receiver);
      });
    },
    [collectingAnimation, game.players]
  );

  const handleAcceptSideShow = (calledFromSocket) => {
    // // debugger;
    let player1 = game?.sideShow?.user?.sender;
    let player2 = game?.sideShow?.user?.receiver;
    //(player1, player2);

    let higherRank = compareHand(player1.hand, player2.hand);

    if (higherRank) {
      player2.packed = true;
    } else {
      player1.packed = true;
    }
    
    // setShowDowm();
    // updating player status in the game player object.
    setSideShowAccepted(true);

    game.players = game.players.map((e) => {
      if (e.uid === player1.uid) {
        e.packed = player1.packed;
      } else if (e.uid === player2.uid) {
        e.packed = player2.packed;
      }
      if(e.uid === player2.uid) {
         e.seen = true;
      }
      return e;
    });

    game.sideShow = {
      status: false,
      user: {
        sender: {},
        receiver: {},
      },
    };

    setTimeout(() => {
      game.players = game.players.map((e) => {
        if(e.packed) {
          e.seen = false;
          e.hand = []
        }
        return e;
      });
      updateGame({ ...game });
     },2500);

    if (param.get("gameType") !== "Free") {
      //("event emites accept sideshow");

      const acceptSideShowEvent = {
        roomName: query.get("roomName"),
        EventCode: 9,
        SendTo: "Other", // Other/All
        CustomData: {
          //her we provide all the data want to send.
          sendingUser: socket.id,
          player : player1
          // currentPlayerIndex: newIndex,
        },
      };

      publish(raiseEvent, acceptSideShowEvent);
    }

    setTimer(15);
    updateGame({ ...game });
    let newIndex = nextPlayer();
    updatePlayer(newIndex);
    setSideShowRequestReceiveUser(null);
    //("sideShow from game game....>>", newIndex);
    // request side show accept event publish
  };


  const handleAcceptSideShowRaiseEvent = useCallback(
    (CustomData) => {
     
      // alert("event emited");
      let player1 = game?.sideShow?.user?.sender;
      let player2 = game?.sideShow?.user?.receiver;

      //("sideShow from game game....>>", game.sideShow);
      //(player1, player2);

      let higherRank = compareHand(player1.hand, player2.hand);

      if (higherRank) {
        player2.packed = true;
      } else {
        player1.packed = true;
      }

      // updating player status in the game player object.
      // // debugger;
      const isSendingUser = CustomData?.player?.uid === userData?.uid;

      if(isSendingUser) setSideShowAccepted(true);

      // const {player} = CustomData;
      game.players = game.players.map((e) => {
        if (e.uid === player1.uid) {
          e.packed = player1.packed;
        } else if (e.uid === player2.uid) {
          e.packed = player2.packed;
        }
        if(isSendingUser && e.uid === player2.uid) {
          e.seen = true;
        }
        return e;
      });

      game.sideShow = {
        status: false,
        user: {
          sender: {},
          receiver: {},
        },
      };
    
    
      if(isSendingUser) {
        setTimeout(() => {
        game.players = game.players.map((e) => {
          if(e.packed) {
            e.seen = false;
            e.hand = []
          }
          return e;
        });
        updateGame({ ...game });
       },2500);
      }

      
      setTimer(15);
      // setCurrentPlayerIndex(CustomData.currentPlayerIndex);
      setSideShowRequestReceiveUser(null);

      updateGame({ ...game });
      const newIndex = nextPlayer();
      updatePlayer(newIndex);
      // let calledFromSocket = true
      // handleAcceptSideShow(calledFromSocket);
    },
    [
      game,
      currentPlayerIndex,
      nextPlayer,
      setSideShowRequestReceiveUser,
      updateGame,
      compareHand,
      setCurrentPlayerIndex,
    ]
  );

  console.log("next player index after accept event", currentPlayerIndex);

  const handleCancelSideShowRaiseEvent = useCallback(
    (CustomData) => {
      // handleCancelSideShow();
      // alert(" cancelling sideshow");
      game.sideShow = {
        status: false,
        user: {
          sender: {},
          receiver: {},
        },
      };
      updateGame({ ...game });
      setSideShowRequestReceiveUser(null);
      nextPlayer();

      // let calledFromSocket = true;
      // handleCancelSideShow(calledFromSocket);
    },
    [game.sideShow, nextPlayer, updateGame, setSideShowRequestReceiveUser]
  );

  const handleSeenPlayerCardRaiseEvent = useCallback(
    (CustomData) => {
      let { player } = CustomData;
      game?.players.forEach((p) => {
        if (player.uid === p.uid) {
          p.seeCards();
        }
      });
      setSideShowAccepted(false);
      const updatePlayers = GameManager.getPlayers(game);
      updateGame({
        ...game,
        players : updatePlayers
      })
    },
    [game?.players]
  );

  const handleShowDownCardRaiseEvent = useCallback(
    (CustomData) => {
      // // debugger;
      console.log("handleShowDownCardRaiseEvent>");
      const { winner } = CustomData;
      let calledFromSocket = true;
      awardPot(winner, calledFromSocket);
    },
    [game?.players]
  );

  const hadleCardDistribution = useCallback(
    (CustomData) => {
      const players = game?.players;
      players.forEach((player, idx) => {
        if (player.isAvailable) {
          player.setCard(CustomData.cards[idx]);
        }
      });
      updateGame({ ...game });
    },
    [gameUtils, game?.players]
  );

  // player not have enougn coin to play
  // pot limit exist
  const handleNewPlayerIndex = useCallback(
    (CustomData) => {
      console.log("my data with index", CustomData);
      const { playerEnter, players } = CustomData;
      if (playerEnter?.uid === userData?.uid) {
        players.forEach((prev_player, i) => {
          GameManager.addPlayer(game, i, prev_player);
        });
        updateGame({
          ...game,
        });
      }
    },
    [userData?.uid]
  );

  // user
  const handleLowBalanceRaiseEvent = useCallback((CustomData) => {
    let calledFromSocket = true;
    handleLowBalance(calledFromSocket);
  }, []);

  // handleGetPlayerMessage
  const handleGetPlayerMessage = useCallback((CustomData) => {
     setChatMessage(CustomData?.payload);

     setTimeout(() => {
      setChatMessage(null);
    },2000)
  },[]);

  // handle events functions
  const handleRaisedEvents = useCallback(
    (eventData) => {
      const data = eventData.detail;
      if (!data) return;
      const { EventCode, CustomData } = data;
      if (CustomData?.sendingUser !== socket.id) {
        if (EventCode === 3) startRaiseEvent(CustomData);
        if (EventCode === 4) handleStartGame(CustomData);
        if (EventCode === 5) changePlayerTurnRaiseEvent(CustomData);

        // game play events
        // pack
        if (EventCode === 6) handlePlayerPackedRaiseEvent(CustomData);

        // bet
        if (EventCode === 7) handlePlayerBetRaiseEvent(CustomData);

        // request sideShow
        if (EventCode === 8) handleRequestSideShowRaiseEvent(CustomData);

        // accept side Show
        if (EventCode === 9) handleAcceptSideShowRaiseEvent(CustomData);

        // cancel side show
        if (EventCode === 10) handleCancelSideShowRaiseEvent(CustomData);

        // seen
        if (EventCode === 11) handleSeenPlayerCardRaiseEvent(CustomData);

        // show down
        if (EventCode === 12) handleShowDownCardRaiseEvent(CustomData);

        // handle low balance
        if (EventCode === 13) handleLowBalanceRaiseEvent(CustomData);

        // hadle card distribution among the players
        if (EventCode === 14) hadleCardDistribution(CustomData);

        // get new player index
        if (EventCode === 15) handleNewPlayerIndex(CustomData);

        // message event
        if (EventCode === 20) handleGetPlayerMessage(CustomData);
        
        // show down raise event
        if (EventCode === 17) _showDown(CustomData);
        
      }
    },
    [
      startRaiseEvent,
      handlePlayerBetRaiseEvent,
      handlePlayerPackedRaiseEvent,
      handleShowDownCardRaiseEvent,
    ]
  );

  //("game pkyaers", game?.players);
  const canStart = useCallback(() => {
    // // debugger;
    const game_type = gameType === "Private" || gameType === "Quick";
    const isCreator = userData?.isCreator;
    const roomLength = roomPlayers?.length;
    const isStarted = param.get("started") === "false";
    const canStart = game_type && isCreator && roomLength >= 2 && isStarted;
    return canStart;
  }, [userData?.isCreator, gameObj?.players]);

  useEffect(() => {
    if (canStart()) {
      let to = setTimeout(() => {
        handleSetLocalRoomPropertyByCreator(userData, query.get("roomName"));
        handleStartGame();
        const startGameEvent = {
          roomName: query.get("roomName"),
          EventCode: 4,
          SendTo: "Other", // Other/All
          CustomData: {
            //  her we provide all the data want to send.
            sendingUser: socket.id,
            // startTurn: gameObj?.token, // it a color type ,
          },
        };
        publish(raiseEvent, startGameEvent);
      }, 1000);
      return () => clearTimeout(to);
    }
  }, [canStart, userData?.isCreator, roomPlayers]);

  /**
   * @handleOnPlayerLeftRoom
   */
  const handleOnPlayerLeftRoom = useCallback((data) => {
    const response = data.detail;
    const leftPlayer = response?.leftPlayer;
    const { players,roomCustomPropertiesForLobby } = response.roomBase;
   
    // const playerLen = players?.length;
    const isOpen = roomCustomPropertiesForLobby?.isOpen;

    if(isOpen === false) {
      handleCreateLocalRoomPropertyLobbyByCreator(
        userData,
        param.get("roomName"),
        {
          ...roomCustomPropertiesForLobby,
        },
        true
      )
    }
    
    console.log("**handleOnPlayerLeftRoom**", game.players, players);

    // re-update room players
    dispatch(setGamePlayers(players?.filter(player => player?.isConnected)));

    // update player availablity
    const updatedPlayers = game?.players.map((player) => {
      if (player?.uid === leftPlayer?.uid) {
        player.isAvailable = leftPlayer.isConnected;
        player.isNew  = false;
        return player;
      }
      return player;
    });

    // update game state
    updateGame({
      ...game,
      players: updatedPlayers,
    });

    showToast("info", `${leftPlayer?.nickname} has left the room`);
  },[game?.players]);

  /**
   * @handleOnPlayerEnterRoom
   */
  const handleOnPlayerEnterRoom = useCallback((data) => {
    const response = data.detail;
    const playerEnter = response?.playerEnter;
    const { players ,roomCustomPropertiesForLobby } = response.roomBase;
    const connectedPlayers = players?.filter(player => player?.isConnected)

    // re-update room players
    dispatch(setGamePlayers(connectedPlayers));


    const playerLen = connectedPlayers?.length;
    const isOpen = roomCustomPropertiesForLobby?.isOpen;

    
    if(isOpen && playerLen === 4) {
      console.log("roomCustomPropertiesForLobby>>",roomCustomPropertiesForLobby)
      // const lobbyData = {...roomCustomPropertiesForLobby};
      // lobbyData.isOpen = false;
      handleCreateLocalRoomPropertyLobbyByCreator(
        userData,
        param.get("roomName"),
        {
          ...roomCustomPropertiesForLobby,
        },
        false
      )
    } 

    setNewPlayerEnter(!newPlayerEnter);

    // find if player is already exist
    const prev_players = gameObj?.players.find(
      (player) => player?.uid === playerEnter.uid
    );

    // TODO ---> UPDATE ALREADY EXIST PLAYERS
    if (prev_players) {
      // iterate and filter exist plaerys
      const updatedPlayers = game?.players.map((player) => {
        if (player?.uid === playerEnter?.uid) {
          player.isAvailable = playerEnter.isConnected;
          return player;
        }
        return player;
      });

      // update game state
      updateGame({
        ...game,
        players: updatedPlayers,
      });
    } else if (param.get("started") === "true") {
      // TODO ---> ADD NEW PLAYER
      // // debugger;

      // find available positions in running game
      // debugger;
      const availablePositions = game?.players
        .map((player, index) => {
          if (player?.isAvailable === false && player?.isNew === false) {
            return index;
          }
          return -1;
        })
      .filter((position) => position !== -1);

       
      if (availablePositions.length > 0) {
        // find random index
        const getPosition = availablePositions[0];

        console.log("availablePositions>>>",availablePositions);
        //  alert(getPosition);
        // add new player
        handleAddPlayer(playerEnter, getPosition);
      }
    }
  },[game?.players]);

  // useEffect(() => {
  //   console.log("gameObj?.userIndex", game?.userIndex);
  // }, [game]);

  /** deserialize Game Session */
  const gameSession = getFromSessionStorage("gameSession");
  useEffect(() => {
    if (eventMessage === "Re Join Room" && gameObj?.players) {
      const started = param.get("started");
      if (started === "true") {
        deserializeGameSession(gameSession, gameObj?.players);
      }
    }
  }, [eventMessage, gameObj?.players]);

  /**
   * @handleReConnection
   */
  const handleReConnection = () => {
    const user = getFromSessionStorage("user");
    // //("client re connected to server", socket.id)
    publish(reJoinRoom, {
      roomname: param.get("roomName"),
      uid: userData?.uid || user?.uid,
      roomPassword: "abc123",
    });
  };

  /**
   * @handleOnRoomJoin
   */
  const handleOnRoomJoin = (eventData) => {
    const { success, message, data } = eventData.detail;
    console.log("handle rejoin room", eventData.detail);
    if (success && message === "Re Join Room") {
      seteventMessage("Re Join Room");
      const roomData = data;
      const roomPlayers = roomData.players;
      const roomCreator = roomData.roomCreator;
      const getMe = roomPlayers.find((player) => player.socketId === socket.id);

      dispatch(setGamePlayers(players?.filter(player => player?.isConnected)));

      // ** set userData to redux state
      dispatch(
        setUserData({
          ...getMe,
          isCreator: roomCreator.socketId === socket.id,
        })
      );
    } else {
      // todo
    }
  };

  /**
   * @handleRoomJoinField
   */
  const handleonJoinRoomFailed = useCallback((eventData) => {
    console.log("handle rejoin failed room", eventData.detail);
  },[])

  /**
   * @handleGetRoomProperties
   */
  const handleGetRoomProperties = useCallback(
    (eventData) => {
      const { success, data } = eventData.detail;
      // // debugger;
      // console.log("OnGetRoomPlayers",eventData.detail,gameObj?.players);
      if (success && data) {
        // const updatePlayers = data?.players;
        // const newPlayers = gameObj?.players;
        // const newPlayersData = updatePlayers.map((prevPlayer, i) => {
        //     if(newPlayers[i]) {
        //        return {
        //         username: newPlayers[i].nickname,
        //         chips: prevPlayer.chips,
        //         avatar: profile0,
        //         isAvailable: newPlayers[i].isConnected,
        //         isNew: false,
        //         socketId: newPlayers[i].socketId,
        //         uid: newPlayers[i].uid,
        //         _id: newPlayers[i]._id,
        //        }
        //     }
        //     return prevPlayer;
        // });
        // // newPlayersData.forEach((e, i) => {
        // //   GameManager.addPlayer(game, i, newPlayersData[i]);
        // // });
        // updateGame({
        //   ...game,
        //   players : newPlayersData
        // })
      }
    },
    [gameObj?.players]
  );

  /**
   * @OnGetRoomPlayers
   */
  // const OnGetRoomPlayers = useCallback(eventData => {
  //    const {success, data} = eventData.detail;
  //    console.log("OnGetRoomPlayers",eventData.detail);
  //    if(success && data) {
  //    }
  // })

  useEffect(() => {
    // raise a event for start the game play.
    subscribe(onJoinRoomFailed, handleonJoinRoomFailed);
    subscribe(OnConnectToMaster, handleReConnection);
    subscribe(onRaiseEvent, handleRaisedEvents);
    subscribe(onJoinRoom, handleOnRoomJoin);
    subscribe(OnPlayerLeftRoom, handleOnPlayerLeftRoom);
    subscribe(OnPlayerEnterRoom, handleOnPlayerEnterRoom);
    // subscribe(OnPlayerList, OnGetRoomPlayers);
    subscribe(onGetRoomProperties, handleGetRoomProperties);
    
    return () => {
      unsubscribe(OnConnectToMaster, handleReConnection);
      unsubscribe(onRaiseEvent, handleRaisedEvents);
      unsubscribe(onJoinRoom, handleOnRoomJoin);
      unsubscribe(onJoinRoomFailed, handleonJoinRoomFailed);
      unsubscribe(OnPlayerLeftRoom, handleOnPlayerLeftRoom);
      unsubscribe(OnPlayerEnterRoom, handleOnPlayerEnterRoom);
      unsubscribe(onGetRoomProperties, handleGetRoomProperties);
      // unsubscribe(OnPlayerEnterRoom, (eventData) => handleOnPlayerLeftRoom(eventData , 'Enter'));
    };
  }, [
    handleonJoinRoomFailed,
    handleRaisedEvents,
    handleOnRoomJoin,
    handleOnPlayerLeftRoom,
    handleOnPlayerEnterRoom,
    handleGetRoomProperties,
  ]);

  // useEffect(() => {
  //   if(userData?.uid) {

  //   }
  // },[userData?.uid,param])

  // //("game?.userIndex === currentPlayerIndex", game?.userIndex, currentPlayerIndex);

  return (
    <div
      className={`${
        roomType === "unlimited" ? "vvipRoom" : roomType
      } bg-cover relative`}
    >
      {showPotLimitMessage && <PotLimitMessage />}

      <GameInfoModal
        show={showGameInfo}
        onClose={onCloseGameInfo}
        title={roomsTypes[roomType]}
        game={game}
      />

      {notificationText && (
        <Notification
          text={notificationText}
          notificationRef={notificationRef}
        />
      )}

      {/* action info buttons (chat, setting, info, back to loby) */}
      <ActionInfoButtons
        setOpenSetting={setOpenSetting}
        setShowInformation={setGameInfo}
        handleBack={handleBack}
        setOpenChatModal={setOpenChatModal}
      />

      {/* player containers */}
      <div className="players-container lg:top-[55%] md:top-[55%] sm:top-[55%] left-[50%]">
        {game.players?.map((player, i) => {
          return player?.isAvailable ? (
            <Player
              key={player?.playerId}
              player={player}
              winner={winner}
              game={game}
              sideShow={game.sideShow}
              isUser={game?.userIndex === i}
              status={game.gameStatus}
              isShowDown={isShowDown}
              updatePlayerSeenOrPacked={updatePlayerSeenOrPacked}
              packed={packed}
              chatMessage={chatMessage}
              sideShowAccepted={sideShowAccepted}
              setSideShowAccepted={setSideShowAccepted}
            />
          ) : //player who are new and about to add in the game in next round
          player?.isNew ? (
            <Player key={player?.playerId} player={player} />
          ) : (
            <EmptyPlayerCard
              key={i}
              handleClick={() => handleAddPlayer(i)}
              player={player}
            />
          );
        })}

        {/* delaer cards */}
        <div>
          {game?.gameStatus !== gameStatus.BETTING ? (
            <DealerCards players={game?.players} />
          ) : null}
          {/* <DealerCards cards={cards} /> */}
        </div>

        {/* total POT ammounts */}
        <>
          <div className="absolute left-[48.5%] lg:left-[45%] sm:left-[45%] md:left-[46%] top-[33%]">
            {/* chips , add total chips image*/}
            <ChipsCard type={"all"} amount={game?.currentPot || 0} />
          </div>
        </>

        {/* dummy chips */}
        <div className="dummy-chips ">
          {game?.players?.map((player) => {
            return (
              <div
                key={`player-chips-${player?.playerId}`}
                className={`player-chips  player-chips-${player?.playerId} absolute w-24 h-6 text-center text-white
              `}
              >
                <ChipsCard
                  type={"add"}
                  amount={
                    game?.currentBet !== 0 ? game?.currentBet : game?.bootAmount
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      {/*game action buttons*/}
      {/* <div className="bg-red-300 text-white">
        {game?.userIndex} {currentPlayerIndex}{" "}
      </div> */}

      <div>
        {isMyTurn && game?.gameStatus === gameStatus.BETTING && (
          <ActionButtons
            packed={packed}
            bet={bet}
            game={game}
            openRiseBet={openRiseBet}
            setOpenRiseBet={setOpenRiseBet}
            currentPlayerIndex={currentPlayerIndex}
            risedBetAmount={risedBetAmount}
            setRisedBetAmount={setRisedBetAmount}
            getUnpackedUser={getUnpackedUser}
            handleSideShow={handleSideShow}
            handleShowDown={handleShowDown}
            allIn={allIn}
          />
        )}
      </div>

      {/* Chat Modal */}
      <CustomChatModal userData={userData} show={openChatmodal} onClose={setOpenChatModal} setChatMessage={setChatMessage}/>

      {/* low Balance modal */}
      {isLowBalance && (
        <LowBalancemodal
          show={isLowBalance}
          title={"Low Balance"}
          onClose={handleLowBalance}
        />
      )}

      {/* notification Modal  */}
      <InformationModal
        show={showInformation}
        title={"Information"}
        information={information}
        onClose={() => setShowInformation(false)}
      />

      {/* conform modal */}
      {sideShowRequestReceiveUser?.playerId === game?.userIndex && (
        <ConformModal
          show={sideShowRequestReceiveUser?.playerId === game?.userIndex}
          title={"Request a side show"}
          onClose={handleCancelSideShow}
          onAccept={handleAcceptSideShow}
        />
      )}

      {/* setting modal */}
      <SettingModal show={openSetting} onClose={setOpenSetting}></SettingModal>
    </div>
  );
}

export default GameBoard;
