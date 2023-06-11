import { FC, useEffect, useState } from 'react'
import { useFetching } from '../../../../hooks/use-fetching'
import { useTypedSelector } from '../../../../hooks/use-typed-selector'
import UserService from '../../../../services/UserService'
import { IUser } from '../../../../types/IUser'
import DotsLoader from '../../ui/spiner/DotsLoader'
import AuthorizationButtons from './buttons/AuthorizationButtons'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'
import UserHeader from './user/UserHeader'

const Header: FC = () => {
	const { isAuth } = useTypedSelector(state => state.user)
	const [user, setUser] = useState<IUser | null>(null)
	const [fetchUser, isLoading, error] = useFetching(async () => {
		const response = await UserService.getUserData()
		setUser(response.data.user)
	})

	useEffect(() => {
		fetchUser()
	}, [])

	if (isLoading) {
		return (
			<div className='fixed header z-[50] bg-white px-[50px] py-[20px] flex items-center'>
				<HeaderLogo />
				<HeaderSearch />
				<div className='flex w-[15%] items-center flex-auto justify-end'>
					<DotsLoader />
				</div>
			</div>
		)
	}

	return (
		<div className='fixed header z-[50] bg-white px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<HeaderSearch />

			{isAuth && user ? <UserHeader user={user} /> : <AuthorizationButtons />}
		</div>
	)
}

export default Header
