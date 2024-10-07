import {publish} from "../CustomEvents/event";
import {
    OnConnectToMaster,
    OnLocalRoomListUpdate,
    OnPlayerEnterRoom,
    OnPlayerLeftRoom,
    OnPlayerList,
    OnRoomListing,
    OnRoomPropertiesChange,
    ScoketleaveRoom,
    SocketOnPlayerEnterRoom,
    SocketOnPlayerLeftRoom,
    SocketOnRoomListUpdate,
    SocketOnRoomPropertiesChange,
    SocketPlayerList,
    SocketRoomListing,
    SocketcreateRoom,
    SocketgetRoomProperties,
    SocketjoinRoom,
    SocketraiseEvent,
    SocketreJoinRoom,
    SocketsetRoomProperties,
    onCreateRoom,
    onGetRoomProperties,
    onJoinRoom,
    onJoinRoomFailed,
    onRaiseEvent,
} from "../constants/socketKeys";
// import {delay, showToast} from "../utils";
import {socket} from "./socket";

export const socketEvents = () => {
    socket.on("connect", () => {
        // //("client connection to this socket.id", socket.id);
        sessionStorage.setItem("isConnected", true);
        publish(OnConnectToMaster, socket.id);
    });

    socket.on("disconnect", () => {
        // //('Socket.IO disconnected');
        // showToast("error", "Server disconnected");
    });

    // ** on Create room
    socket.on(SocketcreateRoom, function (msg) {
        //('SocketcreateRoom from server:', msg);
        // createdRoom = (msg)
        publish(onCreateRoom, msg);
        sessionStorage.setItem("isConnected", false);
    });

    // ** on Room Join
    socket.on(SocketjoinRoom, function (msg) {
        if (msg.success === false) {
            console.log("SocketjoinRoom from server:", msg);
            // //('SocketjoinRoom failed server:', msg);
            // showToast('error',msg.message)
            publish(onJoinRoomFailed, msg);
        } else {
            publish(onJoinRoom, msg);
        }
    });

    // ** on Re-Room Join
    socket.on(SocketreJoinRoom, function (msg) {
        //('SocketreJoinRoom from server:', msg);
        if (msg.success == false) {
            // //('SocketjoinRoom failed server:', msg);
            publish(onJoinRoomFailed, msg);
        } else {
            publish(onJoinRoom, msg);
        }
    });

    //** on player left room */
    socket.on(SocketOnPlayerLeftRoom, function (msg) {
        // //('OnPlayerLeftRoom from server:', msg);
        publish(OnPlayerLeftRoom, msg.data);
    });

    //** on player leave room */
    socket.on(ScoketleaveRoom, function (msg) {
        // showToast('info',"Player leave the room");
        // //('ScoketleaveRoom from server:', msg);
    });

    // ** GET ROOM LISTING
    socket.on(SocketRoomListing, function (msg) {
        // //('SocketRoomListing from server:', msg);
        publish(OnRoomListing, msg);
    });

    // ** GET PLAYER LISTING OF LOCAL PLAYER
    socket.on(SocketPlayerList, (players) => {
        publish(OnPlayerList, players);
    });

    // **  GET ROOM PROPERTIES
    socket.on(SocketgetRoomProperties, (data) => {
        // //("SocketgetRoomProperties>>>>",data)
        publish(onGetRoomProperties, data);
    });

    //** ON PLAYER ENTER ROOM */
    socket.on(SocketOnPlayerEnterRoom, function (msg) {
        // //('OnPlayerEnterRoom from server:', msg);
        publish(OnPlayerEnterRoom, msg.data);
    });

    //** ON ROOM PROPERTY CHANGE */
    socket.on(SocketOnRoomPropertiesChange, function (msg) {
        console.log('SocketOnRoomPropertiesChange from server:', msg);
        publish(OnRoomPropertiesChange, msg);
    });

    // ** ON SOCKET RAISE EVENT
    socket.on(SocketraiseEvent, function (msg) {
        console.log('SocketraiseEvent from server:', msg);
        if (msg.success === false) {
            //    showToast('error', msg.message);
            return;
        }
        publish(onRaiseEvent, msg);
    });

    // ON ROME LIST UPDATE
    socket.on(SocketOnRoomListUpdate, (data) => {
        // //('SocketOnRoomListUpdate from server:', data);
        publish(OnLocalRoomListUpdate);
    });
};
