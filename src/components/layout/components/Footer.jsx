import React from 'react';
import betByHeartLogo from "../../../assets/links/HeartLogo.svg";
import join_textname from "../../../assets/links/join_textname.webp";

import telegram from "../../../assets/links/telegram.svg";
import whatsApp from "../../../assets/links/whatsApp.svg";
import insta from "../../../assets/links/insta.svg";




const Footer = () => {
	return (
		<div className={`bg-[#191B30] flex justify-between items-center px-8 py-2 w-full h-32 hidden lg:flex`}>
			<div className='flex gap-4 justify-center items-center lg:max-w-[25%] md:max-w-[50%] sm:max-w-[50%]'>

				<img src={betByHeartLogo} alt="Bet Logo" width={"40%"} className='w-16' />

				<p className=' text-white text-xs '>A community of passionate gamers who have put together a unique gaming platform that upgrades your gameplay experience to a whole new level.
				</p>
			</div>

			<div className='flex flex-col items-center'>
				<div className='w-2/6 '>
					<img src={join_textname} alt="join textname" height={"30px"} className='m-auto' />
				</div>

				<div className='flex gap-2 p-1'>
					<img src={telegram} alt="" width={"20px"} />
					<img src={insta} alt="" width={"20px"} />
					<img src={whatsApp} alt="" width={"20px"} />
				</div>

				<div className='flex'>
					<div className='p-1 text-white text-xs border-r-2 border-slate-800'>Our Platform Features</div>
					<div className='p-1 border-r-2 border-slate-800 text-white text-xs'>Privacy Policy</div>
					<div className='p-1 text-white text-xs'>About Us</div>
				</div>

			</div>


		</div>

	);
}

export default Footer;
