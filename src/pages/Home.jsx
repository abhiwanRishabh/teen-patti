import { useCallback, useEffect, useState } from "react";
import freePlay from "../assets/freePlay.webp";
import privateRoom from "../assets/privateRoom.webp";
import quickPlay from "../assets/quickPlay.webp";
import CreateRoomDetailsModal from "../components/Modal/CreateRoomDetailsModal";
import JoinPrivateRoomModal from "../components/Modal/JoinPrivateRoomModal";
import PlayerSelectModal from "../components/Modal/PlayerSelectModal";
import PrivateRoomModal from "../components/Modal/PrivateRoomModal";
import ProfileModal from "../components/Modal/ProfileModal";
import QuickPlayModal from "../components/Modal/QuickPlayModal";
import SettingModal from "../components/Modal/SettingModal";
import Navbar from "../components/Navbar/Navbar";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { gameSound } from "../App";
import wait from "../utils/timer";
import { useDispatch, useSelector } from "react-redux";
import {
  setGameMode,
  setGamePlayers,
  setRoomProperties,
  setRoomType,
  setUserData,
} from "../redux/slice/gameSlice";
import { publish, subscribe, unsubscribe } from "../CustomEvents/event";
import {
  getRoomProperties,
  joinRoom,
  onCreateRoom,
  onJoinRoom,
  OnPlayerEnterRoom,
} from "../constants/socketKeys";
import { socket } from "../socket/socket";
import { showToast } from "../utils";
import {
  clearSessionStorage,
  removeFromSessionStorage,
  saveToSessionStorage,
} from "../utils/storage";
import useCreateQuickPlay from "../hooks/useCreateQuickPlay";
import { useRoomListing } from "../hooks/useRoomListing";
// import { set } from 'animejs';

