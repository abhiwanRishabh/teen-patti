import { useHistory } from 'react-router-dom';
import backIcon from "../../../assets/links/back.svg";
import betByHeartLogo from "../../../assets/links/HeartLogo.webp";

const Header = () => {
	const history = useHistory();
	const handleClick = () => { };
	return (
		<div className={`bg-[#191B30] flex justify-between hidden lg:flex p-2`}>
			<div onClick={handleClick} className='p-2 cursor-pointer'>
				<img src={backIcon} alt="BackIcon" />
			</div>

			<div className='grow'>
				<img src={betByHeartLogo} alt="logo" className='m-auto w-20 sm:w-10' />
			</div>
		</div>
	);
}

export default Header;
