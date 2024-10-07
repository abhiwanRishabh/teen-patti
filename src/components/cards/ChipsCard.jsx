import allChips from "../../assets/allChips.webp";
import addChips from "../../assets/addedChips.webp";

const ChipsCard = ({ amount = "8,45,645", type, className }) => {
	return (
		<div className={`${type === "add" ? "flex" : ""} items-center ${className}`}>
			<img src={type === "add" ? addChips : allChips} alt="All Chips" className={`sm:w-${type === "add" ? 6 : 12} lg:w-${type === "add" ? 8 : 24} md:w-${type === "add" ? 6 : 24} m-auto`} />

			<div className={`chipsBg text-white text-${type === "add" ? "xs" : "lg"}font-semibold px-3 sm:text-xs lg:text-lg border border-l-transparent border-r-transparent border-t-blue-900 border-b-blue-900 text-center`}>
				{amount}
			</div>
		</div>
	);
}

export default ChipsCard;
