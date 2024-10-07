import Button from '../../button/Button';
import CustomRangeInput from '../../input/customInputRange';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useEffect, useState } from 'react';
import wait from '../../../utils/timer';


const BetRise = ({ max, min, risedBetAmount, setRisedBetAmount, allIn }) => {
	// const [value, setValue] = useState(min);
	const percentage = ((risedBetAmount - min) / (max - min)) * 100;

	const handleChange = (e) => {
		setRisedBetAmount(e.target.value);

	};

	const incValx = (val) => {
		setRisedBetAmount(min * val)
	};
	//("risedBetAmount", risedBetAmount);

	return (
		<div className='gradient-border absolute lg:-top-72 sm:-top-64 -left-32 w-[180px] '>
			<div className='riseBarBg p-2 rounded-md flex flex-col gap-4'>

				<Button isGameBtn text={"$ 50k"} className='text-white font-semibold w-[155px]  sm:text-sm lg:text-lg' handleClick={() => setRisedBetAmount(min + 50000)}></Button>

				<div className='flex justify-center items-center '>
					<div className='grow flex flex-col gap-3'>
						<Button isGameBtn text={"All in"} className='text-white font-semibold w-20 lg:text-base sm:text-sm'
							handleClick={() => {
								setRisedBetAmount(max);
								allIn()
							}}
						/>

						<Button isGameBtn text={"Bet x 5"} className='text-white font-semibold w-20 lg:text-base sm:text-sm' handleClick={() => incValx(5)} />

						<Button isGameBtn text={"Bet x 2"} className='text-white font-semibold w-20 lg:text-base sm:text-sm' handleClick={() => incValx(2)} />

						<Button isGameBtn text={"Bet x 1"} className='text-white font-semibold w-20 lg:text-base sm:text-sm'
						// handleClick={() => setValue(min * 1)} 
						/>
					</div>

					<div className=''>
						<CustomRangeInput min={min} max={max} step={1} handleChange={handleChange} percentage={percentage} value={risedBetAmount} />

					</div>
				</div>

				<div className='flex justify-around items-center '>

					<Button rounded iconStyle={""} handleClick={() => setRisedBetAmount(risedBetAmount - min)}>
						<FaMinus className='text-white font-black lg:text-2xl sm:text-xl'></FaMinus>
					</Button>
					<Button rounded handleClick={() => setRisedBetAmount(risedBetAmount + min)}>
						<FaPlus className='text-white font-black lg:text-2xl sm:text-xl ' />
					</Button>
				</div>

			</div>
		</div>
	);
}

export default BetRise;
