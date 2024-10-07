import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Button from "../button/Button";
import joinIcon from "../../assets/icons/join.svg";
import createIcon from "../../assets/icons/create.svg";

function PrivateRoomModal({
    show,
    onClose,
    setOpenCreateRoomPlayerSelectModal,
    setOpenJoinRoomModal
}) {

    let types = [
        {
            icon: createIcon,
            type: "Create",
            onclick: () => setOpenCreateRoomPlayerSelectModal(true)
        },
        {
            icon: joinIcon,
            type: "Join",
            onclick: () => setOpenJoinRoomModal(true)
        }
    ]

    return (
        <ModalWrapper show={show} onClose={() => onClose(false)} title="Private Room" size="md" >
            <div className="flex p-4 gap-4">
                {
                    types.map((e) => {
                        return <Button key={e.type}
                            text={e.type}
                            isActive={true}
                            className="grow text-lg p-2" icon={e.icon}
                            handleClick={e.onclick}
                        />
                    })
                }
            </div>
        </ModalWrapper>
    )
}

export default PrivateRoomModal;