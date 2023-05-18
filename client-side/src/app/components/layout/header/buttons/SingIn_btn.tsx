import { FC } from 'react'
import { Link } from 'react-router-dom'

const SingIn: FC = () => {
	return (
		<Link
			to='/login'
			className='text-[#166430] w-[100px] px-4 py-2 rounded-3xl border border-[#166430] hover:text-white hover:bg-[#166430] transition-all'
		>
			Войти
		</Link>
	)
}

export default SingIn
