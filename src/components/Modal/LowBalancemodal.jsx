import { useEffect } from "react";
import Button from "../button/Button";
import Text from "../text/Text";
import ModalWrapper from "./ModalWrapper/ModalWrapper";

const LowBalancemodal = ({ show, onClose, title }) => {

	let timeout = setTimeout(() => {
		onClose();
		clearTimeout(timeout);
	}, 2000);

	// useEffect(() => {

	// 	return () => clearTimeout(timeout);
	// }, [onClose])

	return (
		<ModalWrapper show={show} onClose={() => onClose()} title={title} size="md" title={title}>
			<div className="p-4 flex flex-col  items-center justify-center text-center gap-8">
				<Text title={"You don't have enough coins to play the game"} color={"text-white"}></Text>
				<Button className="buttonAccept grow w-20" text={"ok"} handleClick={() => onClose()} />
			</div>
		</ModalWrapper>
	);
}

export default LowBalancemodal;
