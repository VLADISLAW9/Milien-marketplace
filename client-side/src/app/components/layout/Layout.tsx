import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import YandexAd_list_right from '../ui/Advertisement/YandexAd_list_right'
import AddAdvrt from './addAdvrt/AddAdvrt'
import Footer from './footer/Footer'
import Header from './header/Header'

interface ILayoutProps {
	children: any
}

const Layout: FC<ILayoutProps> = ({ children }) => {
	const location = useLocation()
	const { isAuth, user } = useTypedSelector(state => state.user)
	const { isBlur } = useTypedSelector(state => state.isBlur)
	return (
		<>
			{location.pathname === '/signin' ||
			location.pathname === '/opportunities' ||
			location.pathname === '/login' ||
			location.pathname === '/payment-success' ||
			location.pathname === '/forgot-password' ? (
				<main
					className={
						location.pathname === '/opportunities'
							? ''
							: 'flex items-center justify-center h-screen'
					}
				>
					{children}
				</main>
			) : (
				<div className='bg-white justify-between flex relative flex-col min-h-[100vh] max-lg:min-h-[100vh] h-[100%]'>
					<Header />
					<div className='fixed py-[20px] max-w-[160px] min-h-[100vh] yandexAd_list  right-[20px] top-0'>
						<YandexAd_list_right />
					</div>

					{isAuth &&
						user &&
						location.pathname !== '/createAdvrt' &&
						!location.pathname.includes('/chat') && (
							<div className='fixed z-[30] right-[67px] bottom-16	'>
								<AddAdvrt />
							</div>
						)}
					<main
						className={
							isBlur
								? 'flex-[1] bg-white  mt-24 max-xl:px-[25px] px-[50px] transition-all pb-20 blur-sm'
								: 'flex-[1] bg-white max-xl:px-[25px] mt-24 pb-20 px-[50px]'
						}
					>
						{children}
					</main>
					<Footer />
				</div>
			)}
		</>
	)
}

export default Layout
