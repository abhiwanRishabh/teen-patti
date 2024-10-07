/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../../components/button/Button";
import PlayerCard from "../../components/cards/PlayerCard";
import sideShowIcon from "../../assets/icons/sideShow.svg";

import packIcon from "../../assets/icons/pack.svg";
import betIcon from "../../assets/icons/bet.svg";
import riseIcon from "../../assets/icons/rise.svg";

import iIcon from "../../assets/icons/i.svg";
import settingIcon from "../../assets/icons/setting.svg";
import messageIcon from "../../assets/icons/message.svg";

import profileIcon2 from "../../assets/profiles/profile2.svg";
import profileIcon3 from "../../assets/profiles/profile3.png";
import profileIcon4 from "../../assets/profiles/profile4.svg";
import profileIcon5 from "../../assets/profiles/profile5.png";

import { useCallback, useEffect, useRef, useState } from "react";
import ChipsCard from "../../components/cards/ChipsCard";
import EmptyPlayerCard from "../../components/cards/EmptyPlayerCard";
import Notification from "../../components/notification/Notification";
import BetRise from "../../components/screens/components/BetRise";
import GameInfoModal from "../../components/Modal/GameInfoModal";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CustomChatModal from "../../components/Modal/CustomChatModal";
import { createNewGame } from "../../utils/game";
import wait from "../../utils/timer";
import { gameStatus } from "../../constants/states";

import LowBalancemodal from "../../components/Modal/LowBalancemodal";
import InformationModal from "../../components/Modal/InformationModal";
import ConformModal from "../../components/Modal/ConformModal";
import SettingModal from "../../components/Modal/SettingModal";


const roomsTypes = {
  silverRoom: "Silver",
  goldRoom: "Gold",
  platinumRoom: "Platinum",
  vipRoom: "VIP",
  vvipRoom: "VVIP",
  unlimited: "Unlimited"
}

// dummy information
let information = "subho ipsum dolor sit amet consectetur adipisicing elit. Quam, eligendi. Impedit magnam magni harum eum illum molestiae soluta quia maxime et, similique cum esse vel numquam possimus atque veritatis. Omnis reprehenderit dolores voluptate, odio excepturi nesciunt ipsum saepe nihil nostrum laboriosam ipsam, minus reiciendis magnam pariatur velit dicta praesentium distinctio! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, eligendi. Impedit magnam magni harum eum illum molestiae soluta quia maxime et, similique cum esse vel numquam possimus atque veritatis. Omnis reprehenderit dolores voluptate, odio excepturi nesciunt ipsum saepe nihil nostrum laboriosam ipsam, minus reiciendis magnam pariatur velit dicta praesentium distinctio!"


