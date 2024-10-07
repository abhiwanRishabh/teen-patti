import moment from "moment";
import {publish, subscribe} from "../CustomEvents/event";
import {
    LeaveRoom,
    OnLeaveRoom,
    OnLeaveRoomFailed,
    PlayerList,
    RoomListing,
    ScoketleaveRoom,
    SocketPlayerList,
    SocketRoomListing,
    SocketchangeRoomBaseProperty,
    SocketcreateRoom,
    SocketgetRoomProperties,
    SocketjoinRoom,
    SocketraiseEvent,
    SocketreJoinRoom,
    SocketsetRoomProperties,
    createRoom,
    getRoomProperties,
    getRoomPropertiesForLobby,
    joinRoom,
    localGetRoomProperties,
    localSetRoomProperties,
    localchangeRoomBaseProperty,
    onLocalGetRoomProperties,
    raiseEvent,
    reJoinRoom,
    setRoomProperties,
    setRoomPropertiesForLobby,
} from "../constants/socketKeys";
import {sendRequest} from "./socket";
// import {showToast} from "../utils";

var baseRoom = {
    roomname: "",
    ttl: 0, //0,seconds,default=0
    isVisible: true, //true,false
    isOpen: true, //true,false
    maxPlayers: 0, //Any number,Defalut 10
    roomPassword: "", //Room Password only applicable if isvisible False
    nickname: "",
};

subscribe(createRoom, async (coreEventData) => {
    var roomData = coreEventData.detail;
    //("roomData",roomData);
    const unixTimestamp = moment().valueOf();
    // //('Unix Timestamp:', unixTimestamp);
    baseRoom.roomname = roomData.roomname || unixTimestamp;
    baseRoom.maxPlayers = roomData.maxPlayers || 20;
    baseRoom.ttl = roomData.ttl || 0;
    baseRoom.isVisible = roomData.isVisible;
    baseRoom.isOpen = roomData.isOpen;
    baseRoom.roomPassword = roomData.roomPassword || "";
    baseRoom.nickname = roomData.nickname || "Guest " + unixTimestamp;
    await sendRequest(SocketcreateRoom, baseRoom, (serverResponse) => {
        //('sendRequest from server:', serverResponse);
        // publish(onCreateRoom, serverResponse);
    });
});

//** GET ROOM LISTING */
subscribe(RoomListing, async (coreEventData) => {
    // //("RoomListingcoreEventData",coreEventData)
    await sendRequest(SocketRoomListing, "", (serverResponse) => {
        // //('RoomListing from server:', serverResponse);
    });
});

//** ROOM JOIN */
subscribe(joinRoom, async (coreEventData) => {
    var JoinData = coreEventData.detail;
    //("coreEventData", coreEventData);
    await sendRequest(SocketjoinRoom, JoinData, (serverResponse) => {
        // //('RoomListing from server:', serverResponse);
    });
});

//** RE-JOIN ROOM */
subscribe(reJoinRoom, async (roomDataToJoin) => {
    //("Sending Rejoin response ", roomDataToJoin.detail)
    if (!roomDataToJoin.detail.roomname) {
        return;
    }
    if (!roomDataToJoin.detail.uid) {
        return;
    }
    await sendRequest(SocketreJoinRoom, roomDataToJoin.detail, (serverResponse) => {
        //("Rejoin response ", serverResponse)
    });
});

//** PLAYER LEAVE ROOM */
subscribe(LeaveRoom, async (coreEventData) => {
    const data = coreEventData.detail;
    var leaveRoomData = {
        roomname: data.roomname,
    };
    await sendRequest(ScoketleaveRoom, leaveRoomData, (serverResponse) => {
        if (serverResponse.success == false) {
            publish(OnLeaveRoomFailed, serverResponse);
            return;
        }
        publish(OnLeaveRoom, data);
    });
});

// ** SET Room Properties for lobby **
subscribe(localSetRoomProperties, async (eventData) => {
    var data = eventData.detail;
    console.log("subscribe_localSetRoomProperties",data)
    await sendRequest(setRoomPropertiesForLobby, data, (serverResponse) => {
        // //('localSetRoomProperties from server:', serverResponse);
    });
});

// ** GET Room Properties
subscribe(getRoomProperties, async (eventData) => {
    var data = eventData.detail;
    console.log("getRoomProperties",data);
    await sendRequest(SocketgetRoomProperties, data, (serverResponse) => {
        // //('localgetRoomProperties from server:', serverResponse);
    });
});

subscribe(localGetRoomProperties, async (eventData) => {
    var data = eventData.detail;
    // //("getRoomProperties",data);
    await sendRequest(getRoomPropertiesForLobby, data, (serverResponse) => {
        // //('localSetRoomProperties from server:', serverResponse);
    });
});

// ** SET Room Properties **
subscribe(setRoomProperties, async (eventData) => {
    var data = eventData.detail;
    // //("localSetRoomProperties",data)
    await sendRequest(SocketsetRoomProperties, data, (serverResponse) => {
        publish(onLocalGetRoomProperties, serverResponse);
        // //('localSetRoomProperties from server:', serverResponse);
    });
});
subscribe(localchangeRoomBaseProperty, async (eventData) => {
    var data = eventData.detail;
    // //("localchangeRoomBaseProperty",data)
    await sendRequest(SocketchangeRoomBaseProperty, data, (serverResponse) => {
        // publish(onLocalGetRoomProperties,serverResponse)
        // //('localSetRoomProperties from server:', serverResponse);
    });
});

//** GET Local Player listing */
subscribe(PlayerList, async (eventData) => {
    var data = eventData.detail;
    await sendRequest(SocketPlayerList, data, (serverResponse) => {
        // //('SocketPlayerList from server:', serverResponse);
    });
});

//** RAISE EVENT FOR */

subscribe(raiseEvent, async (coreEventData) => {
    var toShareData = {
        roomname: coreEventData.detail.roomName,
        EventCode: coreEventData.detail.EventCode,
        SendTo: coreEventData.detail.SendTo,
        CustomData: coreEventData.detail.CustomData,
    };
    // //("toShareData>>>>",toShareData);
    // if (toShareData?.roomname === null) showToast("You are sending room name null");
    await sendRequest(SocketraiseEvent, toShareData, (serverResponse) => {
        // //(serverResponse, "Server Response raiseEvent")
    });
});
