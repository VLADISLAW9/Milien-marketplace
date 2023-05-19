import { Dispatch } from '@reduxjs/toolkit'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import { logout } from '../../../../store/slices/userSlice'
import AuthorizationButtons from './buttons/AuthorizationButtons'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'

const Header: FC = () => {
	const { isAuth } = useTypedSelector(state => state.user)

	console.log(isAuth)

	const dispatch = useDispatch<Dispatch<any>>()

	const handleLogout = () => {
		dispatch(logout())
	}

	return (
		<div className='px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<HeaderSearch />
			{isAuth ? (
				<div className='flex w-[15%] flex-auto justify-end'>
					<button onClick={handleLogout}>Выйти</button>
				</div>
			) : (
				<AuthorizationButtons />
			)}
		</div>
	)
}

export default Header
