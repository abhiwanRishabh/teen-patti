/* eslint-disable react/prop-types */
import UserName from "../_components/UserName";
import Cards from "./Cards";
import CircularProgressBar from "../../components/loader/CircularProgressBar";
import Button from "../../components/button/Button";
import crown from "../../assets/crawn.webp";
import useSearchParams from "../../hooks/useSearchParams";
import { useSelector } from "react-redux";
import { socket } from "../../socket/socket";
import { publish } from "../../CustomEvents/event";
import { raiseEvent } from "../../constants/socketKeys";
import { gameStatus } from "../../constants/states";

const PlayerAvatar = ({ src, player, sideShow, isUser, status, packed }) => {
  console.log("sideShow?.status", player, sideShow?.status);
  const isInSideShow = () => {
    if (sideShow?.user?.receiver?.playerId === player?.playerId) {
      return true;
    } else if (sideShow?.user?.sender?.playerId === player?.playerId) {
      return true;
    } else {
      return false;
    }
  };

  // if the player is new(means not in the game) show only the avatar.
  if (player?.isNew) {
    return (
      <div className="w-24 object-fill lg:w-24 md:w-12 sm:w-12  relative z-10">
        {/* player avatar */}
        <img
          src={src}
          alt="user-avatar"
          className="w-24 object-fill lg:w-20 md:w-12 sm:w-12 z-20 relative"
        />
      </div>
    );
  }

  return (
    <div className="w-24 object-fill lg:w-24 md:w-12 sm:w-12  relative z-10">
      {/* player play timer */}
      {player?.turn && !sideShow?.status && status !== gameStatus.ALL_IN && (
        <CircularProgressBar start={true} player={player} packed={packed} />
      )}

      {/*player packed screen */}
      {player.packed && (
        <div className="absolute  z-30 w-24 object-fill lg:w-20 md:w-16 sm:w-12 lg:h-20 md:h-16 sm:h-12 packedBase ">
          <div className="packed grid place-items-center  font-semibold text-base lg:text-base md:text-base sm:text-xs">
            Packed
          </div>
        </div>
      )}

      {/* seen screen */}
      {player.seen && !player.packed && !isUser && (
        <div className="absolute  z-30 w-24 object-fill lg:w-20 md:w-16 sm:w-12 lg:h-20 md:h-16 sm:h-12 packedBase ">
          <div className="packed grid place-items-center  font-semibold text-base lg:text-base md:text-base sm:text-xs">
            seen
          </div>
        </div>
      )}

      {/* player avatar */}
      <img
        src={src}
        alt="user-avatar"
        className="w-24 object-fill lg:w-20 md:w-12 sm:w-12 z-20 relative"
        // className='z-20'
      />

      {/* side show glow */}
      {sideShow?.status && isInSideShow() && (
        <div className=" p-1 rounded-full ring-glow-container2 absolute sm:-top-[4px] sm:-left-[3px] -z-10">
          <div className=" p-1 rounded-full ring-glow-container1 ">
            <div className="p-1 rounded-full ring-glow-container">
              <div className="w-24 object-fill lg:w-16 md:w-12 sm:w-8 lg:h-16 md:h-12 sm:h-8 z-1 glowsize" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MessageBox = ({ message }) => {
  return (
    <div
      className="message-up buttonActive cursor-pointer transition-all rounded-tl-xl rounded-tr-xl rounded-br-xl text-white px-2 py-2 flex justify-center text-center items-center text-lg lg:text-sm sm:text-xs"
      // onClick={() => sendMessage(item)}
    >
      {message}
    </div>
  );
};

function Player({
  player,
  game,
  sideShow,
  winner,
  isUser,
  isShowDown,
  updatePlayerSeenOrPacked,
  status,
  packed,
  chatMessage,
  sideShowAccepted,
  setSideShowAccepted
}) {
  const { username, avatar, hand } = player;

  const { gameMode } = useSelector((state) => state.game);
  let query = useSearchParams();

  const handlePlayerSeeCards = () => {
     player.seeCards();

    updatePlayerSeenOrPacked("seen", player?.playerId);
    setSideShowAccepted(false);
    // raised event for others.
    if (gameMode !== "Free") {
      const cardSeenEvent = {
        roomName: query.get("roomName"),
        EventCode: 11,
        SendTo: "Other", // Other/All
        CustomData: {
        // her we provide all the data want to send.
        sendingUser: socket.id,
        player: player,
        },
      };

      publish(raiseEvent, cardSeenEvent);
    }
  };

  return (
    <div className="player-box player flex flex-col justify-center items-center ">
      {/* have to add crown */}
      {player?.playerId === winner?.playerId && (
        <div className="absolute -top-4">
          <img src={crown} alt="" className=" lg:w-8 md:w-8 sm:w-6  " />
        </div>
      )}

      <UserName>{username}</UserName>

      {chatMessage && chatMessage.user_id === player.uid && (
        <MessageBox message={chatMessage?.message} />
      )}

      <PlayerAvatar
        src={avatar}
        player={player}
        sideShow={sideShow}
        isUser={isUser}
        status={status}
        packed={packed}
      />

      {(!player?.packed || sideShowAccepted) && (
        <div>
          <Cards
            seen={player?.seen}
            hand={hand}
            player={player}
            isUser={isUser}
            isShowDown={isShowDown}
            sideShowAccepted={sideShowAccepted}
          />
        </div>
      )}

      <div className="relative w-3/6 lg:-top-6 sm:-top-2 h-8 flex justify-center z-30">
        {!player.seen &&
          !player?.packed &&
          player?.hand?.length > 0 &&
          player?.socketId === socket.id && (
            <Button
              text={"See"}
              handleClick={handlePlayerSeeCards}
              isGameBtn
              className="text-white font-semibold sm:p-1 sm:text-xs lg:text-base cursor-pointer z-50"
            ></Button>
          )}
      </div>
      <div className="absolute top-[6.5rem] md:top-34 lg:top-40">
        <div className="bg-indigo-950 border border-indigo-200 rounded-md w-max	 px-2 h-6 text-center text-white ">
          $ {player.chips}
        </div>
      </div>
    </div>
  );
}

export default Player;
