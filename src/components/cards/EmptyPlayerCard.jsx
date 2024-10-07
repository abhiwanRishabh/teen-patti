import contactIcon from "../../assets/icons/contact.png";
const EmptyPlayerCard = ({ handleClick,player }) => {
   //("player>>",player)
    return <div className='px-10 w-80 md:w-40 sm:w-40 flex flex-col items-center player-box player cursor-pointer' onClick={handleClick}>
        <div className="emptyPlayerBg sm:mt-2 mb-4 p-3 lg:p-4 lg:w-20 lg:h-20 sm:w-14 sm:h-14">
            <img src={contactIcon} alt='ffff'
                className=' lg:w-24 md:w-12 sm:w-12'
            />
        </div>
    </div>
};

export default EmptyPlayerCard;