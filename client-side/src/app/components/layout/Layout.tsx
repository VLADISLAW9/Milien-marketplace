import { FC } from 'react'
import Footer from './footer/Footer'
import Header from './header/Header'
import styles from './Layout.module.scss'

interface ILayoutProps {
	children: any
}

const Layout: FC<ILayoutProps> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<Header />
			<main className={styles.content}>{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
