import { FC } from 'react'
import { Link } from 'react-router-dom'

const LogIn: FC = () => {
	return (
		<Link
			to='/signin'
			className='bg-[#166430]
	text-white border border-[#166430] hover:border-[#166430]/10 rounded-3xl px-4 py-2 hover:text-white hover:bg-[#166430]/80  max-lg:px-6 max-lg:py-3 transition-all max-lg:text-3xl'
		>
			Регистрация
		</Link>
	)
}

export default LogIn
