import React from 'react'
import SingIn from './SingIn'
import LogIn from './LogIn'

const AuthorizationButtons = () => {
	return (
		<div className='flex w-[15%] flex-auto justify-end'>
			<div className='mr-5'>
				<SingIn />
			</div>
			<LogIn />
		</div>
	)
}

export default AuthorizationButtons
