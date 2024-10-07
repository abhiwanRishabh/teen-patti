import Header from './components/Header';
import Footer from './components/Footer';

const HomeLayout = ({ children }) => {
	// const isMoblie= window.matchMedia()
	return (
		<div className='flex flex-col justify-betwween h-full'>
			<Header></Header>
			{children}
			<Footer></Footer>
		</div>
	);
}

export default HomeLayout;
