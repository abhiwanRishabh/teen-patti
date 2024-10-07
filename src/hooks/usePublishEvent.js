import React, { useCallback } from "react";
import { publish } from "../CustomEvents/event";
import { setRoomProperties } from "../constants/socketKeys";

function usePublishEvent() {
  const handleSetLocalRoomPropertyByCreator = useCallback(
    (userData, roomName) => {
    //   console.log("can start");
    //   debugger;
      publish(setRoomProperties, {
        roomname: roomName,
        nickname: userData?.nickname,
        uid: userData?.uid,
        roomCustomProperties: {
          maxPlayer: 4,
          started: true,
        },
      });
    },
    []
  );

  return {
    handleSetLocalRoomPropertyByCreator,
  };
}

export default usePublishEvent;
