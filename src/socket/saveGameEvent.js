import {publish} from "../CustomEvents/event";
import {setRoomProperties} from "../constants/socketKeys";
export const saveGameProperties = (properties, roomName, userData, currentRoomProperties) => {
    // debugger;
    publish(setRoomProperties, {
        roomname: roomName,
        nickname: userData?.nickname,
        uid: userData?.uid,
        roomCustomProperties: {
            ...currentRoomProperties,
            ...properties,
        },
    });
};
