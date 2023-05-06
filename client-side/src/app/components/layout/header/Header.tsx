import { FC } from 'react'
import LogIn from './buttons/LogIn'
import SingIn from './buttons/SingIn'

const Header: FC = () => {
	return (
		<div className='px-[50px] py-[20px] flex justify-between items-center'>
			<div className=''>
				<img src='./logo.png' alt='логотип' />
			</div>
			<div className='flex '>
				<div className='mr-7'>
					<SingIn />
				</div>
				<LogIn />
			</div>
		</div>
	)
}

export default Header
