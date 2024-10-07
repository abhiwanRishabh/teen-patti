import { useCallback, useEffect, useState } from "react"
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Button from "../button/Button";
import Text from "../text/Text";
import shareIcon from "../../assets/icons/shareIcon.svg";
import { MdContentCopy as CopyIcon } from "react-icons/md"; //

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { publish, subscribe, unsubscribe } from "../../CustomEvents/event";
import { useSelector } from "react-redux";

import profile0 from "../../assets/profiles/profile2.svg";
import profile1 from "../../assets/profiles/profile3.svg";
import profile2 from "../../assets/profiles/profile4.svg";
import profile3 from "../../assets/profiles/profile5.svg";
import { socket } from "../../socket/socket";
import { onRaiseEvent, raiseEvent } from "../../constants/socketKeys";
import CopyToClipboard from "react-copy-to-clipboard";
import { showToast } from "../../utils";


function CreateRoomDetailsModal({
    show, onClose, roomCode = 14690, roomMaxPlayer
}) {

    const { gameObj, userData, gameMode } = useSelector((state) => state.game);

    const history = useHistory();

    const getProfile = (position) => {

        switch (position) {
            case 1:
                return profile1;
            case 2:
                return profile2;
            case 3:
                return profile3;

            default:
                return profile0;
        }
    }

    //**startRaiseEvent */
    const startRaiseEvent = useCallback((CustomData) => {
        //** clear out session */
        // setSessionStorageItem("gameSession", null);
        // let redirectUrl = `/game?roomName=${roomCode}&uid=${userData?.uid}&started=false`;
        // navigate(redirectUrl, { replace: true })

        //("game mode for private", gameMode);

        //("game CustomData", CustomData);

        history.push(`/game?gameType=${gameMode}&roomName=${CustomData.roomCode}&started=false`)
    }, [gameMode, history]);

    const handleRaisedEvents = useCallback((eventData) => {

        const data = eventData.detail;
        // //("handleRaisedEvents>>>>", eventData);
        if (!data) return;
        const { EventCode, CustomData } = data;
        if (CustomData?.sendingUser !== socket.id) {
            if (EventCode === 3) startRaiseEvent(CustomData);
        }
    }, [startRaiseEvent])

    const handleJoinPrivateRoomPlay = () => {

        let userDetails = { username: "MY Profile", chips: 100000, avatar: "profile2", isAvailable: true, isNew: false };

        const startGameEvent = {
            roomName: roomCode,
            EventCode: 3,
            SendTo: "All", // Other/All
            CustomData: {
                //  her we provide all the data want to send.
                sendingUser: socket.id,
                user: userDetails,
                roomCode: roomCode,
            },
        };

        publish(raiseEvent, startGameEvent);
        history.push(`/game?gameType=${gameMode}&roomName=${roomCode}&started=false`)

    }
    //("gameObj...>>>", gameObj);

    // const handleCreateRoomEvent = useCallback((eventData) => {

    //     //("eventdata for maxPlayers", eventData.details.properties.maxPlayers);
    //     setMaxPlayers(eventData.details.properties.maxPlayers)
    //     //("maxPlayers,",maxPlayers);
    // }, [setMaxPlayers,maxPlayers])



    useEffect(() => {
        // raise a event for rediret the user
        subscribe(onRaiseEvent, handleRaisedEvents);


        return () => {
            unsubscribe(onRaiseEvent, handleRaisedEvents);
        }
    }, [handleRaisedEvents])


    return (
        <ModalWrapper show={show} onClose={() => onClose(false)} title="Create Room" size="md" >

            <div className="p-8 h-full  w-10/12 m-auto  flex flex-col justify-center items-center gap-2">
                <Text
                    title="Your room code:"
                    size="2xl"
                    color="text-center text-white text-xl lg:text-xl"
                />
                <div className="buttonActive pl-4">
                    <Text title={roomCode} color={"text-white tracking-[10px]	"}> </Text>
                </div>

                <Text
                    title="Share this room code with friends and ask them to join"
                    size="sm"
                    color="text-center text-white text-wrap"
                />

                <ShareButton roomCode={roomCode} />

                <div className="addedRoomPlayers flex gap-2">
                    {
                        new Array(roomMaxPlayer).fill(1).map((e, i) => {
                            return <div key={i} className="border-2 p-2 rounded-lg border-purple-900 bg-[#fff3] cursor-pointer w-12">

                                {
                                    gameObj?.players[i] !== undefined ? <div>
                                        <img src={getProfile(i)} alt="" width={34} />
                                        {/* <p>{gameObj?.players[i].nickname}</p> */}
                                    </div> :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white"
                                            strokeWidth="2"
                                            strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                                }
                            </div>

                        })
                    }

                </div>

                {userData?.isCreator && <Button
                    text={"Play"}
                    className=" w-5/12 mt-4 text-xl"
                    handleClick={handleJoinPrivateRoomPlay}
                />}
            </div>
        </ModalWrapper>
    )
}

export default CreateRoomDetailsModal;



export const ShareButton = ({ roomCode }) => {
    return (
        <div className="button flex gap-1 justify-center items-center cursor-pointer">
            <Text title={"Invite Friends"} color={"text-white"}></Text>
            {/* <img src={shareIcon} alt="shareIcon" width={"20px"} /> */}
            <CopyToClipboard
                text={roomCode}
                onCopy={() => showToast("success", "roomCode coppied! :)")}
            >

                <CopyIcon className="text-white w-[25px] font-bold" />
            </CopyToClipboard>
        </div>)
}