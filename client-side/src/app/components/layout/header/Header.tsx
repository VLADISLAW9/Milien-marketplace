import { FC } from 'react'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import AuthorizationButtons from './buttons/AuthorizationButtons'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'
import UserHeader from './user/UserHeader'

const Header: FC = () => {
	const { isAuth, user, isLoadingAuth } = useTypedSelector(state => state.user)

	if (isLoadingAuth) {
		return (
			<div className='px-[50px] py-[20px] flex items-center'>
				<HeaderLogo />
				<HeaderSearch />
				<div className='flex w-[15%]  items-center flex-auto justify-end'></div>
			</div>
		)
	}

	return (
		<div className='px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<HeaderSearch />

			{isAuth && user ? <UserHeader /> : <AuthorizationButtons />}
		</div>
	)
}

export default Header
