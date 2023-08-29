import { FC, useContext, useEffect, useState } from 'react'
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai'
import { BsArrowDown } from 'react-icons/bs'
import { MdOutlineNumbers } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'
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
	const [isSendCode, setIsSendCode] = useState(false)
	const [emailCode, setEmailCode] = useState('')
	const [countdown, setCountdown] = useState(30)
	const [password, setPassword] = useState('')
	const [loadingCode, setLoadingCode] = useState(false)
	const [isAcceptEmail, setIsAcceptEmail] = useState<boolean | null>(null)
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const { isAuth, user, isLoadingAuth, isErrorAuth, errorMessage } =
		useTypedSelector(state => state.user)
	const { setAuth, setUser } = useActions()
	const { userData, isUserLoading, userError, setUserData } =
		useContext(UserContext)
	const [isHide, setIsHide] = useState(true)

	console.log(isAcceptEmail)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isSendCode && countdown > 0) {
			interval = setInterval(() => {
				setCountdown(prevCountdown => prevCountdown - 1)
			}, 1000)
		} else {
			clearInterval(interval!)
		}

		return () => {
			clearInterval(interval!)
		}
	}, [isSendCode, countdown])

	const handleSendEmailCode = async () => {
		try {
			setLoadingCode(true)
			const response = await AuthService.sendEmailCode(loginValue)
			setIsSendCode(true)
			setCountdown(30) // Reset the countdown to 30 seconds
			console.log('код отправлен')
		} catch (e: any) {
			setError(e.response.data)
			setIsSendCode(false)
		} finally {
			setLoadingCode(false)
		}
	} 

	const handleLogin = async () => {
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
			setAuth(true)
			setUser(response.data.user)
			window.location.href = '/'
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
			<div className='flex flex-col mt-10'>
				<div className='flex mb-4'>
					<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
						<AiOutlineUser className='scale-[.8] w-8 h-8 text-stone-400' />
					</div>
					<input
						className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
						placeholder='Логин или телефон'
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
				{isAcceptEmail === false && (
					<>
						<div className='flex relative mt-5'>
							<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
								<MdOutlineNumbers className='scale-[.6] w-8 h-8 text-stone-400' />
							</div>
							<input
								className='pl-4 pr-6 py-3 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[250px]'
								placeholder='Введите код с почты'
								type={'text'}
								value={emailCode}
								onChange={e => {
									setEmailCode(e.target.value)
								}}
							/>
						</div>

						<button
							className={
								countdown > 0
									? 'text-sm mt-2 text-start text-stone-300'
									: 'text-sm mt-2 text-start text-stone-500'
							}
							onClick={handleSendEmailCode}
							disabled={countdown > 0} // Disable the button when already sent or countdown is running
						>
							{loadingCode
								? 'Загрузка...'
								: countdown > 0
								? `Отправить код еще раз через ${countdown} сек`
								: 'Отправить код еще раз'}
						</button>
					</>
				)}
				<button
					onClick={handleLogin}
					disabled={!loginValue || !password || loading}
					className={
						!loginValue || !password || loading
							? 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
							: 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
					}
				>
					{loading ? 'Загрузка...' : 'Войти'}
				</button>
			</div>
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
