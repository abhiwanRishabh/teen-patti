import { useEffect } from "react";
import cancelIcon from "../../../assets/cross.svg";
import Text from "../../text/Text";
import { gameSound } from "../../../App";

function ModalWrapper(props) {

    // const handlModalHide = (e) => {
    //     if (e.target.classList.contains("backdrop")) {
    //         e.stopPropagation();
    //         props.onClose();
    //         gameSound.playClickSound();
    //     }
    // };

    useEffect(() => {
        if (props.show) {
            gameSound.playClickSound();
            document.body.style.overflow = 'hidden';
        } else {
            gameSound.playClickSound();
            document.body.style.overflow = 'auto';
        }
    }, [props.show]);

    return (
        <>
            <div
                // onClick={(e) => handlModalHide(e)}
                className={`backdrop ${props.show ? "block opactiy-100" : "hidden opactiy-0"
                    }  fixed  z-40  top-0 left-0 w-screen h-screen overflow-hidden flex items-center justify-center `}
            >
                <div
                    className={`modal  ${props.show ? "block opactiy-100 z-50" : "hidden opactiy-0"}  relative rounded-xl py-4 bg-[#1C1C1C] flex flex-col gap-3 min-w-80 max-w-80 shadow-lg backdrop-md  z-50 max-h-[90vh] overflow-x-hidden`}
                >


                    {/* close button */}
                    {(props.type !== "conform" && props.type !== "info") && <div
                        className="cursor-pointer top-4 right-4 closeButton absolute ModalCloseBtn"
                        onClick={props?.onClose}
                    >
                        <img src={cancelIcon} alt="cancelIcon" width={"50%"} />
                    </div>}

                    {/* Modal Title */}
                    {props?.title && (
                        <Text
                            title={props?.title}
                            color={`${props?.type === "conform" ? "text-white" : "text-[#FFB902]"} text-2xl text-center  flex justify-center modal-title`}
                        />
                    )}

                    {/* Modal content */}
                    {props?.children}

                </div>
            </div>
        </>
    );
}

export default ModalWrapper;