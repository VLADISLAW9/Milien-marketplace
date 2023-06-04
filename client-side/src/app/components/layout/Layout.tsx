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

	return (
		<>
			{location.pathname === '/signin' ||
			location.pathname === '/login' ||
			location.pathname === '/payment-success' ? (
				<main className='flex items-center justify-center h-screen'>
					{children}
				</main>
			) : (
				<div className='bg-white flex relative flex-col min-h-[100vh] h-[100%]'>
					<Header />
					{isAuth && user && (
						<div className='fixed right-14 bottom-16	'>
							<AddAdvrt />
						</div>
					)}

					<main className='flex-[1] px-[50px]'>{children}</main>
					<Footer />
				</div>
			)}
		</>
	)
}

export default Layout
