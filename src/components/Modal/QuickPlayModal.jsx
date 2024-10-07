/* eslint-disable react/prop-types */
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Button from "../button/Button";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoomAmount, setRoomType } from "../../redux/slice/gameSlice";
// import { useRoomListing } from "../../hooks/useRoomListing";
// import useCreateQuickPlay from "../../hooks/useCreateQuickPlay";

function QuickPlayModal({
    show, onClose,handleCreateQuickPlay
}) {

    let Rooms = [
        {
            amount: 5,
            type: "SILVER ROOM",
            value: "silverRoom",
        },
        {
            amount: 25,
            type: "GOLD ROOM",
            value: "goldRoom"
        },
        {
            amount: 100,
            type: "PLATINUM ROOM",
            value: "platinumRoom"
        },
        {
            amount: 500,
            type: "VIP ROOM",
            value: "vipRoom"
        },
        {
            amount: 1000,
            type: "VVIP ROOM",
            value: "vvipRoom"
        },
    ]

    const history = useHistory();
    const dispatch = useDispatch();



    // CREATE QUICK PLAY
    const handleSetRoomType = (value,amount) => {
        dispatch(setRoomType(value));
        dispatch(setRoomAmount(amount));
        handleCreateQuickPlay(amount);
        // history.push("/game");
    }
    const handleUnlimitedRoom =()=>{
        dispatch(setRoomType("unlimited"))
        // history.push("/game");
    }

    return (
        <ModalWrapper show={show} onClose={() => onClose(false)} title="Quick Play" size="md" >

            <div className="flex flex-col p-4 gap-4">
                {
                    Rooms.map((e) => {
                        return <div key={e.amount} className="flex gap-4 ">
                            <Button text={`${e.amount} $`} isActive={false} className="w-2/6" handleClick={() => handleSetRoomType(e.value, e.amount)}></Button>
                            <Button text={e.type} isActive={true} className="grow text-xs"></Button>
                        </div>
                    })
                }
                <Button text={"UNLIMITED ROOM"} isActive={true} className="text-xs p-4" handleClick={handleUnlimitedRoom}></Button>
            </div>

        </ModalWrapper>
    )
}

export default QuickPlayModal;