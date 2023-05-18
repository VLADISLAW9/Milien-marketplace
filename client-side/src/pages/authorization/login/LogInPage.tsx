import { FC, useState } from 'react'
import { AiFillLock, AiFillMail } from 'react-icons/ai'
import { BsArrowDown } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useLoginUserMutation } from '../../../services/AuthService'

interface LoginPayload {
	login: string
	password: string
}

const LogInPage: FC = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const [loginUser, { data, isLoading, isError }] = useLoginUserMutation()

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		await loginUser({ login, password })
		console.log(data)
	}

	return (
		<div className='p-10 shadow-2xl shadow-stone-300 bg-white rounded-xl'>
			<Link to='/' className='flex justify-center items-center'>
				<img src='/logo.png' className='w-[200px]' alt='логотип' />
			</Link>
			<form onSubmit={handleLogin} className='flex flex-col mt-10'>
				<div className='flex mb-4'>
					<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
						<AiFillMail className='scale-[.6] w-8 h-8 text-stone-400' />
					</div>
					<input
						className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
						placeholder='Электронная почта'
						value={login}
						required
						onChange={e => {
							setLogin(e.target.value)
						}}
						type='text'
					/>
				</div>

				<div className='flex'>
					<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
						<AiFillLock className='scale-[.6] w-8 h-8 text-stone-400' />
					</div>
					<input
						className='pl-4 pr-6 py-3 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
						placeholder='Пароль'
						required
						type='password'
						value={password}
						onChange={e => {
							setPassword(e.target.value)
						}}
					/>
				</div>
				<button
					disabled={!login || !password}
					className={
						!login || !password
							? 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
							: 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
					}
				>
					Войти
				</button>
			</form>
			<div className='flex mt-7 text-[13px] justify-center'>
				<h1 className='mr-2 text-stone-400 font-light'>Нет аккаунта? </h1>
				<Link
					to='/signin'
					className='hover:text-stone-400 transition-all font-medium flex items-center'
				>
					<h1 className='mr-[2px]'>Регистрация</h1>
					<BsArrowDown className='-rotate-90' />
				</Link>
			</div>
		</div>
	)
}

export default LogInPage
