import { FC } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsGeoAlt } from 'react-icons/bs'
import { RxHamburgerMenu } from 'react-icons/rx'
import LogIn from './buttons/LogIn'
import SingIn from './buttons/SingIn'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'
import AuthorizationButtons from './buttons/AuthorizationButtons'

const Header: FC = () => {
	return (
		<div className=' px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<HeaderSearch />
			<AuthorizationButtons />
			
		</div>
	)
}

export default Header
