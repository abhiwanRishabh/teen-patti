import { publish } from "../CustomEvents/event";
import { setRoomProperties } from "../constants/socketKeys";
// import { deflate } from 'pako';
export const saveGameProperties = (
  properties,
  roomName,
  userData,
) => {
  // Compress the message
  // const compressedData = deflate(JSON.stringify({
  //   ...currentRoomProperties,
  //   ...properties,
  // }));
  // debugger;
  const players = properties.players;
  // delete properties.players;/
  publish(setRoomProperties, {
    roomname: roomName,
    nickname: userData?.nickname,
    uid: userData?.uid,
    roomCustomProperties: {
      properties : properties,
      players : players
    },
  });
};