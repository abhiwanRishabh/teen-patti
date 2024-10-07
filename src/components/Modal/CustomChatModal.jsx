import { messages } from "../../constants/messages";
import { raiseEvent } from "../../constants/socketKeys";
import { publish } from "../../CustomEvents/event";
import useSearchParams from "../../hooks/useSearchParams";
import { socket } from "../../socket/socket";
import ModalWrapper from "./ModalWrapper/ModalWrapper";

function CustomChatModal({ show, onClose, setChatMessage, userData }) {
  const query = useSearchParams();
  const sendMessageRaiseEvent = (payload) => {
    const eventData = {
      roomName: query.get("roomName"),
      EventCode: 20,
      SendTo: "Other", //__ Other/All
      CustomData: {
        //  here we provide all the data want to send.
        sendingUser: payload?.socketId,
        payload: payload,
      },
    };
    publish(raiseEvent, eventData);
  };

  const sendMessage = (data) => {
    const { message } = data;
    const payload = {
      message,
      user_id: userData?.uid,
    };
    setChatMessage(payload);
    sendMessageRaiseEvent(payload);

    setTimeout(() => {
      setChatMessage(null);
    },2000)
    onClose();
  };

  return (
    <ModalWrapper
      show={show}
      onClose={() => onClose(false)}
      title="Chat"
      size="md"
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        {messages.map((item) => (
          <div
            className="buttonActive cursor-pointer hover:scale-[1.05] transition-all rounded-md text-white px-2 py-2 flex justify-center text-center items-center text-lg lg:text-sm sm:text-xs"
            key={item.id}
            onClick={() => sendMessage(item)}
          >
            {item.message}
          </div>
        ))}
      </div>
    </ModalWrapper>
  );
}

export default CustomChatModal;
