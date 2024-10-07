import React, { useMemo, useState } from "react";
import coinIcon from "../../assets/icons/coinIcon.svg";
// import { useSelector } from "react-redux";
import Text from "../text/Text";
import Button from "../button/Button";
import plus from "../../assets/icons/plus.svg";
import minus from "../../assets/icons/minus.svg";
import { useDispatch, useSelector } from "react-redux";
import { setRoomAmount } from "../../redux/slice/gameSlice";

let DEFUALT_PRICES = [];
function CoinCounterCard() {
  const { gameMode, roomType } = useSelector((state) => state.game);

  if (gameMode === "Private") {
    DEFUALT_PRICES = [1000];
  } else {
    DEFUALT_PRICES = [5, 25, 100, 500, 1000];
  }

  const [price, setPrices] = useState(1);
  const dispatch = useDispatch();

  //** handle increment */
  // const handleIncrement = () => {
  //   setPrices((prev) => {
  //     if (prev !== DEFUALT_PRICES.length - 1) {
  //       return prev + 1;
  //     }
  //     return prev;
  //   });
  // };

  // //** handle increment */
  // const handleDecrement = () => {
  //   setPrices((prev) => {
  //     if (prev > 0) {
  //       return prev - 1;
  //     }
  //     return prev;
  //   });
  // };

  // handle custom value for unlimited room

  const handleCustomPrice = (e) => {
    const value = e.target.value;

    // Validate input: only allow digits and up to 2 decimal places
    const regex = /^(0|[1-9]\d*)(\.\d{0,2})?$/;

    // Check if the input matches the regex and is less than 10,00,000
    if (regex.test(value) && parseFloat(value) < 1000000) {
      setPrices(value);
      dispatch(setRoomAmount(value))
    } else if (value === '') {
      setPrices(''); // Allow clearing the input
    }
  };


  return (
    <div className="counter flex items-center justify-around gap-3 w-11/12  sm:w-10/12 m-auto md:w-8/12 lg:w-full mt-2 ">
      {/* decrement button */}

      {/* {roomType !== "unlimited" && (
        <Button
          icon={minus}
          className="px-2.5 py-4"
          isActive
          handleClick={handleDecrement}
          iconStyle={"w-4/6 m-auto"}
        />
      )} */}

      <div className="counter-card rounded-3xl border-2 button h-auto flex-1 drop-shadow-xl">
        <div className="body p-[.15rem]">
          <div className="counter-card-inner rounded-tl-2xl rounded-tr-2xl h-auto p-2">
            <div className="flex items-center justify-center gap-2">
              <div className="w-6 xxl:w-8">
                <img src={coinIcon} alt={"coinIcon"} />
              </div>
              <Text title="Coins" color="text-white text-xl xxl:text-2xl" />
            </div>

            <div className="counter-value bg-[#0D0541] mt-2 py-1 w-4/6 sm:w-5/6 rounded-xl border border-[#D2CCEC] m-auto">
              {/* {
                roomType === "unlimited" ?
                
                :
                <Text title={`${gameMode?.name === 'Private' ? 1000 : DEFUALT_PRICES[price]}$`} color="text-white text-center text-xl tracking-wide" />
              } */}
              <input
                type="number"
                value={price}
                min="1"
                max="1000000"
                className="text-white text-center text-xl tracking-wide w-full focus:border-none focus:outline-none rounded-lg bg-[#0D0541] "
                onChange={(e) => handleCustomPrice(e)}
              />
            </div>
          </div>
        </div>
        <div className="p-2 text-center ">
          <Text
            title={`${
              gameMode?.name === "Private"
                ? `Entry $1000`
                : `Entry $${price}`
            }`}
            color="counter-text text-white text-2xl"
          />
        </div>
      </div>

      {/* incriment button */}

      {/* {roomType !== "unlimited" && (
        <Button
          icon={plus}
          className="p-2"
          isActive
          handleClick={handleIncrement}
          iconStyle={"w-4/6 m-auto"}
        ></Button>
      )} */}
    </div>
  );
}

export default CoinCounterCard;
