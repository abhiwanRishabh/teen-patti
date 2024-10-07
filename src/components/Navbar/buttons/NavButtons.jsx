import Button from "../../button/Button";


const NavButtons = ({icon,handleClick }) => {
	return (
		<div>
			<img src={icon} ></img>
			<Button text={"Add Friend"} handleClick={handleClick} className=''></Button>
		</div>
	);
}

export default NavButtons;
