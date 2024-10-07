import { useEffect, useState } from "react"
import ModalWrapper from "./ModalWrapper/ModalWrapper";

import Text from "../text/Text";
import Divider from "../divider/Divider";
import InputRange from "../input/InputRange";
import { gameSound } from "../../App";



function SettingModal({
    show, onClose
}) {

    const [value, setVolumne] = useState(5);
    const [sound, setSound] = useState(5);

    const local_vol = localStorage.getItem('vol');
    const local_sound = localStorage.getItem('sound');

    useEffect(() => {
        if (local_vol) {
            const val = +local_vol / 10;
            gameSound.updateVolume(val);
            setVolumne(+local_vol || 5);
        }
        if (local_sound) {
            const val = +local_sound / 10;
            gameSound.updateVolume(val);
            setSound(+local_sound || 5);
        }
    }, [local_vol, local_sound])

    //   handle volume
    const handleVolume = (value) => {
        const val = +value / 10;
        gameSound.updateVolume(val);
        setVolumne(value);
        localStorage.setItem('vol', value);
    };

    const handleSound = (value) => {
        const val = +value / 10;

        setSound(value);
        localStorage.setItem('sound', value);
    };

    return (
        <ModalWrapper show={show} onClose={() => onClose(false)} title="Setting" size="md" >
            <Divider w={"w-full"} />
            <div className="p-1 flex justify-around items-center">
                <Text title={"Music"} color="text-[#fcfcfc] text-sm" />

                <InputRange value={value} onChange={handleVolume} />
            </div>
            <div className="p-1 flex justify-around">
                <Text title={"Sound"} color="text-[#fcfcfc] text-sm" />

                <InputRange value={sound} onChange={handleSound} />
            </div>
        </ModalWrapper>
    )
}

export default SettingModal;