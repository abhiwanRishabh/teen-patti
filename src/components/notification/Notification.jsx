import React from 'react';

const Notification = ({ text ,notificationRef}) => {
	return (
		<div className='absolute top-16 w-full' ref={notificationRef}>
			<div className='flex justify-center'>
				<div className={`notificationBg text-white font-semibold px-3 sm:text-xs lg:text-lg border border-l-transparent border-r-transparent border-t-pink-500 border-b-pink-500 w-fit`}>
					{text}
				</div>
			</div>

		</div>
	);
}

export default Notification;
