/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Button from "../button/Button";
import Text from "../text/Text";
import checkIcon from "../../assets/icons/checkedIcon.svg"
import CoinCounterCard from "../cards/CoinCounterCard";
import { generateRandomRoomName, generateRoomCode } from "../../utils";
import { useSelector } from "react-redux";
import { publish } from "../../CustomEvents/event";
import { createRoom } from "../../constants/socketKeys";


export const CheckIcon = () => {
    return (
        <div>
            <img src={checkIcon} width={"80%"} alt={checkIcon} className="animate" />
        </div>
    );
};

function PlayerSelectModal({
    show,
    onClose,
    setOpenJoinRoomDetailsModal,
    setRoomCode
}) {

    const { gameMode } = useSelector(state => state.game);
    const [playerCountSelect, setPlayerCountSelect] = useState([
        {
            title: "2 Players",
            selected: false,
            value: 2,
        },
        {
            title: "3 Players",
            selected: false,
            value: 3,
        },
        {
            title: "4 Players",
            selected: true,
            value: 4,
        },
    ]);

    let [playerCount, setPlayerCount] = useState(4);

    //   handle select player


    const handleCreateRoom = () => {
        //    debugger

        // create the room and publish
        const roomCode = generateRoomCode(6);
        // const roomPassword = generateRandomRoomName("password");
        // room password always set to "abc123";

        setRoomCode(roomCode);

        const visible = gameMode === "Private" ? false : true;

        // TODO set the code and password for show in the details modal

        let roomCreationDetails = {
            roomname: roomCode,
            maxPlayers: 4, // or can be selectd from the checkBox
            ttl: 100,
            isVisible: visible,
            roomPassword: "abc123",
        }

        // Publish the event for create the room

        //("Creating room ", roomCreationDetails);
        // ** publish create room
        publish(createRoom, roomCreationDetails);

        // open the room details modal
        setOpenJoinRoomDetailsModal(true);
        // close the modal
        onClose(false)

    }

    return (
        <ModalWrapper show={show} onClose={() => onClose(false)} title="Create Room" size="md" >
            <div>

                <div className="p-2 md:mt-5 flex lg:gap-6">
                    {/* {playerCountSelect.map((player) => (
                        <div
                            className="flex cursor-pointer flex-col-reverse text-center  items-center justify-center gap-3 w-full"
                            key={player.title}
                            onClick={() => SelectPlayerCount(player)}
                        >
                            <div
                                className={`w-8 h-8 grid place-items-center pl-1 border-2 ${player.selected
                                    ? "border-yellow-500 glow"
                                    : ""
                                    } rounded-full  cursor-pointer`}
                            >
                                {player.selected ?
                                    <CheckIcon />
                                    : null}
                            </div>
                            <Text
                                title={player.title}
                                color="text-md text-white"
                            />
                        </div>
                    ))} */}
                </div>

                <div className="w-full">
                    <CoinCounterCard />
                </div>

                {/* next Button */}
                <div className="flex justify-center">
                    <Button
                        text={"Next"}
                        className="my-4 py-2 px-6 "
                        handleClick={handleCreateRoom}
                    // handleClick={handleCreateRoom}
                    />
                </div>
            </div>
        </ModalWrapper>
    )
}

export default PlayerSelectModal;




