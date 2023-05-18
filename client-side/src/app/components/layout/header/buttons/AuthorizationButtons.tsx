import LogIn from './LogIn_btn'
import SingIn from './SingIn_btn'

const AuthorizationButtons = () => {
	return (
		<div className='flex w-[15%] flex-auto justify-end'>
			<div className='mr-4'>
				<SingIn />
			</div>
			<div>
				<LogIn />
			</div>
		</div>
	)
}

export default AuthorizationButtons
