import rotateGif from "../../assets/gifs/rotate.webp";

const RotateScreen = () => {

	return (
		<div className="w-full h-[100vh] backdrop-blur grid place-items-center">
			{/* gif modes */}
			{/* <img src={rotateGif} alt="Rotate image" className="w-full h-full" /> */}

			<div>
				<p className="font-sans text-white text-semibold text-base">
					Please rotate Your Phone to landscape.
				</p>
				<div className="w-12 h-20 rounded bg-gray-500 border border-2 border-sky-800 m-auto phoneRotate rotatePhone"></div>
			</div>

		</div>
	);
}

export default RotateScreen;
