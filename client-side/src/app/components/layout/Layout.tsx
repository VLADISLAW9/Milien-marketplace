import { FC } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'

interface ILayoutProps {
	children: any
}

const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className='flex relative flex-col min-h-[100vh] h-[100%]'>
			<Header />
			<main className='flex-[1] px-[50px] py-[20px]'>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
