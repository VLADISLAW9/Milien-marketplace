import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import YandexAd_list from '../ui/Advertisement/YandexAd_list'
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
			location.pathname === '/login' ||
			location.pathname === '/payment-success' ||
			location.pathname === '/forgot-password' ? (
				<main className='flex items-center justify-center h-screen'>
					{children}
				</main>
			) : (
				<div className='bg-white justify-between flex relative flex-col min-h-[100vh]  max-lg:min-h-[100vh] h-[100%]'>
					<Header />
					<div className='fixed py-[20px] max-w-[160px] min-h-[100vh - 20px] yandexAd_list right-[20px] top-0'>
						<YandexAd_list />
					</div>
					{isAuth && user && location.pathname !== '/createAdvrt' && (
						<div className='fixed z-[30] right-14 bottom-16	'>
							<AddAdvrt />
						</div>
					)}
					<main
						className={
							isBlur
								? 'flex-[1] mt-24 max-xl:px-[25px] px-[50px] transition-all  blur-sm'
								: 'flex-[1] max-xl:px-[25px] mt-24 px-[50px]'
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
