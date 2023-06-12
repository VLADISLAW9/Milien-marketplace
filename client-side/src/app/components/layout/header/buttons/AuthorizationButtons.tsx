import LogIn from './LogIn_btn'
import SingIn from './SingIn_btn'

const AuthorizationButtons = () => {
	return (
		<div className='flex  w-[15%] max-xl:w-[100%] items-center flex-auto justify-end max-xl:flex-col'>
			<div className='mr-4 max-lg:mb-14'>
				<SingIn />
			</div>
			<div>
				<LogIn />
			</div>
		</div>
	)
}

export default AuthorizationButtons
