import Button from '../button/Button';

const ProfileCard = ({ icon, btnText, btnType ,type ,isActive}) => {
	return (
		<div className='flex flex-col gap-4'>
			<div>
				<img src={icon} alt="Profile Icon" />
			</div>
			<Button text={btnText} type={type} btnType={btnType} isActive={isActive}></Button>
		</div>
	);
}

export default ProfileCard;
