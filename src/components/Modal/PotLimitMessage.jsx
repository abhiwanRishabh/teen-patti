
const PotLimitMessage = () => {

	return (
		<div className="fixed  z-40  top-0 left-0 w-screen h-screen overflow-hidden flex items-center justify-center backdrop show" >
			<div className="text-white text-center w-full z-50 bg-red-100  opactiy-100 modal p-4 text-lg text-re">
				Pot Limit Exceeded.
			</div>
		</div >
	);
}

export default PotLimitMessage;