const Home = () => {
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const [openSettingModal, setOpenSettingModal] = useState(false);

  const [openQuickPlayModal, setOpenQuickPlayModal] = useState(false);

  const [openPrivateRoomModal, setOpenPrivateRoomModal] = useState(false);

  const [openJoinRoomModal, setOpenJoinRoomModal] = useState(false);

  const [openCreateRoomPlayerSelectModal, setOpenCreateRoomPlayerSelectModal] =
    useState(false);

  const [openJoinRoomDetailsModal, setOpenJoinRoomDetailsModal] =
    useState(false);

  const [roomMaxPlayer, setRoomMaxPlayer] = useState(2);

  const history = useHistory();

  const { gameMode } = useSelector((state) => state?.game);

  const [isPortrait, setIsPortrait] = useState(false);

  const navigate = useHistory();
  const dispatch = useDispatch();

  // private room states
  //   const [roomPassword, setRoomPassword] = useState("abc123");
  const [roomCode, setRoomCode] = useState("");
  const [roomName, setRoomName] = useState("");

  const [rooms] = useRoomListing(openQuickPlayModal);

  const { handleCreateQuickPlay, handleCreateLocalRoomPropertyLobbyByCreator } =
    useCreateQuickPlay(rooms);
  // const [players]

  const startFreePlay = () => {
    dispatch(setGameMode("Free"));
    history.push(`/game?gameType=Free`);
    dispatch(setRoomType("silverRoom"));
    clearSessionStorage();
  };
  const handleQuickPlay = () => {
    setOpenQuickPlayModal(true);
    dispatch(setGameMode("Quick"));
    removeFromSessionStorage("gameSession");
    clearSessionStorage();
  };

  const handlePrivatePlay = () => {
    dispatch(setGameMode("Private"));
    setOpenPrivateRoomModal(true);
    dispatch(setRoomType("vvipRoom"));
    removeFromSessionStorage("gameSession");
    clearSessionStorage();
  };

  //  socket event functions
  const onHandleCreateRoom = useCallback((data) => {
    console.log("data when created the Room.", data);
    const parsedData = data.detail.properties;
    setRoomName(parsedData.roomname);
    publish(joinRoom, {
      roomname: parsedData.roomname,
      nickname: "user00" + Math.floor(Math.random() * 100),
      roomPassword: "abc123",
    });
  }, []);

  // save self player data
  

  const onRoomJoinHandle = useCallback(
    (res) => {
      //("some player joined the room,detaiss..>>>>>>>", res.detail);
      // debugger;
      const { success, data, message } = res.detail;

      if (success === false) {
        showToast("error", message);
        // //("on room join handle Error*****", message);
        return;
      }
      if (message === "Join Room") {
        const roomData = data;
        // debugger;
        console.log("roomData>>>>", roomData);
        const roomname = data.properties.roomname;
        const roomPlayers = roomData.players;
        const roomCustomProperties = roomData?.roomCustomProperties;
        const maxPlayers = roomData?.properties?.maxPlayers;
        const getMe = roomPlayers.find(
          (player) => player.socketId === socket.id
        );
        const isCreator = data.roomMaster.socketId === getMe.socketId;
        const isStarted = roomCustomProperties?.properties?.isStarted;
        let allConnected = false;

        // showToast('info', 'game started' + isStarted);
        if (isStarted && isStarted === true) {
          // showToast("info", "already started");
        }

        let roomCode = roomData.properties.roomname;
        setRoomCode(roomCode);
        setRoomMaxPlayer(maxPlayers);
        dispatch(setGamePlayers(roomPlayers?.filter(player => player?.isConnected)));

        if (gameMode !== "Quick") {
          setOpenJoinRoomModal(false);
          setOpenJoinRoomDetailsModal(true);
        }

        const userObj = {
          ...getMe,
          isCreator: isCreator,
        };

        // ** set userData to redux state
        dispatch(setUserData(userObj));
         
        // const connectPlayers = roomPlayers?.filter(player => player?.isConnected);
        // if(connectPlayers?.length === 3) {
        //   allConnected = true
        // }
         
        // if(allConnected) {
        //   handleCreateLocalRoomPropertyLobbyByCreator(userObj, roomname,{...roomData?.roomCustomPropertiesForLobby},false);
        // }

        if (isCreator) {
          handleCreateLocalRoomPropertyLobbyByCreator(userObj, roomname,null,true);
        }

        dispatch(setRoomProperties(roomCustomProperties?.properties || null));
        
        if(!isCreator) {
           publish(getRoomProperties, {
            roomname: roomname,
            uid : getMe?.uid
           })
        }

        if(gameMode === 'Quick') {
          navigate.push(
            `/game?gameType=${gameMode}&roomName=${roomname}&started=${isStarted ? true : false}`
          );
        }
        //* store local use into session storage */
        saveToSessionStorage("user", getMe);
      }
    },
    [dispatch, gameMode, handleCreateLocalRoomPropertyLobbyByCreator, navigate]
  );

  const OnHandlePlayerEnterRoom = useCallback(
    (res) => {
      //("new player entered the room", res);
      const {
        roomBase: {
          properties,
          players,
          roomCustomProperties,
          roomCustomPropertiesForLobby,
        },
        playerEnter,
      } = res.detail;

      dispatch(setGamePlayers(players?.filter(player => player?.isConnected)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (socket.connected) {
      window.location.reload();
    }
  }, [socket]);

  //  handling socket events
  useEffect(() => {
    subscribe(onCreateRoom, onHandleCreateRoom);
    subscribe(onJoinRoom, onRoomJoinHandle);
    subscribe(OnPlayerEnterRoom, OnHandlePlayerEnterRoom);
    // subscribe(OnConnectToMaster, onConnectMaster);
    // subscribe(onJoinRoomFailed, onHandleJoinRoomFailed);
    // subscribe(OnLeaveRoom, onOnLeaveRoomHandle);
    return () => {
      unsubscribe(onJoinRoom, onRoomJoinHandle);
      unsubscribe(onCreateRoom, onHandleCreateRoom);
      unsubscribe(OnPlayerEnterRoom, OnHandlePlayerEnterRoom);
      //   unsubscribe(OnConnectToMaster, onConnectMaster);
      //   unsubscribe(OnLeaveRoom,onOnLeaveRoomHandle);
    };
  }, [
    dispatch,
    onHandleCreateRoom,
    onRoomJoinHandle,
    OnHandlePlayerEnterRoom,
    // onConnectMaster,
    //  onHandleJoinRoomFailed,
    //  onOnLeaveRoomHandle,
  ]);

  // check for screen orientation
  useEffect(() => {
    const checkOrientation = () => {
      const currentOrientation = window.screen.orientation.type;
      setIsPortrait(currentOrientation.startsWith("portrait"));
    };

    window.addEventListener("orientationchange", checkOrientation);
    checkOrientation();
    return () => {
      window.removeEventListener("orientationchange", checkOrientation);
    };
  }, [isPortrait]);

  return (
    <div className="backgroundLite h-full">
      <Navbar
        setOpenProfileModal={setOpenProfileModal}
        setOpenSettingModal={setOpenSettingModal}
      ></Navbar>

      {/*  game modes  */}
      <div className="grid place-items-center h-5/6 w-6/6">
        <div
          className={`flex ${
            isPortrait ? "flex-col" : "flex-row"
          } md:flex-row lg:flex-row justify-center items-center gap-4 w-full`}
        >
          <img
            src={quickPlay}
            onClick={handleQuickPlay}
            alt="Image 1"
            className="w-28 md:w-32 lg:w-40 cursor-pointer"
          />

          <div className="flex gap-4">
            <img
              src={privateRoom}
              onClick={handlePrivatePlay}
              alt="Image 2"
              className="w-28 md:w-32 lg:w-40 cursor-pointer"
            />

            <img
              src={freePlay}
              onClick={startFreePlay}
              alt="Image 3"
              className="w-28 md:w-32 lg:w-40 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      <ProfileModal
        openProfileModal={openProfileModal}
        setOpenProfileModal={setOpenProfileModal}
      />

      {/* Setting Modal */}
      <SettingModal show={openSettingModal} onClose={setOpenSettingModal} />

      {/* Quick Play Modal */}
      <QuickPlayModal
        show={openQuickPlayModal}
        onClose={setOpenQuickPlayModal}
        handleCreateQuickPlay={handleCreateQuickPlay}
      />

      {/* Private Room Modal */}
      <PrivateRoomModal
        show={openPrivateRoomModal}
        onClose={setOpenPrivateRoomModal}
        setOpenCreateRoomPlayerSelectModal={setOpenCreateRoomPlayerSelectModal}
        setOpenJoinRoomModal={setOpenJoinRoomModal}
      />

      {/* Create Room player select Modal */}
      <PlayerSelectModal
        show={openCreateRoomPlayerSelectModal}
        onClose={setOpenCreateRoomPlayerSelectModal}
        setOpenJoinRoomDetailsModal={setOpenJoinRoomDetailsModal}
        setRoomCode={setRoomCode}
      />

      {/* Create Private Room details Modal */}
      <CreateRoomDetailsModal
        show={openJoinRoomDetailsModal}
        onClose={setOpenJoinRoomDetailsModal}
        roomCode={roomCode}
        roomMaxPlayer={roomMaxPlayer}
      />

      {/* Join Room Modal openJoinRoomModal*/}
      <JoinPrivateRoomModal
        show={openJoinRoomModal}
        onClose={setOpenJoinRoomModal}
      />
    </div>
  );
};

export default Home;