const Board = () => {
  const [showGameInfo, setGameInfo] = useState(true);
  const [openRiseBet, setOpenRiseBet] = useState(false);
  const [openChatmodal, setOpenChatModal] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const [gameupdate, setGameUpdate] = useState(false);

  const { roomType } = useSelector((state) => state.game);
  const history = useHistory();

  const [isFreePlay, setIsFreePlay] = useState(true)
  const [mainGame, updateMainGame] = useState(null);

  const [notificationText, setNotificationText] = useState(null);
  const notificationRef = useRef();
  const [currentPlayer, setCurrentPlayer] = useState(0);

  // bet states
  const [currentBetValue, setCurrentBetValue] = useState(null);

  const [playerBettingIndex, setPlayerBettingIndex] = useState(1);



  // modal states
  const [isLowBalance, setIsLowBalance] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [openSetting, setOpenSetting] = useState(false);
  const [sideShowRequest, setSideShowRequest] = useState(false); // used for conform modal



  // const currentPlayer =1
  
  const handleBack = () => {
    history.push("/home");
  }

  const showNotification = (text) => {
    setNotificationText(text);

    wait(2000, () => {
      setNotificationText(null);
    })
  };

  const placeBet = (amount) => {
    if (mainGame.gameStatus === gameStatus.betting) {
      // setTimeout(() => {
      // mainGame.nextPlayer();
      mainGame.placeBet();
      setCurrentPlayer(mainGame?.getCurrentPlayer());
      // }, 1000)
      //("bet called", amount)
    }
  };

  const pack = () => {
    // mainGame.currentPlayerIndex
    //("packed called.");
    mainGame?.pack();
    // mainGame.nextPlayer();
    // setCurrentPlayer(mainGame?.getCurrentPlayer());
    setGameUpdate((pre) => !pre)
  }

  const handleShowDown = () => {
    let currentPlayer = mainGame.players[mainGame.currentPlayerIndex];
    let nextPlayer = mainGame.players[(mainGame.currentPlayerIndex + 1) % mainGame.players.length];
    mainGame?.showDown(currentPlayer, nextPlayer);
    setGameUpdate((pre) => !pre)
  }

  const handleRequestSideShow = () => {
    mainGame?.requestSideShow();
    setSideShowRequest(true);
    // //("mainGame after SideShow", mainGame)
  }

  const handleSideShow = () => {
    // alert("side show accepted")
    mainGame?.acceptSideShow();
    // setSideShowRequest(false);
    setSideShowRequest(false);
  };

  const handleCancelSideShow = () => {
    mainGame?.cancelSideShow();
    setSideShowRequest(false);
  }

  const handleAddPlayer = (position) => {
    mainGame.addPlayer(`user${Math.random() * 100}`, 60900, position);
    setGameUpdate((pre) => !pre)
    // updateMainGame(Object.create(mainGame));
    // //(mainGame)
   
  }


  // //(mainGame)
  const handleShow = () => {
    setGameUpdate((pre) => !pre);
  }


  // useEffect(() => {
  // updateMainGame(mainGame)
  // }, [mainGame?.gameStatus])

  // useEffect(() => {
  //   gameStart && gameStart();
  //   setNotificationText("Starting the Game.")
  //   wait(3000, () => {
  //     setNotificationText(null);
  //     // se(false);
  //   })
  // }, [])

  // const startGame = () => {
  //   game.startGame();
  //   setGameStarted(true);
  //   setCurrentPlayer(game.getCurrentPlayer());
  // };

  // const placeBet = () => {
  //   game.placeBet();
  //   setGame({ ...game });
  // };

  // useEffect(()=>{
  //   updateMainGame(new MainGame())
  // },[])


  // player turn change 

  const changeTurn = () => { };

  useEffect(() => {

    let timer;
    if (mainGame?.gameStatus === "betting") {
      setCurrentPlayer(mainGame.getCurrentPlayer());

      // if (timer) {
      //   clearInterval(timer)
      // }

      timer = setInterval(() => {
        mainGame.pack();
        updateMainGame((prev) => {
          return prev;
        })

        //("turn changed game....>>>> ", mainGame)
        setCurrentPlayer(mainGame.getCurrentPlayer());
        // //(mainGame.getCurrentPlayer(), mainGame.currentPlayerIndex, currentPlayer);
      }, 8000);

    }

    return () => clearInterval(timer);
  }, [mainGame?.gameStatus])


  // ** fun for collect boot ammount
  const collectBootAmmount = useCallback(() => {
    showNotification("Collecting boots...");
    // mainGame?.collectBoot();
    updateMainGame(prev => {
      prev.gameStatus = gameStatus.dealing;
      return prev;
    })
  }, []);

  // ** game start and collect boot amount
  function gameStart() {
    setGameInfo(false);
    updateMainGame(createNewGame(4));
    setCurrentBetValue(mainGame?.bootAmount);
    showNotification("Starting the Game...");
    // mainGame?.collectBoot();
    setTimeout(collectBootAmmount, 4000)
  }

  // invoke collect boot
  useEffect(() => {
    if (mainGame?.gameStatus === gameStatus.dealing) {
      mainGame?.collectBoot();
    }
    setGameUpdate(pre => !pre)
  }, [mainGame?.gameStatus])



  useEffect(() => {
    if (mainGame?.gameStatus === gameStatus.showdown) {
      gameStart();
      // alert("restarting game")

    }

  }, [mainGame?.gameStatus]);

  return (
   <div className={`${roomType} bg-cover relative`}>
    {/* game info Modal , title should be the game selected mode */}
    <GameInfoModal show={showGameInfo} onClose={gameStart} title={roomsTypes[roomType]} />

    {/* notification */}
    {(notificationText !== null) && <Notification text={notificationText} notificationRef={notificationRef} />}

    {/* upper buttons */}
    <div className="fixed lg:left-10 lg:top-4 sm:left-4 sm:top-2 cursor-pointer z-10">
      <button className="buttonCancel shadow-lg cursor-pointer lg:text-lg sm:text-xs " onClick={handleBack}>Exit to lobby</button>
    </div>

    <div className="fixed right-10 top-4 flex flex-col gap-6 z-10" >

      <Button icon={settingIcon} className="lg:w-12 lg:h-12 sm:w-8 sm:h-8 " iconStyle={"sm:mt-0.5"} handleClick={() => {
        setOpenSetting(true);
      }} ></Button>

      <Button icon={iIcon} className="lg:w-12 lg:h-12 sm:w-8 sm:h-8 " iconStyle={"lg:w-1.5 lg:ml-4 sm:w-1 sm:ml-2 sm:mt-1"} handleClick={() => {
        setShowInformation(true);
      }}></Button>

    </div>

    <div className="fixed lg:right-32 sm:right-24 top-4 z-10">
      <Button icon={messageIcon} className="lg:w-12 lg:h-12 sm:w-8 sm:h-8 " iconStyle={"lg:mt-2 sm:mt-1"} handleClick={() => {
        setOpenChatModal(true);
      }}></Button>
    </div>

    {/* chip spread animation */}

    <div className="absolute sm:top-[45vh] sm:left-[45vw] lg:top-[45vh] lg:left-[48vw]" >
      {/* chips */}
      <ChipsCard type={"all"} amount={mainGame?.currentPot || 0} />
    </div>

    {/* players position */}

    <div className="relative z-0">
      <div className="w-7/12 sm:w-4/6  flex justify-between m-auto relative lg:top-[36vh] sm:top-[28vh]">
        {mainGame?.players[0] ?
          <PlayerCard
            userIcon={profileIcon2}
            playerPosition={1}
            showCards={showCards}
            handleShow={handleShow}
            // showGameInfo={showGameInfo}
            player={mainGame?.players[0]}
            gameStatus={mainGame.gameStatus}
            currentPlayerIndex={mainGame.currentPlayerIndex}
            currentPlayer={currentPlayer}
            mainGame={mainGame}
            playerBettingIndex={playerBettingIndex}
          ></PlayerCard>

          : <EmptyPlayerCard handleClick={() => handleAddPlayer(0)} />}

        {/* {mainGame?.players[1] ? <PlayerCard userIcon={profileIcon3} playerPosition={2} showGameInfo={showGameInfo} player={mainGame?.players[1]}></PlayerCard> : <EmptyPlayerCard handleClick={() => handleAddPlayer(1)} />} */}
        {mainGame?.players[1] ? <PlayerCard
          userIcon={profileIcon3}
          playerPosition={2}
          showCards={showCards}
          handleShow={handleShow}
          // showGameInfo={showGameInfo}
          player={mainGame?.players[1]}
          gameStatus={mainGame.gameStatus}
          currentPlayerIndex={mainGame.currentPlayerIndex}
          currentPlayer={currentPlayer}
          mainGame={mainGame}
          playerBettingIndex={playerBettingIndex}
        />
          :
          <EmptyPlayerCard handleClick={() => handleAddPlayer(1)} />}
      </div>

      <div className=" lg:w-2/6 sm:w-3/6 flex justify-between m-auto relative lg:top-[58vh] sm:top-[38vh]  mdTop">

        {mainGame?.players[3] ? <PlayerCard
          userIcon={profileIcon5}
          playerPosition={3}
          showCards={showCards}
          handleShow={handleShow}
          // showGameInfo={showGameInfo}
          player={mainGame?.players[3]}
          gameStatus={mainGame.gameStatus}
          currentPlayerIndex={mainGame.currentPlayerIndex}
          currentPlayer={currentPlayer}
          mainGame={mainGame}
          playerBettingIndex={playerBettingIndex}
        ></PlayerCard> : <EmptyPlayerCard handleClick={() => handleAddPlayer(3)} />}

        {
          mainGame?.players[2] ? <PlayerCard
            userIcon={profileIcon4}
            playerPosition={4}
            showCards={showCards}
            handleShow={handleShow}
            // showGameInfo={showGameInfo}
            player={mainGame?.players[2]}
            gameStatus={mainGame.gameStatus}
            currentPlayerIndex={mainGame.currentPlayerIndex}
            currentPlayer={currentPlayer}
            mainGame={mainGame}
            playerBettingIndex={playerBettingIndex}
          />
            :
            <EmptyPlayerCard handleClick={() => handleAddPlayer(2)} />}

      </div>
    </div>

    {/*below buttons */}
    {/* pack button */}
    <div className="fixed lg:right-60 sm:right-32  bottom-6">
      <Button rounded icon={packIcon} text={"Pack"} className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 glowsize" iconStyle={" md:pl-[5px] md:pt-[6px] sm:pl-[5px] sm:pt-[6px]"}
        // handleClick={mainGame?.currentPlayerIndex === mainGame?.userIndex ? pack : () => { }}
        handleClick={pack}
      ></Button>
    </div>

    {/* bet button */}
    <div className="fixed lg:right-36 sm:right-20 bottom-6">
      <Button rounded icon={betIcon} text={"Bet"} className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 glowsize " iconStyle={" md:pl-[5px] md:pt-[6px] sm:pl-[5px] sm:pt-[6px]"} handleClick={() => {
        // mainGame.currentPlayerIndex === mainGame.userIndex && 
        setPlayerBettingIndex(mainGame.currentPlayerIndex)
        placeBet()
      }} ></Button>
    </div>

    {/* rise button */}

    <div className="fixed lg:right-14 sm:right-8  bottom-6 z-30">

      {/* Bet Rise POPUP */}
      {/* assumed that my player is the last one*/}

      {openRiseBet && <BetRise currentBetValue={currentBetValue} curr max={mainGame.players[mainGame.players.length - 1].chips} min={mainGame.currentBet} mainGame={mainGame} />}

      <Button rounded icon={riseIcon} text={"Raise"} className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 glowsize" iconStyle={`md:pl-[5px] md:pt-[6px] sm:pl-[5px] sm:pt-[6px] ${openRiseBet ? "rotate-180" : ""}`} handleClick={() => setOpenRiseBet(!openRiseBet)}></Button>
    </div>

    {(mainGame?.gameStatus === gameStatus.betting) && <div className="fixed lg:left-[48%] sm:left-[45%] lg:bottom-20 sm:bottom-6">
      <Button isGameBtn icon={sideShowIcon} text={mainGame?.getUnpackedUser().length >= 3 ? "Side Show " : "Show"}
        //  className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 "
        className='text-white font-semibold sm:p-1 sm:text-xs lg:text-base '
        handleClick={mainGame?.getUnpackedUser().length >= 3 ? handleRequestSideShow : handleShowDown}
      ></Button>
    </div>}

    {/* Chat Modal */}
    <CustomChatModal show={openChatmodal} onClose={setOpenChatModal} />

    {/* low Balance modal */}
    <LowBalancemodal
      show={isLowBalance}
      title={"Low Balance"}
      onClose={setIsLowBalance}
    />

    {/* notification Modal  */}
    <InformationModal show={showInformation} title={"Information"} information={information} onClose={setShowInformation} />

    {/* conform modal */}
    <ConformModal show={sideShowRequest} title={"Request a side show"} onClose={handleCancelSideShow} onAccept={handleSideShow} />

    {/* setting modal */}
    <SettingModal show={openSetting} onClose={setOpenSetting}></SettingModal>
  </div>)
}

export default Board;