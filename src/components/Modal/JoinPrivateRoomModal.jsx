import { useState } from "react";
import { joinRoom } from "../../constants/socketKeys";
import { publish } from "../../CustomEvents/event";
import Button from "../button/Button";
import Text from "../text/Text";
import ModalWrapper from "./ModalWrapper/ModalWrapper";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeFromSessionStorage } from "../../utils/storage";

function JoinPrivateRoomModal({
    show, onClose
}) {

    const [privateCode, setPrivatecode] = useState("");
    const history = useHistory();


    const handleJoinRoomModal = () => {
        removeFromSessionStorage('gameSession')

        publish(joinRoom, {
            roomname: privateCode,
            nickname: 'user00' + Math.floor(Math.random() * 100),
            // roomPassword : formData?.roomPassword
            roomPassword: "abc123"
        })

        setPrivatecode("");

        // TODO save or reset storage
    }

    return (
        <ModalWrapper show={show} onClose={() => onClose(false)} title="Join" size="md" >
            <div className="p-4 flex flex-col items gap-8">
                <div className="flex flex-col justify-center items-center gap-2">
                    <Text title={"Enter Private Code"} color={"text-white"} />
                    <input type="text" className="w-5/6 buttonActive p-2 text-white text-center font-bold tracking-[10px]" value={privateCode} onChange={(e) => setPrivatecode(e.target.value)} />
                </div>
                <Button text={"Join Room"} className="w-fit m-auto" handleClick={handleJoinRoomModal}></Button>
            </div>
        </ModalWrapper>
    )
}

export default JoinPrivateRoomModal;