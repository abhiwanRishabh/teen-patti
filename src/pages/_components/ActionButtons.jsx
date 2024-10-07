/* eslint-disable react/prop-types */
import Button from "../../components/button/Button";
import packIcon from "../../assets/icons/pack.svg";
import betIcon from "../../assets/icons/bet.svg";
import riseIcon from "../../assets/icons/rise.svg";
import BetRise from "../../components/screens/components/BetRise";
import { gameStatus } from "../../constants/states";
import { useState } from "react";

const ActionButtons = ({
  packed,
  bet,
  game,
  openRiseBet,
  setOpenRiseBet,
  currentPlayerIndex,
  risedBetAmount,
  setRisedBetAmount,
  getUnpackedUser,
  handleSideShow,
  handleShowDown,
  allIn,
}) => {
  const [disabled, setDisabled] = useState(false);

  const player = game?.players[currentPlayerIndex];

  return (
    <>
      {/* pack button */}
      <div className="fixed lg:right-60 sm:right-32  bottom-6">
        <Button
          rounded
          icon={packIcon}
          text={"Pack"}
          className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 glowsize"
          iconStyle={" md:pl-[5px] md:pt-[6px] sm:pl-[5px] sm:pt-[6px]"}
          disabled={disabled}
          // handleClick={mainGame?.currentPlayerIndex === mainGame?.userIndex ? pack : () => { }}
          handleClick={() => {
            setDisabled(true);
            packed();
          }}
        ></Button>
      </div>

      {/* bet button */}
      <div className="fixed lg:right-36 sm:right-20 bottom-6">
        <Button
          rounded
          icon={betIcon}
          text={"Bet"}
          className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 glowsize "
          iconStyle={" md:pl-[5px] md:pt-[6px] sm:pl-[5px] sm:pt-[6px]"}
          disabled={disabled}
          handleClick={() => {
            // mainGame.currentPlayerIndex === mainGame.userIndex &&
            // setPlayerBettingIndex(mainGame.currentPlayerIndex)
            // placeBet()
            setDisabled(true);
            bet(false,game?.mode);
          }}
        ></Button>
      </div>

      {/* rise button */}

      <div className="fixed lg:right-14 sm:right-8  bottom-6 z-30">
        {/* Bet Rise POPUP */}
        {/* assumed that my player is the last one*/}
        {/* 
        {openRiseBet && <BetRise currentBetValue={currentBetValue} curr max={mainGame.players[mainGame.players.length - 1].chips} min={mainGame.currentBet} mainGame={mainGame} />} refrence value*/}

        {openRiseBet && (
          <BetRise
            max={game?.players[currentPlayerIndex].chips}
            min={game?.currentBet}
            risedBetAmount={risedBetAmount}
            setRisedBetAmount={setRisedBetAmount}
            allIn={allIn}
          />
        )}

        <Button
          rounded
          icon={riseIcon}
          text={"Raise"}
          className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 glowsize"
          iconStyle={`md:pl-[5px] md:pt-[6px] sm:pl-[5px] sm:pt-[6px] ${
            openRiseBet ? "rotate-180" : ""
          }`}
          handleClick={() => setOpenRiseBet(!openRiseBet)}
        ></Button>
      </div>

      {game?.gameStatus === gameStatus.BETTING && (
        <div className="flex gap-x-3 items-center fixed lg:left-[8%] sm:left-[8%] lg:bottom-20 sm:bottom-6">
          {getUnpackedUser().length >= 3 && (
            <Button
              isGameBtn
              text={"Side Show"}
              //  className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 "
              disabled={disabled}
              className={`text-white font-semibold sm:p-1 sm:text-xs lg:text-base ${player?.seen === false ? 'opacity-20 pointer-events-none' : null}`}
              handleClick={() => {
                setDisabled(true);
			       	handleSideShow()
              }}
            ></Button>
          )}

          {getUnpackedUser().length === 2 && player?.seen && (
            <Button
              isGameBtn
              text={"Show"}
              //  className="lg:w-12 lg:h-12 md:w-6 md:w-6 sm:w-8 sm:h-8 "
              disabled={disabled}
              className="text-white font-semibold sm:p-1 sm:text-xs lg:text-base "
              handleClick={() => {
                setDisabled(true);
				handleShowDown();
              }}
            ></Button>
          )}
        </div>
      )}
    </>
  );
};

export default ActionButtons;
