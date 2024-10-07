import userProfile from "../../assets/userProfile.svg";
import settingIcon from "../../assets/setting.svg";
import coin from "../../assets/coin.svg";
import Button from '../button/Button';
import logo from "../../assets/logo.svg";
import { gameSound } from '../../App';

const Navbar = ({ setOpenProfileModal, setOpenSettingModal }) => {

	const openProfileMenu = () => {
		gameSound.playClickSound();
		setOpenProfileModal(true)
	}

	const openSettingModal = () => {
		gameSound.playClickSound();
		setOpenSettingModal(true)
	}

	return (
		<div className='nav h-1/12 relative p-2 flex justify-between items-center border-b-2 border-[#A939C9]'>
			<div className='flex gap-10 items-center'>
				<div className='flex gap-1 items-center cursor-pointer' onClick={openProfileMenu}>
					<img src={userProfile} alt="" className=' w-10 lg:w-12 ' />
					<p className='font-bold text-[#FFFFFF] text-xs sm:text-xs lg:text-lg '>UserGuest</p>
				</div>

				{/* conin value show */}
				<div className='relative text-xs lg:text-base sm:text-xs'>
					<img src={coin} alt="amount Coin" className='w-6 lg:w-8 sm:w-6 absolute -left-2 sm:-left-2 lg:-left-4 -top-1' />
					<div className='gradient-border'>
						<div className='bg-[#351441] text-[#DFC228] font-semibold px-4 rounded-md  '>
							100,00
						</div>
					</div>
				</div>

			</div>

			<div
				className='absolute top-[100%] left-[42%] md:left-[44%] lg:left-[45%]'>
				<div className=' w-full flex justify-center'>
					<div className="outside-circle w-22 sm:w-24 lg:w-40">
						<img src={logo} alt="Teen patti" className='rotate-180 -mt-7 lg:-mt-16 m-0.5' width={"100%"} />
					</div>
				</div>
			</div>

			<div className='flex items-center justify-center gap=[-10px]'>
				{/* <div>
					<img src={profileTab} alt="Profile Tab" width={"90%"} />
				</div>
				<div>
					<img src={winnerTab} alt="Winner Tab" width={"90%"} />
				</div> */}

				<div onClick={openSettingModal} className='flex items-center text-xs sm:text-xs lg:text-base relative'>
					<img src={settingIcon} alt="Setting Tab" className='w-6 lg:w-9 sm:w-7 z-10 relative ' />
					<Button text={"Settings"} className='relative -left-4 sm:-left-5 lg:-left-7 sm:pl-6 lg:pl-8 pl-5 py-0 shadow'></Button>
				</div>

			</div>

		</div>
	);
}

export default Navbar;
