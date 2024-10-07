import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Text from "../text/Text";
import { useEffect, useRef, useState } from "react";

function ConformModal({
    show, onClose, title, onAccept
}) {

    const [waitingTime, setWaitTime] = useState(7);
    const tiemrRef = useRef(null);
    // const tiemrRef = setInterval(() => {

    //     if (waitingTime <= 0) {
    //         clearInterval(tiemrRef);
    //         onClose();

    //     } else {
    //         setWaitTime(pre => pre - 1);

    //     }
  
    // }, 1000);

    useEffect(() => {
        tiemrRef.current = setInterval(() => {

            if (waitingTime <= 0) {
                clearInterval(tiemrRef.current);
                onClose();
            } else {
                setWaitTime(pre => pre - 1);
            }

        }, 1000);

        return () => {
            clearInterval(tiemrRef.current);
        }

    }, [onClose, waitingTime])

    return (
        <ModalWrapper show={show} onClose={onClose} title={title} size="md" type="conform" >
            <div className="p-4 flex  items gap-8">
                <button className="buttonCancel grow" onClick={onClose}>Cancel</button>
                <Text title={`${waitingTime}s`} color={"text-white"}></Text>
                <button className="buttonAccept grow" onClick={onAccept}>Accept</button>
            </div>
        </ModalWrapper>
    )
}

export default ConformModal;




