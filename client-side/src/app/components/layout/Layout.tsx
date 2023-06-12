import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
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
				<div className='bg-white justify-between flex relative flex-col min-h-[100vh]  max-lg:min-h-[174vh] h-[100%]'>
					<Header />
					{isAuth && user && (
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
