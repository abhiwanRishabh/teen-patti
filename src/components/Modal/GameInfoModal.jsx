import ModalWrapper from "./ModalWrapper/ModalWrapper";
import Text from "../text/Text";
import Divider from "../divider/Divider";
import Button from "../button/Button";

// icons
import bootAmount from "../../assets/info/bootAmount.png";
import chalLimit from "../../assets/info/chalLimit.png";
import maxBlind from "../../assets/info/maxBlind.png";
import potLimit from "../../assets/info/potLimit.png";


function GameInfoModal({
	show, onClose, title, game
}) {

	let Info = [
		{ type: "Boot Amount", amount: game?.bootAmount, icon: bootAmount },
		{ type: "Max Blinds", amount: 4, icon: maxBlind },
		{ type: "Chaal Limit", amount: game?.chalLimit, icon: chalLimit },
		{ type: "Pot Limit", amount: game?.podLimit, icon: potLimit },
	]

	return (
		<ModalWrapper show={show} title={title} size="md" type="info" >
			<Divider w={"w-full -mt-2"} />
			<div>
				<div className="p-4 flex flex-col items -mt-6">
					{
						Info.map((e) => {
							return <InfoDetails key={e.type} {...e} ></InfoDetails>
						})
					}
				</div>
				<div className="flex justify-center">
					<Button text={"OK"} className="px-8" handleClick={onClose}></Button>
				</div>
			</div>
		</ModalWrapper>
	)
}

export function InfoDetails({ type, amount, icon }) {
	return <div className="flex flex-col justify-around ">
		<div className="flex justify-between px-8">
			<div className="flex gap-3 justify-between">
				{
					type === "Chaal Limit" ? <div className="flex">
						<img src={icon} alt="details icon" />
						<img src={icon} className="-ml-3" alt="details icon" />
					</div> : <img src={icon} alt="details icon" />
				}
				<p className="text-white"> {type}</p>
			</div>

			<Text title={amount} color={"text-white"}></Text>
		</div>
		<Divider w={"w-full "}></Divider>
	</div>
}

export default GameInfoModal;
