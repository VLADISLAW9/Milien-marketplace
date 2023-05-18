import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useActions } from '../../../../hooks/use-actions'
import AuthorizationButtons from './buttons/AuthorizationButtons'
import HeaderLogo from './logo/HeaderLogo'
import HeaderSearch from './search/HeaderSearch'

const Header: FC = () => {
	const dispatch = useDispatch()
	const { removeUser } = useActions()

	return (
		<div className=' px-[50px] py-[20px] flex items-center'>
			<HeaderLogo />
			<HeaderSearch />
			<AuthorizationButtons />
		</div>
	)
}

export default Header
