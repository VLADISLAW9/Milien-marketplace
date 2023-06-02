import { FC } from 'react'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import AuthorizationButtons from './buttons/AuthorizationButtons'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'
import UserHeader from './user/UserHeader'

const Header: FC = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	return (
		<div className='px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<HeaderSearch />
			{isAuth ? <UserHeader /> : <AuthorizationButtons />}
		</div>
	)
}

export default Header
