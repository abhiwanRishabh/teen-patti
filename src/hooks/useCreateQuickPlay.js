import React, { useCallback, useState } from "react";
import { generateRandomRoomName } from "../utils";
import { useSelector } from "react-redux";
import { publish } from "../CustomEvents/event";
import {
  createRoom,
  joinRoom,
  localSetRoomProperties,
  setRoomProperties,
} from "../constants/socketKeys";
import { saveToSessionStorage } from "../utils/storage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BsOpencollective } from "react-icons/bs";

function useCreateQuickPlay(rooms) {
  const [loadingForQP, setLoading] = useState(false);
  const { gameMode, roomAmount } = useSelector((state) => state.game);
  const navigate = useHistory();
  //   const prevJoinedGame = getFromSessionStorage("savePrevQuickPlay");

  const handleCreateQuickPlay = (amount) => {
    // debugger;
    const visibleLobbies = rooms?.find((room) => {
      let lobbyData = room.roomCustomPropertiesForLobby;
      if (
        lobbyData?.game_type === "Quick" &&
        lobbyData?.isOpen &&
        lobbyData?.roomAmount === amount
      ) {
        return room;
      }
    });
    console.log("visibleLobbies", rooms, visibleLobbies);
    if (!visibleLobbies) {
      const roomName = generateRandomRoomName();
      createNewGame(roomName);
    } else {
      handleJoin(visibleLobbies);
    }
  };

  // ** handle Create Local Room Property Lobby ByCreator
  const handleCreateLocalRoomPropertyLobbyByCreator = useCallback(
    (userData, roomName,data,open) => {
      let CustormProperty = {
        game_type: gameMode,
        roomAmount: roomAmount,
        isOpen:open,
      }

      if(data) {
        CustormProperty.game_type = data?.game_type
        CustormProperty.roomAmount = data?.roomAmount,
        CustormProperty.isOpen = open
      }

      console.log("CustormProperty",CustormProperty);
      publish(localSetRoomProperties, {
        roomname: roomName,
        nickname: userData?.nickname,
        uid: userData?.uid,
        roomCustomPropertiesForLobby:{
          ...CustormProperty
        },
      });
    },
    [roomAmount, gameMode]
  );

 

  const handleJoin = (visibleLobbies) => {
    publish(joinRoom, {
      roomname: visibleLobbies?.roomname || visibleLobbies[0]?.roomname,
      nickname: "player00" + `${Math.floor(Math.random() * 1000)}`,
      roomPassword: "abc123",
    });
  };

  // ** create new game
  const createNewGame = (roomName) => {
    // ** publish create room event
    publish(createRoom, {
      roomname: roomName,
      maxPlayers: 100,
      ttl: 50,
      isVisible: false,
      roomPassword: "abc123",
    });

    //   // ** navigate into game
  
    // setData("newGameRoomId", roomName);

    //** clear out session */
    // resetSessionStorage();

    saveToSessionStorage("savePrevQuickPlay", roomName);
  };

  return {
    loadingForQP,
    handleCreateQuickPlay,
    handleCreateLocalRoomPropertyLobbyByCreator,
    // handleSetLocalRoomPropertyByCreator
  };
}

export default useCreateQuickPlay;
