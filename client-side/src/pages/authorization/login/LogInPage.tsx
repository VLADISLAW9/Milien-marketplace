import { Dispatch } from '@reduxjs/toolkit'
import React, { FC, useContext, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { BsArrowDown } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { UserContext } from '../../../context/UserContext'
import { useActions } from '../../../hooks/use-actions'
import { useTypedSelector } from '../../../hooks/use-typed-selector'
import AuthService from '../../../services/AuthService'

interface LoginPayload {
	login: string
	password: string
}

const LogInPage: FC = () => {
	const [loginValue, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { isAuth, user, isLoadingAuth, isErrorAuth, errorMessage } =
		useTypedSelector(state => state.user)
	const { setAuth, setUser } = useActions()
	const { userData, isUserLoading, userError, setUserData } =
		useContext(UserContext)
	const [isHide, setIsHide] = useState(true)

	const dispatch = useDispatch<Dispatch<any>>()
	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const payload: LoginPayload = {
			login: loginValue,
			password: password,
		}
		try {
			setLoading(true)
			const response = await AuthService.login(
				payload.login.replace(/\s/g, ''),
				payload.password.replace(/\s/g, '')
			)
			localStorage.setItem('token', response.data.accessToken)
			localStorage.setItem('refresh', response.data.refreshToken)
			// setUserData(response.data.user)
			dispatch(setAuth(true))
			dispatch(setUser(response.data.user))
			window.location.href='/'
		} catch (e: any) {
			console.log(e)
			setError(e.response.data)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='p-10 shadow-2xl shadow-stone-300 bg-white rounded-xl'>
			<Link to='/' className='flex justify-center items-center'>
				<img src='/logo.png' className='w-[200px]' alt='логотип' />
			</Link>
			<form onSubmit={handleLogin} className='flex flex-col mt-10'>
				<div className='flex mb-4'>
					<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
						<AiOutlineUser className='scale-[.8] w-8 h-8 text-stone-400' />
					</div>
					<input
						className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
						placeholder='Логин'
						value={loginValue}
						required
						onChange={e => {
							const valueWithoutSpaces = e.target.value.replace(/\s/g, '')
							setLogin(valueWithoutSpaces)
						}}
						type='text'
					/>
				</div>

				<div className='flex relative'>
					<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
						<RiLockPasswordFill className='scale-[.6] w-8 h-8 text-stone-400' />
					</div>
					<input
						className='pl-4 pr-6 py-3 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
						placeholder='Пароль'
						required
						type={isHide ? 'password' : 'text'}
						value={password}
						onChange={e => {
							const valueWithoutSpaces = e.target.value.replace(/\s/g, '')
							setPassword(valueWithoutSpaces)
						}}
					/>
					<button
						type='button'
						onClick={() => {
							setIsHide(!isHide)
						}}
						className='absolute top-[14.5px] right-[16px]'
					>
						{!isHide ? (
							<AiFillEyeInvisible className='w-7 h-7 text-stone-400' />
						) : (
							<AiFillEye className='w-7 h-7 text-stone-400' />
						)}
					</button>
				</div>
				<div className='mt-5'>
					{error ? <h1 className='text-red-600'>{error}</h1> : <></>}
				</div>
				<button
					disabled={!loginValue || !password || loading}
					className={
						!loginValue || !password || loading
							? 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
							: 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
					}
				>
					{loading ? 'Загрузка...' : 'Войти'}
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
			<div className='flex mt-3 text-[13px] justify-center'>
				<h1 className='mr-2 text-stone-400 font-light'>Забыли пароль? </h1>
				<Link
					to='/forgot-password'
					className='hover:text-stone-400 transition-all font-medium flex items-center'
				>
					<h1 className='mr-[2px]'>Сброс пароля</h1>
					<BsArrowDown className='-rotate-90' />
				</Link>
			</div>
		</div>
	)
}

export default LogInPage
