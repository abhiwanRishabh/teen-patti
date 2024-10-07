import settingIcon from "../../assets/icons/setting.svg";
import iIcon from "../../assets/icons/i.svg";
import messageIcon from "../../assets/icons/message.svg";
import Button from "../../components/button/Button";


const ActionInfoButtons = ({setOpenSetting,setShowInformation,handleBack,setOpenChatModal}) => {
	return (
		<div>
			<div className="fixed lg:left-10 lg:top-4 sm:left-4 sm:top-2 cursor-pointer z-10">
				<button className="buttonCancel shadow-lg cursor-pointer lg:text-lg sm:text-xs " onClick={handleBack}>Exit to lobby</button>
			</div>

			<div className="fixed right-10 top-4 flex flex-col gap-6 z-10" >

				<Button icon={settingIcon} className="lg:w-12 lg:h-12 sm:w-8 sm:h-8 " iconStyle={"sm:mt-0.5"} handleClick={() => {
					setOpenSetting(true);
				}} ></Button>

				<Button icon={iIcon} className="lg:w-12 lg:h-12 sm:w-8 sm:h-8 " iconStyle={"lg:w-1.5 lg:ml-4 sm:w-1 sm:ml-2 sm:mt-1"} handleClick={() => {
					setShowInformation(true);
				}}></Button>

			</div>

			<div className="fixed lg:right-32 sm:right-24 top-4 z-10">
				<Button icon={messageIcon} className="lg:w-12 lg:h-12 sm:w-8 sm:h-8 " iconStyle={"lg:mt-2 sm:mt-1"} handleClick={() => {
					setOpenChatModal(true);
				}}></Button>
			</div>

		</div>
	);
}

export default ActionInfoButtons;
