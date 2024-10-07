import { useCallback, useEffect, useState } from 'react';
import cardBack from "../../assets/tokens/cardBack.webp";
import Text from '../text/Text';
import Button from '../button/Button';
import anime from 'animejs';
import CircularProgressBar from '../loader/CircularProgressBar';
import crawn from "../../assets/crawn.webp";
import ChipsCard from './ChipsCard';
import { gameStatus } from '../../constants/states';


const PlayerCard = ({ userIcon, playerPosition, showCards, handleShow, showGameInfo, player, gameStatus, currentPlayerIndex, currentPlayer, mainGame, playerBettingIndex }) => {

	// //("cpi vs PP", currentPlayerIndex, playerPosition)

	// //("card Player",player)
	var z1 = window.matchMedia("(orientation : landscape) and (max-width : 950px ) and (max-height : 450px)");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getChipX = useCallback((position) => {
		// if (position === 0) {
		// 	return {
		// 		x: "23vw",
		// 		y: "17vh"
		// 	}
		// } else if (position === 1) {
		// 	return {
		// 		x: "-23vw",
		// 		y: "10vw"
		// 	}
		// } 

		if (position === 0) {
			//("yha aaya 0")
			return {
				x: "-23vh",
				y: "10vw"
			}
		} else if (position === 1) {
			//("yha aaya 1")
			return {
				x: "-23vh",
				y: "-10vw"
			}
		}
		else if (position === 2) {
			//("yha aaya 2")
			return {
				x: "23vh",
				y: "-10vw"
			}
		} else if (position === 3) {
			//("yha aaya 3")
			return {
				x: "23vh",
				y: "10vw"
			}
		}
	}, [])

	// const givenChipAnimate = useCallback((position) => {
	// 	anime({
	// 		targets: `.addChips${position}`,
	// 		keyframes: [
	// 			{
	// 				translateX: 0,
	// 				translateY: 0,
	// 				// opacity: 1,
	// 				scale: 1
	// 			},
	// 			{
	// 				translateX: getChipX(position).x,
	// 				translateY: getChipX(position).y,
	// 				// opacity: 0,
	// 				scale: 1,
	// 			},
	// 		],
	// 		duration: 2000,
	// 		easing: "linear",
	// 	})
	// }, [getChipX])

	useEffect(() => {
		// givenChipAnimate(playerBettingIndex + 1);
		// //(" beetin in dex and palyerIndex", playerBettingIndex, playerPosition);
		// //(playerBettingIndex)
		anime({
			targets: `.addChips${playerBettingIndex}`,
			// targets: `.addChips`,
			keyframes: [
				{
					opacity: 1
				}
				,
				{
					opacity: 1
				},
				{
					opacity: 0
				}
			],
			translateX: getChipX(playerBettingIndex).x,
			translateY: getChipX(playerBettingIndex).y,
			// opacity: 0.5,
			duration: 1000,
			// rotate: '12deg',
			easing: "easeInOutQuad",
		})
	}, [getChipX, playerBettingIndex, mainGame.gameStatus])
	useEffect(() => {
		// givenChipAnimate(playerBettingIndex + 1);
		// //(" beetin in dex and palyerIndex", playerBettingIndex, playerPosition);
		// //(playerBettingIndex)
		mainGame?.gameStatus === gameStatus.dealing && anime({
			targets: `.addChips${playerPosition - 1}`,
			// targets: `.addChips`,
			keyframes: [
				{
					opacity: 1
				}
				,
				{
					opacity: 1
				},
				{
					opacity: 0
				}
			],
			translateX: getChipX(playerPosition - 1).x,
			translateY: getChipX(playerPosition - 1).y,
			// opacity: 0.5,
			duration: 1000,
			// rotate: '12deg',
			easing: "easeInOutQuad",
		})
	}, [mainGame?.gameStatus])

	const getX = useCallback(() => {

		if (playerPosition === 1) {
			return {
				x: "20vw",
				y: "5vh"
			}
		} else if (playerPosition === 2) {
			return {
				x: "-20vw",
				y: "5vw"
			}
		} else if (playerPosition === 3) {
			return {
				x: "20vh",
				y: "-20vw"
			}
		} else if (playerPosition === 4) {
			return {
				x: "-20vh",
				y: "-20vw"
			}
		}
	}, [playerPosition])

	// if (playerPosition === 1) {
	// 	playerPxy = {
	// 		x: "20vw",
	// 		y: "5vh"
	// 	}
	// } else if (playerPosition === 2) {
	// 	playerPxy = {
	// 		x: "15vw",
	// 		y: "-10vw"
	// 	}
	// } else if (playerPosition === 3) {
	// 	playerPxy = {
	// 		x: "-10vh",
	// 		y: "-40vw"
	// 	}
	// } else if (playerPosition === 4) {
	// 	playerPxy = {
	// 		x: "-10vh",
	// 		y: "-40vw"
	// 	}
	// }




	useEffect(() => {
		// if (!showGameInfo) {

		anime({
			targets: `.card1${playerPosition}`,
			keyframes: [
				{
					translateX: getX().x,
					translateY: getX().y,
					opacity: 1,
					scale: 0,
				},
				{
					translateX: 0,
					translateY: 0,
					opacity: 1,
					rotate: '12deg',
					scale: 1
				},
			],
			duration: 700,
			// rotate: '12deg',
			easing: "linear",
		})
		anime({
			targets: `.card2${playerPosition}`,
			keyframes: [
				{
					translateX: getX().x,
					translateY: getX().y,
					opacity: 1,
					scale: 0,
				},
				{
					translateX: 0,
					translateY: 0,
					opacity: 1,
					rotate: '-12deg',
					scale: 1,
				},
			],
			duration: 700,
			delay: 100,
			// rotate: '12deg',
			easing: "linear",
		})
		anime({
			targets: `.card3${playerPosition}`,
			keyframes: [
				{
					translateX: getX().x,
					translateY: getX().y,
					opacity: 1,
					scale: 0,
				},
				{
					translateX: 0,
					translateY: 0,
					opacity: 1,
					rotate: '0deg',
					scale: 1,
				},
			],
			duration: 700,
			delay: 200,
			rotate: '12deg',
			easing: "linear",
		})

		// add chips

		// anime({
		// 	targets: `.addChips${playerPosition}`,
		// 	// targets: `.addChips`,
		// 	keyframes: [
		// 		{
		// 			opacity: 1
		// 		}
		// 		,
		// 		{
		// 			opacity: 1
		// 		},
		// 		{
		// 			opacity: 0
		// 		}
		// 	],
		// 	translateX: getChipX().x,
		// 	translateY: getChipX().y,
		// 	// opacity: 0.5,
		// 	duration: 1500,
		// 	// rotate: '12deg',
		// 	easing: "easeInOutQuad",
		// })


	}, [getX, playerPosition, showGameInfo])


// flip animation
	useEffect(() => {
		if (player.seen) {
			anime({
				targets: ".flip:nth-child(1)",
				rotateY: 180,
				duration: 500,
				// easing: 'easeInOutQuad'
				rotate: '-12deg',
				easing: 'linear'
			});
			anime({
				targets: ".flip:nth-child(2)",
				rotateY: 180,
				duration: 500,
				// easing: 'easeInOutQuad'
				rotate: '12deg',
				easing: 'linear'
			});
			anime({
				targets: ".flip:nth-child(3)",
				rotateY: 180,
				duration: 500,
				// easing: 'easeInOutQuad'
				easing: 'linear'
			});
		}
	}, [player.seen])

	// //("(+currentPlayerIndex === +playerBettingIndex) ", +currentPlayerIndex, "||", +playerBettingIndex);
	//("side show user ....>>>", mainGame?.sideShow?.user);
	return (
		<div className=' relative px-10 w-80 md:w-40 sm:w-40 flex flex-col items-center'>

			<div className='relative mb-4 flex flex-col items-center'>
				<div className='relative flex flex-col justify-center items-center'>
					<div className='absolute md:-top-5 sm:-top-4 w-12'>
						{/* <img src={crawn} alt="" className='absolute w-14  sm:-top-7 lg:-top-9 '   /> */}

						<Text title={player?.username} color={"text-white sm:text-xs lg:text-base"}></Text>
					</div>

					<div className='z-0'>
						{player?.username == currentPlayer?.username && player?.turn && <CircularProgressBar percentage={80}
							start={player?.username == currentPlayer?.username ? true : false} player={player} />}
						{/* <Pulse>
						</Pulse> */}
						{/* packed Screen */}

						{player.packed && <div className='absolute  z-30 w-24 object-fill lg:w-20 md:w-16 sm:w-12 lg:h-20 md:h-16 sm:h-12 packedBase ' >
							<div className='packed grid place-items-center  font-semibold text-base lg:text-base md:text-base sm:text-xs'>
								Packed
							</div>
						</div>}

						<img src={userIcon} alt='ffff'
							className='w-24 object-fill lg:w-24 md:w-12 sm:w-12 z-20 relative'
						/>

						{/* profile side show glow */}
						{mainGame?.sideShow?.status &&
							mainGame?.sideShow?.user.find(e => e.username === player.username)
							&& <div className=' p-1 rounded-full ring-glow-container2 absolute sm:-top-[4px] sm:-left-[3px]'>
								<div className=' p-1 rounded-full ring-glow-container1 '>
									<div className='p-1 rounded-full ring-glow-container'>
										<div
											className='w-24 object-fill lg:w-16 md:w-12 sm:w-8 lg:h-16 md:h-12 sm:h-8 z-1 glowsize'
										/>
									</div>
								</div>
							</div>}
					</div>
				</div>
				{!showGameInfo && player.hand && <div
					// lg class
					className='relative lg:w-14 lg:-top-10 lg:left-2 sm:w-8 sm:-top-4'
				// className='relative sm:w-10 sm:-top-4'
				>
					{/* <img src={showCards ? `/tokens/${player.hand?.cards[0].name}.webp` : cardBack} alt='card1' className={`card1${playerPosition} ${showCards ? "flip" : ""} absolute  rotate-12	lg:left-10 lg:top-1.5  sm:left-6 sm:top-1`}
					/> */}
					<img src={player?.seen ? `/tokens/${player.hand?.cards[0].name}.webp` : cardBack} alt='card1' className={`card1${playerPosition} ${player.seen ? "flip" : ""} absolute  rotate-12	lg:left-10 lg:top-1.5  sm:left-6 sm:top-1`}
					/>

					<img src={player?.seen || showCards ? `/tokens/${player.hand?.cards[1].name}.webp` : cardBack} alt='card3' className={`card2${playerPosition} ${player.seen ? "flip" : ""} absolute -rotate-12 lg:-left-10 lg:top-1.5  sm:-left-6 sm:top-1`}
					/>
					<img src={player?.seen || showCards ? `/tokens/${player.hand?.cards[2].name}.webp` : cardBack} alt='card2' className={`card3${playerPosition} ${player.seen ? "flip" : ""} absolute`}
					/>
				</div>}
			</div>
			<div className='relative w-3/6 lg:-top-8 sm:-top-6 h-8 flex justify-center'>

				{!showCards && !player?.seen && player?.hand
					// && player?.username === "ME" 
					&& <Button text={"See"} handleClick={() => {
						handleShow(true)
						player.seeCards();
						// player.seeCards()
					}} isGameBtn className='text-white font-semibold sm:p-1 sm:text-xs lg:text-base' ></Button>}

			</div>

			<div className=''>
				{/* chip Card */}

				{player?.turn && playerBettingIndex === 1 && <ChipsCard type={"add"} className={`w-6 absolute  top-0 addChips${playerBettingIndex}`} amount={mainGame?.currentBet} />}

				{player?.turn && playerBettingIndex === 0 && <ChipsCard type={"add"} className={`w-6 absolute  top-0 addChips${playerBettingIndex} `} amount={mainGame?.currentBet} />}

				{(player?.turn && playerBettingIndex === 2) || mainGame.gameStatus === gameStatus.dealing && <ChipsCard type={"add"} className={`w-6 absolute  top-0 addChips${playerBettingIndex} `} amount={mainGame?.currentBet} />}

				{player?.turn && playerBettingIndex === 3 && <ChipsCard type={"add"} className={`w-6 absolute  top-0 addChips${playerBettingIndex} `} amount={mainGame?.currentBet} />}
				{/* 
				{(player?.turn ) || mainGame.gameStatus === gameStatus.dealing && <ChipsCard type={"add"} className={`w-6 absolute  top-0 addChips${playerBettingIndex} `} amount={mainGame?.currentBet} />} */}
				{/* ^ chip card for every palyer */}

				<div className='text-white text-center font-semibold sm:text-xs sm:-mt-3 lg:text-base lg:-mt-1 text-nowrap'>$ {player.chips}</div>
			</div>
		</div>
	);
}

export default PlayerCard;
