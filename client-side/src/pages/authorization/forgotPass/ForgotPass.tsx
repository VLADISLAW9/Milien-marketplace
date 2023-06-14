import axios from 'axios'
import { FC, useState } from 'react'
import { BiCode, BiMailSend } from 'react-icons/bi'
import { BsArrowDown, BsPass } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useFetching } from '../../../hooks/use-fetching'
import AuthService from '../../../services/AuthService'

interface LoginPayload {
	login: string
	password: string
}

const LogInPage: FC = () => {
	const [emailValue, setEmailValue] = useState('')
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [isPasswordValid, setPasswordValid] = useState(true)
	const [isSendCode, setIsSend] = useState(false)
	const [isTrueCode, setIsTrueCode] = useState(false)
	const [alertMessage, setAlertMessage] = useState<string | null>(null)
	const [codeValue, setCodeValue] = useState('')
	const [newPass, setNewPass] = useState('')
	const [repeatNewPass, setRepeatNewPass] = useState('')
	const [resetPass, resetPassLoading, resetPassError] = useFetching(
		async () => {
			if (isTrueCode) {
				const reset = await axios.put(
					'https://api.xn--h1agbg8e4a.xn--p1ai/api/Auth/create_new_password',
					null,
					{
						params: {
							password: newPass,
							email: emailValue,
						},
					}
				)
				if (reset.status === 200) {
					window.location.href = '/login'
				}
			}
		}
	)
	const [checker, checkerLoading, checkerError] = useFetching(async () => {
		if (codeValue.length > 0) {
			const checkCode = await AuthService.checkEmailCode(emailValue, codeValue)
			if (checkCode) {
				setIsTrueCode(true)
			} else {
				setErrorMessage('Неверный код подтверждения!')
			}
		}
	})
	const [sendler, sendlerLoading, sendlerError] = useFetching(async () => {
		const sendCode = await axios.put(
			'https://api.xn--h1agbg8e4a.xn--p1ai/api/Auth/reset_password',
			null,
			{
				params: {
					email: emailValue,
				},
			}
		)
		if (sendCode.status === 200) {
			setIsSend(true)
			setAlertMessage('На ваше письмо отправлен код, пожалуйста введите его')
		}
	})
	return (
		<div className='p-10 shadow-2xl shadow-stone-300 bg-white rounded-xl'>
			<Link to='/' className='flex justify-center items-center'>
				<img src='/logo.png' className='w-[200px]' alt='логотип' />
			</Link>
			<div className='flex flex-col mt-10'>
				{!isTrueCode && (
					<div className='flex mb-4'>
						<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
							<BiMailSend className='scale-[.8] w-8 h-8 text-stone-400' />
						</div>
						<input
							className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[300px]'
							placeholder='Введите почту от вашего аккаунта'
							value={emailValue}
							required
							onChange={e => {
								setEmailValue(e.target.value)
							}}
							type='text'
						/>
					</div>
				)}

				{isSendCode && !isTrueCode && (
					<div className='flex mb-4'>
						<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
							<BiCode className='scale-[.8] w-8 h-8 text-stone-400' />
						</div>
						<input
							className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[300px]'
							placeholder='Введите код с почты'
							value={codeValue}
							required
							onChange={e => {
								setCodeValue(e.target.value)
							}}
							type='text'
						/>
					</div>
				)}

				{isTrueCode && (
					<>
						<div className='flex mb-4'>
							<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
								<BsPass className='scale-[.8] w-8 h-8 text-stone-400' />
							</div>
							<input
								className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[300px]'
								placeholder='Введите новый пароль'
								value={newPass}
								required
								onChange={e => {
									setNewPass(e.target.value)
									setPasswordValid(true) // Сбросить состояние проверки при изменении пароля
								}}
								pattern='(?=.*\d)(?=.*[A-Z]).{8,}' // Проверка на требования
							/>
						</div>
						<div className='flex mb-4'>
							<div className='px-3 py-3 bg-stone-200 rounded-l-md'>
								<BsPass className='scale-[.8] w-8 h-8 text-stone-400' />
							</div>
							<input
								className='pl-4 pr-6 placeholder:text-stone-400 bg-stone-100 rounded-r-md w-[300px]'
								placeholder='Подтвердите новый пароль'
								value={repeatNewPass}
								required
								onChange={e => {
									setRepeatNewPass(e.target.value)
								}}
								type='text'
							/>
						</div>
					</>
				)}

				{errorMessage && (
					<h1 className='text-red-500 max-w-[256px] text-base  flex justify-start'>{errorMessage}</h1>
				)}
				{!isSendCode && (
					<button
						onClick={() => sendler()}
						disabled={emailValue.length === 0 || sendlerLoading}
						className={
							emailValue.length > 0
								? 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
								: 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
						}
					>
						{sendlerLoading ? <>Загрузка...</> : <>Отправить код</>}
					</button>
				)}
				{isSendCode && !isTrueCode && (
					<button
						onClick={() => {
							checker()
						}}
						disabled={codeValue.length === 0 || checkerLoading}
						className={
							codeValue.length > 0
								? 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
								: 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
						}
					>
						{checkerLoading ? <>Загрузка...</> : <>Подтвердить код</>}
					</button>
				)}
				{isTrueCode && (
					<button
						onClick={() => {
							// Проверка на требования к паролю
							const passwordRegex = /(?=.*\d)(?=.*[A-Z]).{8,}/
							if (!passwordRegex.test(newPass)) {
								setErrorMessage(
									'Пароль должен состоять минимум из 8 символов, содержать минимум одну заглавную букву и минимум одну цифру.'
								)
								return
							}

							// Удаление всех пробелов
							const formattedNewPass = newPass.replace(/\s/g, '')

							if (formattedNewPass !== repeatNewPass) {
								setErrorMessage('Пароли не совпадают')
								return
							}

							resetPass()
						}}
						disabled={
							newPass.length === 0 ||
							repeatNewPass.length === 0 ||
							resetPassLoading
						}
						className={
							emailValue.length > 0
								? 'text-white mt-10 bg-[#166434] px-6 py-3 rounded-md'
								: 'text-white mt-10 bg-[#166434]/70 px-6 py-3 rounded-md'
						}
					>
						{resetPassLoading ? <>Загрузка...</> : <>Сменить пароль</>}
					</button>
				)}
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
				<h1 className='mr-2 text-stone-400 font-light'>
					Уже зарегистрированы?{' '}
				</h1>
				<Link
					to='/login'
					className='hover:text-stone-400 transition-all font-medium flex items-center'
				>
					<h1 className='mr-[2px]'>Войти</h1>
					<BsArrowDown className='-rotate-90' />
				</Link>
			</div>
		</div>
	)
}
export default LogInPage
