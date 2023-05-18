import { FC } from 'react'
import { useLocation } from 'react-router-dom'
import Footer from './footer/Footer'
import Header from './header/Header'

interface ILayoutProps {
	children: any
}

const Layout: FC<ILayoutProps> = ({ children }) => {
	const location = useLocation()

	return (
		<>
			{location.pathname === '/signin' || location.pathname === '/login' ? (
				<main className='flex items-center justify-center h-screen'>{children}</main>
			) : (
				<div className='bg-white flex relative flex-col min-h-[100vh] h-[100%]'>
					<Header />
					<main className='flex-[1] px-[50px]'>{children}</main>
					<Footer />
				</div>
			)}
		</>
	)
}

export default Layout
