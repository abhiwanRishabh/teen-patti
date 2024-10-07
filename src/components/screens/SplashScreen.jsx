import { useEffect, useState } from 'react';
import logo from "../../assets/logo.webp";
import { backgroundColor } from '../../utils/color';
// import { useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';
import { Redirect, useHistory } from "react-router-dom";
import modelImg from "../../assets/model.webp";

import spbg from "../../assets/spbg.webp";

const SplashScreen = () => {

	const [progress, setProgress] = useState(1);
	const [showLoading, setShowLoading] = useState(false);

	// const navigate = useNavigate();
	const history = useHistory();

	useEffect(() => {
		let interval
		if (showLoading) {
			interval = setInterval(() => {
				// //("console running", progress);
				if (progress > 100) {
					clearInterval(interval);
					// navigate("/home", { replace: true });
					// <Redirect to={"/home"}></Redirect>
					history.replace("/home");
				} else {
					// if (progress > 60) {
					// 	document.getElementById("logoIcon").classList.add("moveUp");
					// }
					setProgress((prev) => prev + 20)
				}
			}, 100);
		}

		return () => { clearInterval(interval) }
	}, [progress, showLoading])

	useEffect(() => {
		setTimeout(() => {
			setShowLoading(true);

		}, 1000)
	}, [])


	return (
		<div className={`h-full background bg-no-repeat bg-bottom sm:bg-right-bottom relative`}>
			<img src={logo}
				alt="Teen patti"
				id='logoIcon'
				className='absolute right-5 top-5 max-w-36'
			/>
			<img src={modelImg}
				alt="Teen patti"
				id='logoIcon'
				className='absolute left-0 bottom-0 max-h-[90vh] '
			/>

			{
				showLoading && <div className='w-11/12 lg:w-4/6 sm:w-11/12 absolute right-5 bottom-2'>
					<Loader progress={progress} ></Loader>
				</div>
			}
		</div>
	);
}

export default SplashScreen;
